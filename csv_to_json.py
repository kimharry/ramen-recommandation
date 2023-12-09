import csv
import json

# csv 파일 경로
csv_file_path = 'ramen_DB_final.csv'

# csv 파일 읽어오기
with open(csv_file_path, 'r', encoding='utf-8-sig') as f:
    reader = csv.reader(f)
    next(reader)  # 첫 줄 skip

    # 각 라인마다 딕셔너리 생성 후 리스트에 추가
    data = []
    for line in reader:
        d = {
            'name': line[0],
            'noodle': line[22].replace(' ', ''),
            'soup': line[23].replace(' ', ''),
            'calories': float(line[11]),
            'sodium': float(line[17]),
        }
        print(d)
        data.append(d)

# json string으로 변환
# json_string = json.dumps(data, ensure_ascii=False, indent=2)

# print(json_string)

# txt 파일로 저장할 경로
json_file_path = 'ramen_DB_final.json'

# txt 파일 쓰기
with open(json_file_path, 'w', encoding='utf-8-sig') as f:
    f.write(json.dumps(data, ensure_ascii=False, indent=4))