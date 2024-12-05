// interface Video {
//     id: { videoId: string };
//     snippet: {
//         title: string;
//         description: string;
//         thumbnails: {
//             medium: { url: string; width: number; height: number };
//         };
//     };
// }

// // 非同期でYouTubeのチャンネル情報を取得
// async function fetchYouTubeVideos(channelId: string) {
//     const apiKey = process.env.YOUTUBE_API_KEY;
//     const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=5&order=date&type=video&key=${apiKey}`;

//     const res = await fetch(apiUrl);
//     if (!res.ok) {
//         throw new Error('Failed to fetch data from YouTube API');
//     }

//     const data = await res.json();
//     return data.items as Video[];
// }

// export default async function Youtube(/*{ searchParams }: { searchParams: { channelId?: string } }*/) {
//     // searchParamsを非同期に取得する方法
//     // const { channelId } = searchParams || {};  // 非同期で取得したchannelIdを使用
//     const resolvedChannelId = 'UC_x5XG1OV2P6uZZ5FSM9Ttw'; // デフォルトのチャンネルID
//     const videos = await fetchYouTubeVideos(resolvedChannelId);

//     return (
//         <div>

//             {/* チャンネル動画リスト */}
//             <ul>
//                 {videos.map((video) => (
//                     <li key={video.id.videoId}>
//                         <h3>{video.snippet.title}</h3>
//                         <p>{video.snippet.description}</p>
//                         <img
//                             src={video.snippet.thumbnails.medium.url}
//                             alt={video.snippet.title}
//                             width={video.snippet.thumbnails.medium.width}
//                             height={video.snippet.thumbnails.medium.height}
//                         />
//                         <a
//                             href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                         >
//                             Watch on YouTube
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }


'use client';

import { useEffect, useState } from 'react';

interface Video {
    id: { videoId: string };
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            medium: { url: string; width: number; height: number };
        };
    };
}

// 非同期でYouTubeのチャンネル情報を取得
async function fetchYouTubeVideos(channelId: string) {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;  // 環境変数から取得
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=5&order=date&type=video&key=${apiKey}`;
    console.log('API Key:', apiKey);
    try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
            const errorData = await res.json();  // エラーレスポンスを取得
            console.error('YouTube API Error:', errorData);  // 詳細なエラーメッセージを表示
            throw new Error(`YouTube API Error: ${JSON.stringify(errorData)}`);
        }

        const data = await res.json();
        return data.items;
    } catch (error) {
        console.error('Failed to fetch YouTube videos:', error);  // エラーメッセージをログに出力
        throw error;  // エラーを再度スロー
    }
}



export default function Youtube() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadVideos() {
            try {
                const resolvedChannelId = 'UC_x5XG1OV2P6uZZ5FSM9Ttw'; // デフォルトのチャンネルID
                const fetchedVideos = await fetchYouTubeVideos(resolvedChannelId);
                setVideos(fetchedVideos);
            } catch (err: any) {
                console.error('Error loading videos:', err);  // エラーログの表示
                setError('Failed to load videos.'); // ユーザーにわかりやすいメッセージ
            } finally {
                setLoading(false);
            }
        }
    
        loadVideos();
    }, []);
    

    if (loading) {
        return <p>Loading videos...</p>;
    }

    if (error) {
        return <p>{error}</p>; // エラーメッセージを表示
    }

    return (
        <div>
            <ul>
                {videos.map((video) => (
                    <li key={video.id.videoId}>
                        <h3>{video.snippet.title}</h3>
                        <p>{video.snippet.description}</p>
                        <img
                            src={video.snippet.thumbnails.medium.url}
                            alt={video.snippet.title}
                            width={video.snippet.thumbnails.medium.width}
                            height={video.snippet.thumbnails.medium.height}
                        />
                        <a
                            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Watch on YouTube
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
