export const NewUserURL = "http://127.0.0.1:8000/newUser"

export const GetUserURL = "http://127.0.0.1:8000/allUser"

export const TimeURL = "http://127.0.0.1:8000/times"

export const RirekiURL = "http://127.0.0.1:8000/allTimes"

export const TodayURL = "http://127.0.0.1:8000/todaytimes"


export const formatDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() +1).padStart(2,"0");
    const date = String(now.getDate()).padStart(2,"0");
    const day = now.getDay();
    const week = ["日", "月", "火", "水", "木", "金", "土"][day];
  
    return `${year}/${month}/${date}(${week})`;
};

export const MonthOptions = [
    {key: "01", value: "1"},
    {key: "02", value: "2"},
    {key: "03", value: "3"},
    {key: "04", value: "4"},
    {key: "05", value: "5"},
    {key: "06", value: "6"},
    {key: "07", value: "7"},
    {key: "08", value: "8"},
    {key: "09", value: "9"},
    {key: "10", value: "10"},
    {key: "11", value: "11"},
    {key: "12", value: "12"},
]