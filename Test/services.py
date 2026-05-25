import gspread
from oauth2client.service_account import ServiceAccountCredentials
import pandas as pd

def get_data_from_sheets():
    # 1. Khai báo quyền truy cập vào Google Drive và Sheets
    scope = [
        "https://spreadsheets.google.com/feeds",
        "https://www.googleapis.com/auth/drive"
    ]
    
    # 2. Nạp file cấu hình Service Account bí mật
    creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
    client = gspread.authorize(creds)
    
    # 3. Mở file Sheets bằng URL (Dán đúng cái link URL file Sheets của bạn vào đây)
    sheet_url = "https://docs.google.com/spreadsheets/d/1Whg61pdUfs1vXva9VCSdAz8620noyQUah1WzqIH-yIg/edit?hl=vi&gid=0#gid=0"
    workbook = client.open_by_url(sheet_url)
    worksheet = workbook.get_worksheet(0) # Lấy tab đầu tiên (Sheet1)
    
    # 4. Đọc toàn bộ dữ liệu và chuyển thành Pandas DataFrame để chuẩn bị tính toán
    records = worksheet.get_all_records()
    df = pd.DataFrame(records)
    
    return df