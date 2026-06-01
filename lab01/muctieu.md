## Mục tiêu của Lab

Mục tiêu là học cách:

* Thống kê mô tả dữ liệu
* Làm sạch dữ liệu
* Trực quan hóa dữ liệu
* Phân tích đơn biến (Univariate Analysis)
* Phân tích hai biến (Bivariate Analysis)
* Sử dụng các công cụ EDA tự động

Sinh viên phải dùng Python với các thư viện:

* Pandas
* NumPy
* Matplotlib
* Seaborn
* SciPy
* ydata_profiling
* dtale
* SweetViz
* AutoViz

---

# PHẦN 1: THỐNG KÊ MÔ TẢ

## Bài tập thực hành 1

Dataset:

**Red Wine Quality**

Nguồn:

[https://www.kaggle.com/code/eisgandar/red-wine-quality-eda-classification](https://www.kaggle.com/code/eisgandar/red-wine-quality-eda-classification)

Yêu cầu:

### 1. Đọc dữ liệu

<pre class="overflow-visible! px-0!" data-start="768" data-end="798"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼd ͼr"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼm">pd</span><span class="ͼg">.</span><span>read_csv(...)</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

### 2. Thực hiện thống kê mô tả

Tính:

* Mean
* Median
* Mode
* Variance
* Standard Deviation
* Range
* Percentile
* Quartile
* IQR

Ví dụ:

<pre class="overflow-visible! px-0!" data-start="942" data-end="1050"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼd ͼr"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼm">np</span><span class="ͼg">.</span><span>mean()</span><br/><span class="ͼm">np</span><span class="ͼg">.</span><span>median()</span><br/><span class="ͼm">stats</span><span class="ͼg">.</span><span>mode()</span><br/><span class="ͼm">np</span><span class="ͼg">.</span><span>var()</span><br/><span class="ͼm">np</span><span class="ͼg">.</span><span>std()</span><br/><span class="ͼm">np</span><span class="ͼg">.</span><span>percentile()</span><br/><span class="ͼm">np</span><span class="ͼg">.</span><span>quantile()</span><br/><span class="ͼm">stats</span><span class="ͼg">.</span><span>iqr()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

### 3. Kiểm tra dữ liệu

* Shape
* Dtype
* Missing values

### 4. Nhận xét

Ví dụ:

* Chất lượng rượu tập trung ở mức nào
* Dữ liệu có lệch hay không
* Có outlier hay không

---

## Bài tập thực hành 2

Dataset:

**Pima Indians Diabetes**

Nguồn:

[https://www.kaggle.com/code/vincentlugat/pima-indians-diabetes-eda-prediction-0-906](https://www.kaggle.com/code/vincentlugat/pima-indians-diabetes-eda-prediction-0-906)

Yêu cầu tương tự:

* Mean
* Median
* Mode
* Variance
* Std
* Percentile
* Quartile
* IQR
* Missing Values
* Nhận xét dữ liệu

---

# PHẦN 2: XỬ LÝ VÀ TRỰC QUAN HÓA DỮ LIỆU

## Bài tập thực hành 1

Dataset:

**Red Wine Quality**

Nguồn:

[https://www.kaggle.com/code/eisgandar/red-wine-quality-eda-classification](https://www.kaggle.com/code/eisgandar/red-wine-quality-eda-classification)

Yêu cầu:

### Vẽ biểu đồ

Ít nhất nên có:

#### Histogram

Ví dụ:

<pre class="overflow-visible! px-0!" data-start="1842" data-end="1870"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼd ͼr"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼm">sns</span><span class="ͼg">.</span><span>histplot()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

#### Boxplot

<pre class="overflow-visible! px-0!" data-start="1886" data-end="1913"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼd ͼr"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼm">sns</span><span class="ͼg">.</span><span>boxplot()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

#### Bar Chart

<pre class="overflow-visible! px-0!" data-start="1931" data-end="1958"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼd ͼr"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼm">sns</span><span class="ͼg">.</span><span>barplot()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

#### Scatter Plot

<pre class="overflow-visible! px-0!" data-start="1979" data-end="2010"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼd ͼr"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼm">sns</span><span class="ͼg">.</span><span>scatterplot()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

### Nhận xét

Ví dụ:

* Dữ liệu phân bố như thế nào
* Có ngoại lai hay không
* Thuộc tính nào ảnh hưởng tới chất lượng rượu

---

## Bài tập thực hành 2

### Dataset 1

Pima Indians Diabetes

Nguồn:

[https://www.kaggle.com/code/vincentlugat/pima-indians-diabetes-eda-prediction-0-906](https://www.kaggle.com/code/vincentlugat/pima-indians-diabetes-eda-prediction-0-906)

Thực hiện:

* Histogram
* Boxplot
* Scatterplot
* Heatmap

### Dataset 2

Online Retail Dataset

Nguồn:

[https://www.kaggle.com/code/rajatkumar30/eda-online-retail](https://www.kaggle.com/code/rajatkumar30/eda-online-retail)

Thực hiện EDA:

* Làm sạch dữ liệu
* Trực quan hóa
* Phân tích doanh thu
* Phân tích khách hàng
* Phân tích sản phẩm

---

# PHẦN 3: PHÂN TÍCH ĐƠN BIẾN VÀ HAI BIẾN

## Phân tích đơn biến (Univariate)

Mỗi biến phải được phân tích bằng:

### Histogram

<pre class="overflow-visible! px-0!" data-start="2792" data-end="2820"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼd ͼr"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼm">sns</span><span class="ͼg">.</span><span>histplot()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

### Bar Chart

<pre class="overflow-visible! px-0!" data-start="2837" data-end="2866"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼd ͼr"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼm">sns</span><span class="ͼg">.</span><span>countplot()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

### Pie Chart

<pre class="overflow-visible! px-0!" data-start="2883" data-end="2906"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼd ͼr"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼm">plt</span><span class="ͼg">.</span><span>pie()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

### Boxplot

<pre class="overflow-visible! px-0!" data-start="2921" data-end="2948"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼd ͼr"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼm">sns</span><span class="ͼg">.</span><span>boxplot()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

### Violin Plot

<pre class="overflow-visible! px-0!" data-start="2967" data-end="2997"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼd ͼr"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼm">sns</span><span class="ͼg">.</span><span>violinplot()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

### Describe

<pre class="overflow-visible! px-0!" data-start="3013" data-end="3040"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼd ͼr"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼm">df</span><span class="ͼg">.</span><span>describe()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

## Phân tích hai biến (Bivariate)

Yêu cầu sử dụng:

### Scatter Plot

<pre class="overflow-visible! px-0!" data-start="3157" data-end="3188"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼd ͼr"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼm">sns</span><span class="ͼg">.</span><span>scatterplot()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

### Crosstab

<pre class="overflow-visible! px-0!" data-start="3204" data-end="3231"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼd ͼr"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼm">pd</span><span class="ͼg">.</span><span>crosstab()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

### Pivot Table

<pre class="overflow-visible! px-0!" data-start="3250" data-end="3280"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼd ͼr"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼm">pd</span><span class="ͼg">.</span><span>pivot_table()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

### Pair Plot

<pre class="overflow-visible! px-0!" data-start="3297" data-end="3325"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼd ͼr"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼm">sns</span><span class="ͼg">.</span><span>pairplot()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

# PHẦN 4: EDA TỰ ĐỘNG

## Bài tập thực hành 1

Tìm hiểu và áp dụng:

### SweetViz

Cài đặt:

<pre class="overflow-visible! px-0!" data-start="3464" data-end="3496"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼd ͼr"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>pip install sweetviz</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

Dataset:

Marketing Campaign

Yêu cầu:

* Tạo báo cáo tự động
* Phân tích kết quả

---

## Bài tập thực hành 2

Tìm hiểu và áp dụng:

### AutoViz

Cài đặt:

<pre class="overflow-visible! px-0!" data-start="3694" data-end="3725"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼd ͼr"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>pip install autoviz</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

Dataset:

Marketing Campaign

Yêu cầu:

* Sinh báo cáo EDA tự động
* Nhận xét kết quả

---

# Nếu đây là bài nộp báo cáo hoàn chỉnh

Tôi khuyến nghị cấu trúc:

### Chương 1. Thống kê mô tả

* Giới thiệu dataset
* Thống kê mô tả
* Nhận xét

### Chương 2. Tiền xử lý dữ liệu

* Missing values
* Duplicate
* Data type
* Outlier

### Chương 3. Trực quan hóa dữ liệu

* Histogram
* Boxplot
* Scatterplot
* Bar chart
* Heatmap

### Chương 4. Phân tích đơn biến

* Histogram
* Boxplot
* Violin Plot

### Chương 5. Phân tích hai biến

* Scatterplot
* Correlation
* Pairplot
* Pivot Table

### Chương 6. EDA tự động

* ydata_profiling
* dtale
* SweetViz
* AutoViz

### Chương 7. Kết luận

* Các đặc điểm nổi bật của dữ liệu
* Các biến quan trọng
* Hướng xử lý tiếp theo

Đây là đầy đủ các đầu việc mà giảng viên mong đợi trong Lab 01 theo tài liệu.Mục tiêu của Lab

Mục tiêu là học cách:

Thống kê mô tả dữ liệu
Làm sạch dữ liệu
Trực quan hóa dữ liệu
Phân tích đơn biến (Univariate Analysis)
Phân tích hai biến (Bivariate Analysis)
Sử dụng các công cụ EDA tự động

Sinh viên phải dùng Python với các thư viện:

Pandas
NumPy
Matplotlib
Seaborn
SciPy
ydata_profiling
dtale
SweetViz
AutoViz

PHẦN 1: THỐNG KÊ MÔ TẢ
Bài tập thực hành 1

Dataset:

Red Wine Quality

Nguồn:
https://www.kaggle.com/code/eisgandar/red-wine-quality-eda-classification

Yêu cầu:

1. Đọc dữ liệu
pd.read_csv(...)
2. Thực hiện thống kê mô tả

Tính:

Mean
Median
Mode
Variance
Standard Deviation
Range
Percentile
Quartile
IQR

Ví dụ:

np.mean()
np.median()
stats.mode()
np.var()
np.std()
np.percentile()
np.quantile()
stats.iqr()
3. Kiểm tra dữ liệu
Shape
Dtype
Missing values
4. Nhận xét

Ví dụ:

Chất lượng rượu tập trung ở mức nào
Dữ liệu có lệch hay không
Có outlier hay không

Bài tập thực hành 2

Dataset:

Pima Indians Diabetes

Nguồn:

https://www.kaggle.com/code/vincentlugat/pima-indians-diabetes-eda-prediction-0-906

Yêu cầu tương tự:

Mean
Median
Mode
Variance
Std
Percentile
Quartile
IQR
Missing Values
Nhận xét dữ liệu

PHẦN 2: XỬ LÝ VÀ TRỰC QUAN HÓA DỮ LIỆU
Bài tập thực hành 1

Dataset:

Red Wine Quality

Nguồn:

https://www.kaggle.com/code/eisgandar/red-wine-quality-eda-classification

Yêu cầu:

Vẽ biểu đồ

Ít nhất nên có:

Histogram

Ví dụ:

sns.histplot()
Boxplot
sns.boxplot()
Bar Chart
sns.barplot()
Scatter Plot
sns.scatterplot()
Nhận xét

Ví dụ:

Dữ liệu phân bố như thế nào
Có ngoại lai hay không
Thuộc tính nào ảnh hưởng tới chất lượng rượu

Bài tập thực hành 2
Dataset 1

Pima Indians Diabetes

Nguồn:

https://www.kaggle.com/code/vincentlugat/pima-indians-diabetes-eda-prediction-0-906

Thực hiện:

Histogram
Boxplot
Scatterplot
Heatmap
Dataset 2

Online Retail Dataset

Nguồn:

https://www.kaggle.com/code/rajatkumar30/eda-online-retail

Thực hiện EDA:

Làm sạch dữ liệu
Trực quan hóa
Phân tích doanh thu
Phân tích khách hàng
Phân tích sản phẩm

PHẦN 3: PHÂN TÍCH ĐƠN BIẾN VÀ HAI BIẾN
Phân tích đơn biến (Univariate)

Mỗi biến phải được phân tích bằng:

Histogram
sns.histplot()
Bar Chart
sns.countplot()
Pie Chart
plt.pie()
Boxplot
sns.boxplot()
Violin Plot
sns.violinplot()
Describe
df.describe()

Phân tích hai biến (Bivariate)

Yêu cầu sử dụng:

Scatter Plot
sns.scatterplot()
Crosstab
pd.crosstab()
Pivot Table
pd.pivot_table()
Pair Plot
sns.pairplot()

PHẦN 4: EDA TỰ ĐỘNG
Bài tập thực hành 1

Tìm hiểu và áp dụng:

SweetViz

Cài đặt:

pip install sweetviz

Dataset:

Marketing Campaign

Yêu cầu:

Tạo báo cáo tự động
Phân tích kết quả

Bài tập thực hành 2

Tìm hiểu và áp dụng:

AutoViz

Cài đặt:

pip install autoviz

Dataset:

Marketing Campaign

Yêu cầu:

Sinh báo cáo EDA tự động
Nhận xét kết quả

Nếu đây là bài nộp báo cáo hoàn chỉnh

Tôi khuyến nghị cấu trúc:

Chương 1. Thống kê mô tả
Giới thiệu dataset
Thống kê mô tả
Nhận xét
Chương 2. Tiền xử lý dữ liệu
Missing values
Duplicate
Data type
Outlier
Chương 3. Trực quan hóa dữ liệu
Histogram
Boxplot
Scatterplot
Bar chart
Heatmap
Chương 4. Phân tích đơn biến
Histogram
Boxplot
Violin Plot
Chương 5. Phân tích hai biến
Scatterplot
Correlation
Pairplot
Pivot Table
Chương 6. EDA tự động
ydata_profiling
dtale
SweetViz
AutoViz
Chương 7. Kết luận
Các đặc điểm nổi bật của dữ liệu
Các biến quan trọng
Hướng xử lý tiếp theo

Đây là đầy đủ các đầu việc mà giảng viên mong đợi trong Lab 01 theo tài liệu.
