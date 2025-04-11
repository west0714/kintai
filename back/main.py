from fastapi import FastAPI, Query
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from datetime import date, timedelta
from db import insert_user, all_user, insert_time, all_times, search_name, today_times

app = FastAPI()

#fastapi アクセス認証（ここからのアクセスならOK）
app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:3000"],  # Vue.jsのURLを指定
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

class Items(BaseModel):
    number: int
    name: str

class Times(BaseModel):
    number: int
    date: str
    time: str
    log_type: str


#打刻
@app.post("/times")
def checkin_time(item: Times):
    dates = item.date[:-3]
    date = dates.replace("/", "-")
    name = search_name(item.number)
    insert_time(item.number, name, date, item.time, item.log_type)
    return JSONResponse(content={"messge": "success"})

#ユーザー登録
@app.post("/newUser")
def register_user(item: Items):
    number, name = insert_user(item.number, item.name)
    return JSONResponse(content={"number": number, "name": name})

#登録済みユーザー
@app.get("/allUser")
def get_allUsers():
    rows = all_user()
    return JSONResponse(content=[
        {"number": row[0], "name": row[1]} for row in rows
    ])

#本日登録済み打刻
@app.get("/todaytimes")
def totday_time(day: str = Query(...)):
    days = day[:-3]
    days = days.replace("/", "-")
    rows = today_times(days)
    return JSONResponse(content=[
        {"id": row[0],
         "number": row[1],
         "name": row[2],
         "date": row[3].isoformat() if isinstance(row[3], date) else row[3],
         "time": str(row[4]) if isinstance(row[4], timedelta) else row[4], 
         "log_type": row[5]
        } 
        for row in rows
    ])

#登録済み打刻
@app.get("/allTimes")
def get_atimes(years: str = Query(...)):
    rows = all_times(years)
    return JSONResponse(content=[
        {"id": row[0],
         "number": row[1],
         "name": row[2],
         "date": row[3].isoformat() if isinstance(row[3], date) else row[3],
         "time": str(row[4]) if isinstance(row[4], timedelta) else row[4], 
         "log_type": row[5]
        } 
        for row in rows
    ])