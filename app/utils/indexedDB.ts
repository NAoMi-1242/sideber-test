import { Dexie, Table } from 'dexie';

interface Streamer {
    name: string;
    youtube?: string | null;
    twitch?: string | null;
    twitter?: string | null;
}

class MyDatabase extends Dexie {
    streamers!: Table<Streamer>;

    constructor() {
        super('MyStreamersDatabase');
        this.version(1).stores({
            streamers: 'name, youtube, twitch, twitter'
        });
    }
}

const db = new MyDatabase();

export const useDatabase = () => {
    const addStreamer = async (streamer: Streamer): Promise<{ success: boolean; message: string }> => {
        try {
            // 同じ名前のストリーマーが存在するかチェック
            const existingStreamer = await db.streamers.get(streamer.name);
            if (existingStreamer) {
                return { success: false, message: '同じ名前のストリーマーが既に存在します。' };
            }

            // 新しいストリーマーを追加
            await db.streamers.add(streamer);
            console.log('Streamer added with name:', streamer.name);
            return { success: true, message: 'ストリーマーが正常に追加されました。' };
        } catch (error) {
            console.error('Failed to add streamer:', error);
            return { success: false, message: 'ストリーマーの追加に失敗しました。' };
        }
    };

    const getStreamer = async (name: string): Promise<Streamer | null> => {
        try {
            const streamer = await db.streamers.get(name);
            if (!streamer) {
                console.warn(`Streamer with name "${name}" not found.`);
            }
            return streamer || null;
        } catch (error) {
            console.error(`Failed to retrieve streamer with name "${name}":`, error);
            return null;
        }
    };

    const getAllStreamers = async (): Promise<Streamer[]> => {
        try {
            return await db.streamers.toArray();
        } catch (error) {
            console.error('Failed to retrieve streamers:', error);
            return [];
        }
    };

    const updateStreamer = async (name: string, updates: Partial<Streamer>): Promise<{ success: boolean; message: string }> => {
        try {
            await db.streamers.update(name, updates);
            return { success: true, message: 'ストリーマー情報が正常に更新されました。' };
        } catch (error) {
            console.error('Failed to update streamer:', error);
            return { success: false, message: 'ストリーマー情報の更新に失敗しました。' };
        }
    };

    const deleteStreamer = async (name: string): Promise<{ success: boolean; message: string }> => {
        try {
            await db.streamers.delete(name);
            return { success: true, message: 'ストリーマーが正常に削除されました。' };
        } catch (error) {
            console.error('Failed to delete streamer:', error);
            return { success: false, message: 'ストリーマーの削除に失敗しました。' };
        }
    };

    return {
        addStreamer,
        getStreamer,
        getAllStreamers,
        updateStreamer,
        deleteStreamer,
    };
};