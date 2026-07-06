"""
LAB02 - Classification Algorithms: Decision Tree, Random Forest, SVM
Author: generated for Lab02 practice

How to use:
1) Put this file in the same folder as titanic.csv and diabetes.csv
2) Install dependencies:
   pip install pandas numpy matplotlib scikit-learn
3) Run:
   python lab02_super_report.py

Outputs:
- outputs_lab02/images/*.png
- outputs_lab02/Lab02_Report.pdf
- outputs_lab02/metrics_summary.csv
"""

from __future__ import annotations

import os
import textwrap
import warnings
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Tuple

import matplotlib

matplotlib.use("Agg")

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from matplotlib.backends.backend_pdf import PdfPages
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
)
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier, plot_tree

warnings.filterwarnings("ignore")

RANDOM_STATE = 42
BASE_DIR = Path(__file__).resolve().parent
OUT_DIR = BASE_DIR / "outputs_lab02"
IMG_DIR = OUT_DIR / "images"
OUT_DIR.mkdir(exist_ok=True)
IMG_DIR.mkdir(parents=True, exist_ok=True)


@dataclass
class ModelResult:
    dataset: str
    model_name: str
    best_params: Dict
    accuracy: float
    precision: float
    recall: float
    f1: float
    roc_auc: float | None
    report_text: str
    confusion_png: Path
    extra_pngs: List[Path]


def find_file(candidates: List[str]) -> Path:
    for name in candidates:
        path = BASE_DIR / name
        if path.exists():
            return path
    raise FileNotFoundError(
        f"Không tìm thấy file. Hãy đặt một trong các file sau cùng thư mục với script: {candidates}"
    )


def read_csv_safely(path: Path) -> pd.DataFrame:
    for enc in ["utf-8", "latin-1", "cp1252"]:
        try:
            return pd.read_csv(path, encoding=enc)
        except UnicodeDecodeError:
            continue
    return pd.read_csv(path)


def load_diabetes() -> Tuple[pd.DataFrame, pd.Series, str]:
    path = find_file(["diabetes.csv", "Diabetes.csv"])
    df = read_csv_safely(path)
    target_col = "Outcome"
    if target_col not in df.columns:
        raise ValueError("diabetes.csv phải có cột nhãn 'Outcome'.")
    X = df.drop(columns=[target_col])
    y = df[target_col].astype(int)
    return X, y, "Diabetes"


def load_titanic() -> Tuple[pd.DataFrame, pd.Series, str]:
    path = find_file(["titanic.csv", "Titanic.csv", "train.csv"])
    df = read_csv_safely(path)
    target_col = "Survived"
    if target_col not in df.columns:
        raise ValueError("titanic.csv phải có cột nhãn 'Survived'.")

    # Drop leakage or mostly ID/text columns if present.
    drop_cols = [
        "Survived",
        "PassengerId",
        "Name",
        "Ticket",
        "Cabin",
    ]
    X = df.drop(columns=[c for c in drop_cols if c in df.columns])
    y = df[target_col].astype(int)
    return X, y, "Titanic"


def build_preprocessor(X: pd.DataFrame, scale_numeric: bool = False) -> ColumnTransformer:
    numeric_cols = X.select_dtypes(include=[np.number]).columns.tolist()
    categorical_cols = [c for c in X.columns if c not in numeric_cols]

    numeric_steps = [("imputer", SimpleImputer(strategy="median"))]
    if scale_numeric:
        numeric_steps.append(("scaler", StandardScaler()))

    numeric_pipe = Pipeline(numeric_steps)
    categorical_pipe = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("onehot", OneHotEncoder(handle_unknown="ignore")),
        ]
    )

    return ColumnTransformer(
        transformers=[
            ("num", numeric_pipe, numeric_cols),
            ("cat", categorical_pipe, categorical_cols),
        ]
    )


def get_feature_names(preprocessor: ColumnTransformer) -> List[str]:
    names: List[str] = []
    for name, trans, cols in preprocessor.transformers_:
        if name == "remainder":
            continue
        if name == "num":
            names.extend(list(cols))
        elif name == "cat":
            if not cols:
                continue
            onehot = trans.named_steps["onehot"]
            if hasattr(onehot, "get_feature_names_out") and hasattr(onehot, "categories_"):
                names.extend(onehot.get_feature_names_out(cols).tolist())
            else:
                names.extend(list(cols))
    return names


