'use client'

import { useState } from 'react'
import { useDatabase } from '../utils/indexedDB'
import styles from './styles.module.css'

function RegisterForm() {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const { addStreamer } = useDatabase()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!name.trim()) {
            setMessage('名前を入力してください。')
            return
        }

        const result = await addStreamer({ name })
        setMessage(result.message)
        if (result.success) {
            setName('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div>
                <label htmlFor="name" className={styles.label}>
                    名前
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                    required
                />
            </div>
            <button
                type="submit"
                className={styles.button}
            >
                登録
            </button>
            {message && (
                <p className={`${styles.message} ${message.includes('失敗') ? styles.error : styles.success}`}>
                    {message}
                </p>
            )}
        </form>
    )
}

export default function RegisterPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ストリーマー登録</h1>
            <RegisterForm />
        </div>
    )
}

