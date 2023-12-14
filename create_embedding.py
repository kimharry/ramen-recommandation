import openai
import pandas as pd 
import csv
import config

with open('ramen_DB_final.json',encoding='UTF-8-sig') as f:
    temp = csv.loads(f.read())
df = pd.DataFrame(temp)   

openai.api_key = config.api_key
openai_model = 'text-embedding-ada-002'

overview_emb = []
for i in range(df.shape[0]):
    text = df['soup'][i]
    result = openai.Embedding.create(model=openai_model, input=text)
    result_emb = result['data'][0]['embedding']
    overview_emb.append(result_emb)

df.to_csv('ramen_DB_final_embedded.csv', encoding='utf-8-sig', index=False)