// 子コンポーネント ChannelPageClient.tsx
import Youtube from '@/app/components/youtube';
import React from 'react';

interface ChannelPageClientProps {
    name: string;  // 親から渡される props の型
}

const ChannelPageClient: React.FC<ChannelPageClientProps> = ({ name }) => {
    return (
        <div>
            <h2>{decodeURIComponent(name)}</h2>
        </div>
    );
}

export default ChannelPageClient;
