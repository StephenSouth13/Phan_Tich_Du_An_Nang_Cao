PHẦN 1.1: THỐNG KÊ MÔ TẢ (DESCRIPTIVE STATISTICS)1.1.1. Trả lời câu hỏi ôn tập lý thuyếtThống kê mô tả là gì? Khác gì với thống kê suy luận (Inferential Statistics)?Thống kê mô tả: Là việc tóm tắt, trình bày và mô tả các đặc tính của một tập dữ liệu hiện có (thông qua các số liệu như Mean, Median, Biểu đồ...) mà không đưa ra kết luận rộng hơn ngoài tập dữ liệu đó.Thống kê suy luận: Sử dụng dữ liệu từ một mẫu (sample) nhỏ để đưa ra các suy luận, ước lượng hoặc kiểm định giả thuyết về đặc điểm của toàn bộ tổng thể (population) lớn hơn.Các thước đo chính dùng để làm gì? Khi nào dùng Trung vị (Median) thay vì Trung bình (Mean)?Mean (Trung bình): Xác định trọng tâm của dữ liệu.Median (Trung vị): Xác định điểm chính giữa của tập dữ liệu (50% giá trị nhỏ hơn và 50% lớn hơn).Variance / Std Dev (Phương sai / Độ lệch chuẩn): Đo lường mức độ phân tán/biến động của dữ liệu xung quanh giá trị trung bình.Trường hợp dùng Median: Khi dữ liệu có giá trị ngoại lai (outliers) cực đoan hoặc bị lệch nghiêm trọng (ví dụ: Thu nhập, Giá nhà). Mean rất nhạy cảm với outlier, còn Median thì không.Cách xác định phân bố và các loại phân bố phổ biến:Cách xác định: Sử dụng biểu đồ Histogram, đường cong mật độ (KDE), hoặc tính toán độ lệch (Skewness).Phân bố chuẩn (Normal Distribution): Đối xứng qua trung tâm, hình chuông úp ($Mean = Median = Mode$).Phân bố lệch phải (Positive/Right-skewed): Đuôi kéo dài về bên phải ($Mean > Median > Mode$).Phân bố lệch trái (Negative/Left-skewed): Đuôi kéo dài về bên trái ($Mean < Median < Mode$).Ý nghĩa của Độ lệch chuẩn và Phạm vi (Range):Range (Phạm vi): Bằng $Max - Min$. Chỉ cho biết khoảng cách giữa 2 điểm cực đoan nhất, rất dễ bị bóp méo bởi outlier.Độ lệch chuẩn (Std Dev): Cho biết trung bình các điểm dữ liệu cách xa mức trung bình bao nhiêu. Nó phản ánh toàn diện hơn sự phân tán của toàn bộ tập dữ liệu.Sự khác biệt giữa Q1, Q2, Q3 trong Boxplot:Q1 (Tứ phân vị thứ nhất / 25th Percentile): Có 25% số liệu nhỏ hơn giá trị này.Q2 (Tứ phân vị thứ hai / 50th Percentile): Chính là Median.Q3 (Tứ phân vị thứ ba / 75th Percentile): Có 75% số liệu nhỏ hơn giá trị này.Khoảng cách $IQR = Q3 - Q1$ đại diện cho 50% lượng dữ liệu tập trung ở giữa.Xử lý giá trị thiếu (Missing values) trước khi tính thống kê mô tả:Nếu lượng missing ít (<5%): Có thể xóa bỏ dòng đó (dropna()).Nếu missing nhiều: Thay thế (Imputation) bằng Mean (nếu dữ liệu phân bố chuẩn), bằng Median (nếu dữ liệu lệch), hoặc bằng Mode (cho dữ liệu phân loại).Cách đọc Histogram và Boxplot từ thực tế:Histogram: Nhìn vào đỉnh (Xác định Mode), độ rộng của đáy (Độ phân tán) và độ dài của 2 đuôi (Xác định độ lệch Skewness).Boxplot: Nhìn vào hộp để xem phân bố trung tâm, đường vạch giữa hộp (Median). Hai đầu râu (whiskers) thể hiện phạm vi dữ liệu bình thường $[Q1 - 1.5 \times IQR, Q3 + 1.5 \times IQR]$. Các điểm chấm nằm ngoài râu chính là Outliers.Xử lý giá trị ngoại lai (Outliers) trước khi làm thống kê mô tả:Kiểm tra nguồn gốc: Nếu do lỗi nhập liệu $\rightarrow$ Xóa hoặc sửa.Giữ lại: Nếu đó là biến động thực tế của thị trường (ví dụ: giao dịch bất động sản cao vọt).Xử lý kỹ thuật: Sử dụng phương pháp chặn trên/dưới (Winsorization) hoặc chuyển đổi thang đo (Log-transform).1.1.3 & 1.1.4. Code giải bài tập thực hành 1 & 2 (Red Wine & Diabetes)Dưới đây là khung code chuẩn để nhóm bạn áp dụng trực tiếp cho cả 2 tập dữ liệu trên Jupyter Notebook.Pythonimport pandas as pd
import numpy as np
from scipy import stats

