import mysql.connector

def get_db():
    conn = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "ait2024",
        database = "kintaidb"
    )
    return conn


#打刻
def insert_time(number, name, date, time, type):
    conn = get_db()
    cur = conn.cursor()
    sql = "INSERT INTO kintai_logs(number, name, date, time, log_type) VALUES(%s, %s, %s, %s, %s)"
    cur.execute(sql, (number, name, date, time, type))
    conn.commit()
    conn.close()

#名前取得
def search_name(number):
    conn = get_db()
    cur = conn.cursor()
    sql = f"SELECT name from user WHERE number={number}"
    cur.execute(sql)
    rows = cur.fetchone()
    conn.close()
    return rows[0]  

#本日登録
def today_times(today):
    conn = get_db()
    cur = conn.cursor()
    sql = f"SELECT * from kintai_logs WHERE date='{today}'"
    cur.execute(sql)
    rows = cur.fetchall()
    conn.close()
    return rows

#登録済み(年月指定)
def all_times(years):
    conn = get_db()
    cur = conn.cursor()
    sql = f"SELECT * from kintai_logs WHERE DATE_FORMAT(date, '%Y-%m') = '{years}'"
    cur.execute(sql)
    rows = cur.fetchall()
    conn.close()
    return rows

#ユーザー登録
def insert_user(number, name):
    conn = get_db()
    cur = conn.cursor()
    sql = "INSERT INTO user(number, name) VALUES(%s, %s)"
    cur.execute(sql, (number, name))
    conn.commit()
    conn.close()
    return number, name

#登録済みユーザー
def all_user():
    conn = get_db()
    cur = conn.cursor()
    sql = "SELECT number, name from user"
    cur.execute(sql)
    rows = cur.fetchall()
    conn.close()
    return rows