def save_confusion_matrix(cm: np.ndarray, labels: List[str], title: str, path: Path) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    fig, ax = plt.subplots(figsize=(6, 5))
    im = ax.imshow(cm)
    ax.set_title(title)
    ax.set_xlabel("Predicted label")
    ax.set_ylabel("True label")
    ax.set_xticks(range(len(labels)))
    ax.set_yticks(range(len(labels)))
    ax.set_xticklabels(labels)
    ax.set_yticklabels(labels)
    for i in range(cm.shape[0]):
        for j in range(cm.shape[1]):
            ax.text(j, i, cm[i, j], ha="center", va="center")
    fig.colorbar(im, ax=ax)
    plt.tight_layout()
    fig.savefig(path, dpi=180, bbox_inches="tight")
    plt.close(fig)
    return path


def save_tree_plot(model: Pipeline, feature_names: List[str], class_names: List[str], title: str, path: Path) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    clf = model.named_steps["clf"]
    fig, ax = plt.subplots(figsize=(18, 9))
    plot_tree(
        clf,
        feature_names=feature_names,
        class_names=class_names,
        filled=True,
        rounded=True,
        max_depth=3,
        fontsize=8,
        ax=ax,
    )
    ax.set_title(title)
    fig.savefig(path, dpi=180, bbox_inches="tight")
    plt.close(fig)
    return path


def save_cv_curve(cv: GridSearchCV, param_key: str, title: str, xlabel: str, path: Path) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    result = pd.DataFrame(cv.cv_results_)

    # GridSearchCV stores parameter columns exactly as keys in param_grid.
    # Examples: param_clf__max_depth, param_clf__n_estimators, param_clf__C
    candidates = [
        f"param_{param_key}",
        f"param_clf__{param_key}",
        f"param_model__{param_key}",
    ]
    param_col = next((c for c in candidates if c in result.columns), None)
    if param_col is None:
        param_cols = [c for c in result.columns if c.startswith("param_")]
        if len(param_cols) == 1:
            param_col = param_cols[0]
        else:
            raise ValueError(
                f"Không tìm thấy cột tham số cho {param_key}. "
                f"Các cột tham số hiện có: {param_cols}"
            )

    x = result[param_col].astype(str)
    y_train = result["mean_train_score"] if "mean_train_score" in result.columns else None
    y_test = result["mean_test_score"]

    fig, ax = plt.subplots(figsize=(8, 5))
    if y_train is not None:
        ax.plot(x, y_train, marker="o", label="Mean training score")
    ax.plot(x, y_test, marker="o", label="Mean validation score")
    ax.set_title(title)
    ax.set_xlabel(xlabel)
    ax.set_ylabel("ROC AUC / CV score")
    ax.legend()
    ax.grid(True, alpha=0.3)
    plt.tight_layout()
    fig.savefig(path, dpi=180, bbox_inches="tight")
    plt.close(fig)
    return path


def save_feature_importance(model: Pipeline, feature_names: List[str], title: str, path: Path, top_n: int = 15) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    clf = model.named_steps["clf"]
    if not hasattr(clf, "feature_importances_"):
        return path
    imp = pd.DataFrame({"feature": feature_names, "importance": clf.feature_importances_})
    imp = imp.sort_values("importance", ascending=False).head(top_n).sort_values("importance")
    fig, ax = plt.subplots(figsize=(8, 6))
    ax.barh(imp["feature"], imp["importance"])
    ax.set_title(title)
    ax.set_xlabel("Importance")
    plt.tight_layout()
    fig.savefig(path, dpi=180, bbox_inches="tight")
    plt.close(fig)
    return path


