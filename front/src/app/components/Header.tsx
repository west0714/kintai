import Link from 'next/link';
import React from 'react';

export default function Header() {
    return (
        <header className="bg-gray-400 text-white p-4 shadow-md">
            <nav className="container mx-auto flex justify-center space-x-6">
                <Link href="/" className="hover:underline hover:text-gray-300 transition">勤怠</Link> {' '}
                <Link href="/rireki" className="hover:underline hover:text-gray-300 transition">履歴</Link> {' '}
                <Link href="/user" className="hover:underline hover:text-gray-300 transition">ユーザー管理</Link>
            </nav>
        </header>
    );
}