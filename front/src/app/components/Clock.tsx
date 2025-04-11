"use client";
import axios from 'axios';
import {useState, useEffect} from 'react';
import { GetUserURL, TimeURL, RirekiURL, TodayURL } from '../patern/patern';
import { formatDate } from '../patern/patern';

export default function Clock() {
    const [time, setTime] = useState(new Date());
    const [number, setNumber] = useState("");
    const [allUser, setAllUser] = useState<Array<{ number: number, name: string}>>([]);
    const [rireki, setRireki] = useState<Array<{ id: number, number: number, name: string, date: string, time: string, log_type: string}>>([]);

    const [condition, setCondition] = useState(false);

    //時間表示
    useEffect(() => {
        const now = new Date(); //現在時刻
        const delay = (60 - now.getSeconds()) * 1000; //残り秒数を計算

        const timeout = setTimeout(() => {
            setTime(new Date()); //00秒になったら更新

            const interval = setInterval(() => {
                setTime(new Date()); //一分毎に更新
            }, 60000);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, []);

    //名前選択用
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get(GetUserURL);
                setAllUser(response.data)
                console.log(response.data)
            } catch (error) {
                alert("error")
            }
        };
        getUsers();
    }, []);

    //本日登録済 追加されたら再
    useEffect(() => {
        const get_rireki = async () => {
            try {
                const response = await axios.get(TodayURL, {
                    params: {day: today}
                });
                setRireki(response.data)
                console.log(response.data)
            } catch (error) {
                alert("error")
            }
        };
        get_rireki();
    }, [condition])

    const hour = String(time.getHours()).padStart(2, "0");
    const minute = String(time.getMinutes()).padStart(2, "0");
    const times = hour + ":" + minute; //時間
    const today = formatDate(); //日付


    //打刻
    const TimeInsert = async (changetype: string) => {
        try {
            const response = await axios.post(TimeURL, {
                number: number,
                date: today,
                time: times,
                log_type: changetype
            });
            console.log("送信完了");
            alert("成功")
        } catch (error) {
            console.error("エラー");
            alert("失敗");
        }
        setCondition(prevState => !prevState); // 状態を反転
        setAllUser([])
    };

    return (
        <div>
            <div className="flex justify-center p-5">
                <label className='text-2xl'>名前：</label>
                <select
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className='text-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
                >
                    <option value="" disabled>--選択してください--</option>
                    {allUser.map((m) => (
                        <option key={m.number} value={m.number}>{m.number}. {m.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex justify-center">
                <div className="flex justify-center p-6 bg-gray-100 shadow-md w-auto">
                    <h1 className="text-3xl font-bold text-gray-700">{today}</h1>
                    <h1 className="text-6xl font-bold text-gray-700 p-4">{times}</h1>
                </div>
            </div>
            <div className="flex space-x-4 p-5 bg-white rounded-lg justify-center">
                <button onClick={() => TimeInsert('出勤')} className="bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-4 px-4 rounded w-28">出勤</button>
                <button onClick={() => TimeInsert('退勤')} className="bg-red-500 hover:bg-red-700 text-lg text-white font-bold py-4 px-4 rounded w-28">退勤</button>
                <button onClick={() => TimeInsert('休始')} className="bg-yellow-500 hover:bg-yellow-700 text-lg text-white font-bold py-4 px-4 rounded w-28">休始</button>
                <button onClick={() => TimeInsert('休終')} className="bg-green-500 hover:bg-green-700 text-lg text-white font-bold py-4 px-4 rounded w-28">休終</button>
            </div>

            <div className="container mx-auto p-4">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">名前</th>
                            <th className="border p-2">日付</th>
                            <th className="border p-2">時間</th>
                            <th className="border p-2">状態</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rireki.map((log) => (
                            <tr key={log.id} className="text-center">
                                <td className="border p-2">{log.number}</td>
                                <td className="border p-2">{log.name}</td>
                                <td className="border p-2">{log.date}</td>
                                <td className="border p-2">{log.time}</td>
                                <td className="border p-2">{log.log_type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}