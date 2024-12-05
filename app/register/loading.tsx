'use client';

import React from 'react';
import styles from './loading.module.css';  // CSSモジュールをインポート

const LoadingSpinner = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            {/* pタグにローカルクラスを適用 */}
            <p className={styles.loadingText}>Loading videos...</p>
        </div>
    );
};

export default LoadingSpinner;