def descriptive_analysis(file_path, target_column):
    # 1. Nạp dữ liệu
    df = pd.read_csv(file_path)
    print(f"--- ĐANG PHÂN TÍCH TẬP DỮ LIỆU: {file_path} ---")
    print("Cấu trúc dữ liệu (Shape):", df.shape)
    
    # 2. Xử lý giá trị thiếu cơ bản trước khi tính toán
    df[target_column] = df[target_column].fillna(df[target_column].median())
    
    # 3. Tính toán các chỉ số thống kê mô tả
    data = df[target_column]
    
    stats_dict = {
        "Mean": np.mean(data),
        "Median": np.median(data),
        "Mode": stats.mode(data, keepdims=True).mode[0],
        "Variance": np.var(data, ddof=1), # ddof=1 cho mẫu
        "Std Deviation": np.std(data, ddof=1),
        "Min": np.min(data),
        "Max": np.max(data),
        "Range": np.max(data) - np.min(data),
        "25th Percentile (Q1)": np.percentile(data, 25),
        "75th Percentile (Q3)": np.percentile(data, 75),
        "IQR": stats.iqr(data)
    }
    
    # In kết quả dạng DataFrame cho đẹp
    res_df = pd.DataFrame(list(stats_dict.items()), columns=['Chỉ số', 'Giá trị'])
    print(res_df.to_string(index=False))
    print("\n" + "="*50 + "\n")

# ---- ÁP DỤNG CHO BÀI TẬP 1: Red Wine Quality ----
# Giả sử cột cần phân tích là 'alcohol' hoặc 'quality'
# descriptive_analysis("path_to/winequality-red.csv", "alcohol")

# ---- ÁP DỤNG CHO BÀI TẬP 2: Diabetes ----
# Giả sử cột cần phân tích là 'Glucose' hoặc 'BMI'
# descriptive_analysis("path_to/diabetes.csv", "Glucose")
PHẦN 1.2: XỬ LÝ VÀ TRỰC QUAN HÓA DỮ LIỆU1.2.1. Trả lời câu hỏi ôn tập lý thuyếtVai trò của trực quan hóa trong EDA: Giúp con người nhận ra các mô hình (patterns), xu hướng (trends), mối quan hệ tương quan và các điểm bất thường (outliers) một cách nhanh chóng thông qua thị giác – điều mà nếu chỉ nhìn vào bảng số liệu thô (raw data) rất khó thấy được.Trường hợp sử dụng biểu đồ:Histogram: Xem phân bố tần suất của một biến số liên tục.Bar chart: So sánh số lượng/giá trị giữa các nhóm dữ liệu phân loại.Scatter plot: Tìm mối quan hệ, tương quan giữa hai biến số liên tục.Boxplot: Xem phân bố, tìm outlier và so sánh một biến số giữa các nhóm khác nhau.Sự khác biệt giữa các thư viện Python:Matplotlib: Thư viện nền tảng, can thiệp sâu vào cấu trúc hình ảnh, code khá dài và thô sơ (Low-level).Seaborn: Xây dựng trên Matplotlib, chuyên cho thống kê, đồ họa đẹp sẵn, code ngắn gọn (High-level).Plotly: Tạo biểu đồ động, có tính tương tác cao (hover, zoom), rất tốt khi làm Dashboard web.Nguyên tắc thiết kế biểu đồ hiệu quả: Phải có tiêu đề (Title) rõ ràng; Phải dán nhãn trục X, Y kèm đơn vị tính; Màu sắc vừa phải (tránh lòe loẹt); Đảm bảo tỷ lệ không bị bóp méo.Xuất biểu đồ: Sử dụng lệnh plt.savefig('ten_bieu_do.png', dpi=300, bbox_inches='tight') trước khi gọi plt.show().1.2.2. Hướng dẫn trực quan hóa cho Bài tập thực hành 1, 2 & Thêm (Supermarket)Đoạn code mẫu này tích hợp Seaborn vẽ các dạng biểu đồ cốt lõi cho các tập dữ liệu yêu cầu:Pythonimport matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

# Cấu hình giao diện biểu đồ cho đẹp
sns.set_theme(style="whitegrid")
fig, axes = plt.subplots(1, 3, figsize=(20, 6))

# 1. Trực quan hóa Red Wine (Ví dụ phân bố nồng độ cồn theo chất lượng)
# df_wine = pd.read_csv("winequality-red.csv")
# sns.boxplot(data=df_wine, x='quality', y='alcohol', ax=axes[0], palette="Blues")
axes[0].set_title("Red Wine: Alcohol vs Quality")

# 2. Trực quan hóa Diabetes (Ví dụ mối quan hệ Glucose và BMI)
# df_diab = pd.read_csv("diabetes.csv")
# sns.scatterplot(data=df_diab, x='Glucose', y='BMI', hue='Outcome', ax=axes[1], alpha=0.7)
axes[1].set_title("Diabetes: Glucose vs BMI")

