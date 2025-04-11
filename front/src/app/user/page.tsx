"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { NewUserURL, GetUserURL } from "../patern/patern";

export default function User() {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [allUser, setAllUser] = useState<Array<{ number: number, name: string}>>([]);

    //ユーザーをDBに保存
    const registarUser = async (e: React.FormEvent) => {
        try {
            const payload = {
                number: number,
                name: name
            };
            const response = await axios.post(NewUserURL, payload);
            console.log("送信完了：", response.data);
            alert(`登録されました`);

            setName("");
            setNumber("");
        } catch (error) {
            console.error("送信エラー：", error);
            alert("失敗しました");
        }
    };

    const checkUser= async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.get(GetUserURL);
            setAllUser(response.data)
        } catch (error) {
            console.error("送信エラー：", error);
            alert("失敗しました");
        }
    };

    return (
        <div>
            <div className="bg-white p-8 shadow-lg rounded-lg w-full justify-center">
                <h1 className="text-2xl font-bold text-center text-gray-800 p-2">ユーザー登録</h1>
                <div>
                    <input
                        type="number"
                        placeholder="スマイルナンバー"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="例：山田太郎"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button 
                    onClick={registarUser}
                    className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    登録
                </button>
            </div>
            <div className="bg-white p-8 rounded-lg w-full justify-center">
                <h2 className="text-2xl font-bold text-center text-gray-800 p-2">登録ユーザー一覧</h2>
                <button 
                    onClick={checkUser}
                    className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    取得
                </button>
                <ul className="text-lg pl-5 space-y-2 p-5">
                    {allUser.map((user) => (
                        <li key={user.number}>{user.number}:{user.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}