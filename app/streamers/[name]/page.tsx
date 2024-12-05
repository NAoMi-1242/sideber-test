import ChannelPageClient from './ChannelPageClient';

export default async function ChannelPageWrapper({ params }: { params: { name: string } }) {
    const { name } = await params; // 非同期的にparamsを解決
    return <ChannelPageClient name={name} />;
}