# 3. Trực quan hóa Online Retail (Siêu thị - Ví dụ Top 5 quốc gia mua nhiều hàng nhất)
# df_retail = pd.read_csv("online_retail.csv")
# top_countries = df_retail['Country'].value_counts().head(5)
# sns.barplot(x=top_countries.values, y=top_countries.index, ax=axes[2], palette="viridis")
axes[2].set_title("Online Retail: Top 5 Countries")

plt.tight_layout()
plt.savefig("EDA_Visualization_Report.png", dpi=300)
plt.show()
PHẦN 1.3: PHÂN TÍCH ĐƠN BIẾN VÀ HAI BIẾN (UNIVARIATE & BIVARIATE)1.3.1. Trả lời câu hỏi ôn tập lý thuyếtPhân tích đơn biến vs Hai biến:Đơn biến (Univariate): Phân tích độc lập một biến duy nhất nhằm tìm ra phân bố, giá trị trung tâm, độ phân tán của riêng nó (không quan tâm mối liên hệ với biến khác).Hai biến (Bivariate): Phân tích đồng thời hai biến để tìm kiếm mối quan hệ, sự phụ thuộc, tương quan hoặc ảnh hưởng qua lại giữa chúng.Tương quan (Correlation) vs Hiệp biến (Covariance):Covariance: Đo lường hướng đi cùng nhau của 2 biến (đồng biến hay nghịch biến). Giá trị phụ thuộc vào đơn vị đo nên khó so sánh mức độ mạnh yếu.Correlation (Hệ số tương quan Pearson): Là hiệp biến đã được chuẩn hóa, giá trị luôn nằm trong khoảng $[-1, 1]$. Giúp biết chính xác hướng và mức độ mạnh yếu của mối quan hệ tuyến tính.Code mẫu Scatter plot & Heatmap cho mối quan hệ 2 biến:Python# Biểu đồ Scatter Plot mối quan hệ tuyến tính
sns.scatterplot(data=df, x='biên_1', y='biên_2')

# Ma trận tương quan dạng Heatmap cho tất cả các biến số
plt.figure(figsize=(10,8))
sns.heatmap(df.corr(numeric_only=True), annot=True, cmap='coolwarm', fmt=".2f")
plt.show()
1.3.3 & 1.3.4. Áp dụng Công cụ EDA Tự động (SweetViz & AutoViz)Thầy Tài và các thầy cô UEH rất thích việc sinh viên tiếp cận các công cụ tự động hóa tiên tiến (Automated EDA) để tăng năng suất làm dự án. Dưới đây là hướng dẫn cài đặt và triển khai code cho SweetViz và AutoViz trên tập dữ liệu Marketing Campaign.Bước 1: Cài đặt thư viện qua Terminal / Anaconda PromptBashpip install sweetviz autoviz
Bước 2: Viết Code triển khai trong NotebookPythonimport pandas as pd

# Đọc dữ liệu Marketing Campaign làm mẫu
marketing_data = pd.read_csv("data/marketing_campaign.csv", sep="\t") # Lưu ý file gốc từ Kaggle thường phân tách bằng dấu Tab (\t)

# ----------------------------------------------------
# 1.3.3. Sử dụng SWEETVIZ
# ----------------------------------------------------
import sweetviz as sv

# Tạo báo cáo tự động
my_report = sv.analyze(marketing_data)

# Xuất ra file HTML tự động mở trên trình duyệt
my_report.show_html("Reports/SweetViz_Marketing_Report.html")


# ----------------------------------------------------
# 1.3.4. Sử dụng AUTOVIZ
# ----------------------------------------------------
from autoviz.AutoViz_Class import AutoViz_Class

# Khởi tạo đối tượng AutoViz
AV = AutoViz_Class()

# Tiến hành vẽ tự động tất cả các dạng biểu đồ đơn biến, hai biến phù hợp
filename = "data/marketing_campaign.csv"
sep = "\t"

dft = AV.AutoViz(
    filename=filename,
    sep=sep,
    depVar="", # Không chọn biến mục tiêu cụ thể nếu chỉ muốn khám phá chung
    dfte=None,
    header=0,
    verbose=1,
    lowess=False,
    chart_format="html", # Xuất định dạng báo cáo HTML sinh động
    max_rows_analyzed=2500,
    max_cols_analyzed=15
)
Kinh nghiệm làm bài nhóm nộp cho thầy Tài (UEH):Đối với file HTML của SweetViz / AutoViz / ydata_profiling: Sau khi chạy code xong, hệ thống sẽ sinh ra các file .html trong thư mục project của bạn. Nhóm bạn nhớ copy các file này vào một thư mục chung gửi kèm bài làm (hoặc nộp link Drive) để thầy bấm vào xem trực tiếp Dashboard.Nhận xét dự án: Đừng chỉ dừng lại ở việc chạy ra code và hình vẽ. Ở mỗi biểu đồ, hãy viết từ 2-3 câu nhận xét mang tính kinh tế / kinh doanh (ví dụ: "Nhìn vào biểu đồ phân bố thu nhập (Income), phần lớn khách hàng của chiến dịch Marketing tập trung ở mức 50,000 - 70,000 USD, tuy nhiên xuất hiện một vài ngoại lai có thu nhập cực lớn, doanh nghiệp cần chú ý phân khúc này...").