def evaluate_model(
    dataset_name: str,
    model_name: str,
    estimator,
    param_grid: Dict,
    X: pd.DataFrame,
    y: pd.Series,
    scale_numeric: bool = False,
) -> ModelResult:
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=RANDOM_STATE, stratify=y
    )

    preprocessor = build_preprocessor(X_train, scale_numeric=scale_numeric)
    pipe = Pipeline(steps=[("preprocess", preprocessor), ("clf", estimator)])

    cv = GridSearchCV(
        pipe,
        param_grid=param_grid,
        scoring="roc_auc",
        cv=4,
        n_jobs=-1,
        refit=True,
        return_train_score=True,
    )
    cv.fit(X_train, y_train)
    best_model = cv.best_estimator_

    y_pred = best_model.predict(X_test)
    y_proba = None
    try:
        y_proba = best_model.predict_proba(X_test)[:, 1]
    except Exception:
        try:
            y_proba = best_model.decision_function(X_test)
        except Exception:
            y_proba = None

    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, average="binary", zero_division=0)
    rec = recall_score(y_test, y_pred, average="binary", zero_division=0)
    f1 = f1_score(y_test, y_pred, average="binary", zero_division=0)
    roc = roc_auc_score(y_test, y_proba) if y_proba is not None else None
    report = classification_report(y_test, y_pred, zero_division=0)

    safe_name = f"{dataset_name}_{model_name}".replace(" ", "_").lower()
    cm_path = IMG_DIR / f"{safe_name}_confusion_matrix.png"
    save_confusion_matrix(
        confusion_matrix(y_test, y_pred),
        labels=["0", "1"],
        title=f"{dataset_name} - {model_name}: Confusion Matrix",
        path=cm_path,
    )

    extra_pngs: List[Path] = []
    feature_names = get_feature_names(best_model.named_steps["preprocess"])

    # Pick first param in grid for curve.
    if param_grid:
        full_key = list(param_grid.keys())[0]
        param_key = full_key.replace("clf__", "")
        cv_path = IMG_DIR / f"{safe_name}_cv_curve.png"
        extra_pngs.append(save_cv_curve(cv, param_key, f"{dataset_name} - {model_name}: GridSearchCV", param_key, cv_path))

    if isinstance(best_model.named_steps["clf"], DecisionTreeClassifier):
        tree_path = IMG_DIR / f"{safe_name}_tree.png"
        extra_pngs.append(save_tree_plot(best_model, feature_names, ["0", "1"], f"{dataset_name} - Decision Tree", tree_path))

    if hasattr(best_model.named_steps["clf"], "feature_importances_"):
        imp_path = IMG_DIR / f"{safe_name}_feature_importance.png"
        extra_pngs.append(save_feature_importance(best_model, feature_names, f"{dataset_name} - {model_name}: Feature Importance", imp_path))

    return ModelResult(
        dataset=dataset_name,
        model_name=model_name,
        best_params=cv.best_params_,
        accuracy=acc,
        precision=prec,
        recall=rec,
        f1=f1,
        roc_auc=roc,
        report_text=report,
        confusion_png=cm_path,
        extra_pngs=extra_pngs,
    )


def add_text_page(pdf: PdfPages, title: str, body: str) -> None:
    fig = plt.figure(figsize=(8.27, 11.69))
    fig.text(0.08, 0.94, title, fontsize=18, fontweight="bold", va="top")
    wrapped = "\n".join(textwrap.wrap(body, width=95, replace_whitespace=False))
    fig.text(0.08, 0.89, wrapped, fontsize=10, va="top", family="monospace")
    pdf.savefig(fig, bbox_inches="tight")
    plt.close(fig)


def add_image_page(pdf: PdfPages, title: str, image_path: Path) -> None:
    if not image_path.exists():
        return
    img = plt.imread(image_path)
    fig, ax = plt.subplots(figsize=(8.27, 11.69))
    ax.imshow(img)
    ax.axis("off")
    fig.suptitle(title, fontsize=14, fontweight="bold")
    pdf.savefig(fig, bbox_inches="tight")
    plt.close(fig)


