'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HomeIcon,
    UserPlusIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useDatabase } from '../../utils/indexedDB';
import './Sidebar.css';

// メニューアイテムの型定義
type MenuItem = {
    icon: React.ElementType;
    title: string;
    href: string;
};

// ストリーマーの型定義
type Streamer = {
    name: string;
};

const staticMenuItems: MenuItem[] = [
    {
        icon: HomeIcon,
        title: 'ホーム',
        href: '/',
    },
    {
        icon: UserPlusIcon,
        title: '追加',
        href: '/register',
    },
];

export default function Sidebar() {
    const path = usePathname(); // useRouterを使って現在のURLを取得
    const [activeUrl, setActiveUrl] = useState<string>(''); // 現在のパスを管理
    const [streamers, setStreamers] = useState<Streamer[]>([]);
    const { getAllStreamers }: { getAllStreamers: () => Promise<Streamer[]> } = useDatabase();

    useEffect(() => {
        // 現在のパスをactiveUrlに設定
        setActiveUrl(decodeURIComponent(path));
    }, [path]); // pathが変更されるたびにactiveUrlを更新

    useEffect(() => {
        const fetchStreamers = async () => {
            try {
                const fetchedStreamers = await getAllStreamers();
                setStreamers(fetchedStreamers);
            } catch (error) {
                console.error('Failed to fetch streamers:', error);
            }
        };
        fetchStreamers();
    }, [getAllStreamers]);

    const handleItemClick = (itemUrl: string): void => {
        setActiveUrl(itemUrl); // クリックしたアイテムのURLを設定
    };

    return (
        <div className="navigation">
            <ul>
                {staticMenuItems.map(({ icon: Icon, title, href }) => (
                    <li
                        key={title}
                        className={`list ${activeUrl === href ? 'active' : ''}`} // activeUrlで比較
                        onClick={() => handleItemClick(href)} // クリックしたURLを設定
                    >
                        <Link href={href} className="menu-link">
                            <span className="icon">
                                <Icon className="iconSize" />
                            </span>
                            <span className="title">{title}</span>
                        </Link>
                    </li>
                ))}
                <hr />
                {streamers.map(({ name }) => (
                    <li
                        key={name}
                        className={`list ${activeUrl === `/streamers/${name}` ? 'active' : ''}`} // activeUrlで比較
                        onClick={() => handleItemClick(`/streamers/${name}`)} // クリックしたストリーマー名を設定
                    >
                        <Link href={`/streamers/${name}`} className="menu-link">
                            <span className="icon">
                                <UserCircleIcon className="iconSize" />
                            </span>
                            <span className="title">{name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
