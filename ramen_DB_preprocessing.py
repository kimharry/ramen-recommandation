import pandas as pd

# Read the data
df = pd.read_csv('ramen_DB.csv')

# 중복 제거
df = df.drop_duplicates(['식품명'], keep='first')

# 중복 제거 후 인덱스 재설정
df = df.reset_index(drop=True)

# 중복 제거 후 데이터 저장
df.to_csv('ramen_DB.csv', index=False, encoding='utf-8-sig')