def create_pdf_report(results: List[ModelResult], X_titanic: pd.DataFrame, X_diabetes: pd.DataFrame) -> Path:
    pdf_path = OUT_DIR / "Lab02_Report.pdf"
    summary_df = pd.DataFrame(
        [
            {
                "Dataset": r.dataset,
                "Model": r.model_name,
                "Accuracy": round(r.accuracy, 4),
                "Precision": round(r.precision, 4),
                "Recall": round(r.recall, 4),
                "F1-score": round(r.f1, 4),
                "ROC-AUC": round(r.roc_auc, 4) if r.roc_auc is not None else None,
                "Best Params": str(r.best_params),
            }
            for r in results
        ]
    )
    summary_df.to_csv(OUT_DIR / "metrics_summary.csv", index=False, encoding="utf-8-sig")

    with PdfPages(pdf_path) as pdf:
        intro = f"""
LAB02 - CÁC GIẢI THUẬT PHÂN LOẠI CƠ BẢN

Mục tiêu:
- Xây dựng mô hình phân loại với Decision Tree, Random Forest và SVM.
- Tiền xử lý dữ liệu thiếu, mã hóa biến phân loại, chuẩn hóa dữ liệu khi cần.
- Đánh giá mô hình bằng Accuracy, Precision, Recall, F1-score, ROC-AUC, Confusion Matrix.
- Tối ưu tham số bằng GridSearchCV.

Dữ liệu sử dụng:
- Titanic: {X_titanic.shape[0]} dòng, {X_titanic.shape[1]} biến đầu vào.
- Diabetes: {X_diabetes.shape[0]} dòng, {X_diabetes.shape[1]} biến đầu vào.

Các mô hình đã chạy:
1. Titanic - Decision Tree
2. Titanic - Random Forest
3. Diabetes - Decision Tree
4. Diabetes - Random Forest
5. Diabetes - SVM
"""
        add_text_page(pdf, "BÁO CÁO THỰC HÀNH LAB02", intro)

        add_text_page(pdf, "Bảng tổng hợp kết quả", summary_df.to_string(index=False))

        for r in results:
            roc_auc_text = f"{r.roc_auc:.4f}" if r.roc_auc is not None else "N/A"
            body = f"""
Dataset: {r.dataset}
Model: {r.model_name}
Best parameters: {r.best_params}

Accuracy : {r.accuracy:.4f}
Precision: {r.precision:.4f}
Recall   : {r.recall:.4f}
F1-score : {r.f1:.4f}
ROC-AUC  : {roc_auc_text}

Classification report:
{r.report_text}

Nhận xét nhanh:
- Accuracy cho biết tỷ lệ dự đoán đúng tổng thể.
- Precision cao nghĩa là các mẫu dự đoán thuộc lớp 1 có độ tin cậy tốt.
- Recall cao nghĩa là mô hình phát hiện được nhiều mẫu thật sự thuộc lớp 1.
- F1-score cân bằng giữa Precision và Recall.
- ROC-AUC dùng để đánh giá khả năng phân tách hai lớp của mô hình.
"""
            add_text_page(pdf, f"Kết quả: {r.dataset} - {r.model_name}", body)
            add_image_page(pdf, f"{r.dataset} - {r.model_name}: Confusion Matrix", r.confusion_png)
            for img in r.extra_pngs:
                add_image_page(pdf, img.stem.replace("_", " ").title(), img)

        conclusion = """
KẾT LUẬN

Decision Tree dễ diễn giải nhưng dễ overfitting nếu cây quá sâu. Random Forest thường ổn định hơn vì kết hợp nhiều cây và giảm phương sai. SVM phù hợp cho dữ liệu đã chuẩn hóa và có thể cho kết quả tốt khi chọn kernel, C và gamma phù hợp.

Trong bài thực hành này, GridSearchCV được dùng để chọn tham số tốt hơn thay vì đặt thủ công. Các biểu đồ Confusion Matrix, Feature Importance và đường đánh giá tham số giúp phân tích mô hình trực quan hơn.
"""
        add_text_page(pdf, "Kết luận", conclusion)

    return pdf_path


def main() -> None:
    print("Đang đọc dữ liệu...")
    X_titanic, y_titanic, titanic_name = load_titanic()
    X_diabetes, y_diabetes, diabetes_name = load_diabetes()

    jobs = [
        (
            titanic_name,
            "Decision Tree",
            DecisionTreeClassifier(random_state=RANDOM_STATE),
            {"clf__max_depth": [2, 3, 4, 5, 6, 8, 10], "clf__criterion": ["gini", "entropy"]},
            X_titanic,
            y_titanic,
            False,
        ),
        (
            titanic_name,
            "Random Forest",
            RandomForestClassifier(random_state=RANDOM_STATE),
            {"clf__n_estimators": [50, 100, 150], "clf__max_depth": [3, 5, 8, None]},
            X_titanic,
            y_titanic,
            False,
        ),
        (
            diabetes_name,
            "Decision Tree",
            DecisionTreeClassifier(random_state=RANDOM_STATE),
            {"clf__max_depth": [2, 3, 4, 5, 6, 8, 10], "clf__criterion": ["gini", "entropy"]},
            X_diabetes,
            y_diabetes,
            False,
        ),
        (
            diabetes_name,
            "Random Forest",
            RandomForestClassifier(random_state=RANDOM_STATE),
            {"clf__n_estimators": [50, 100, 150], "clf__max_depth": [3, 5, 8, None]},
            X_diabetes,
            y_diabetes,
            False,
        ),
        (
            diabetes_name,
            "SVM",
            SVC(probability=True, random_state=RANDOM_STATE),
            {"clf__kernel": ["linear", "rbf"], "clf__C": [0.1, 1, 10, 100], "clf__gamma": ["scale", "auto"]},
            X_diabetes,
            y_diabetes,
            True,
        ),
    ]

    results: List[ModelResult] = []
    for dataset_name, model_name, estimator, grid, X, y, scale in jobs:
        print(f"Đang chạy {dataset_name} - {model_name}...")
        result = evaluate_model(dataset_name, model_name, estimator, grid, X, y, scale_numeric=scale)
        results.append(result)
        print(f"  Accuracy={result.accuracy:.4f}, F1={result.f1:.4f}, ROC-AUC={result.roc_auc:.4f}")

    pdf_path = create_pdf_report(results, X_titanic, X_diabetes)

    print("\nHOÀN TẤT!")
    print(f"PDF report: {pdf_path}")
    print(f"Images folder: {IMG_DIR}")
    print(f"Metrics CSV: {OUT_DIR / 'metrics_summary.csv'}")


if __name__ == "__main__":
    main()
