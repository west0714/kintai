"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { RirekiURL } from "../patern/patern";
import { MonthOptions } from "../patern/patern";

export default function Rireki() {
    const [rireki, setRireki] = useState<Array<{ id: number, number: number, name: string, date: string, time: string, log_type: string}>>([]);
    const [selectMonth, setSelectMonth] = useState("");
    const [selectYear, setSelectYear] = useState("");

    const handelsearch = async () => {
        const years = selectYear + "-" + selectMonth
        console.log(years)
        try {
            const response = await axios.get(RirekiURL, {
                params: {years: years}
            });
            setRireki(response.data)
        } catch (error) {
            alert("error")
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex p-4">
                <label className="mt-1 px-4 py-2">年：</label>
                <input 
                    type="text"
                    placeholder="例 ）2025 (半角入力)"
                    value={selectYear}
                    onChange={(e) => setSelectYear(e.target.value)}
                    className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <select
                    value={selectMonth}
                    onChange={(e) => setSelectMonth(e.target.value)}
                    className='mt-1 px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
                >
                    <option value="" disabled>--月--</option>
                    {MonthOptions.map((m) => (
                        <option key={m.key} value={m.key}>{m.value}月</option>
                    ))}
                </select>
                <div className="flex mt-1 px-4 py-2">
                    <button
                        onClick={handelsearch}
                        className="rounded-md border border-transparent bg-blue-400 px-4 py-1 text-sm font-bold text-white "
                    >
                        検索
                    </button>
                </div>
            </div>
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
    );
}