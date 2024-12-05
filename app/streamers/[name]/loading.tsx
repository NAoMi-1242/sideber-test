// loading.tsx
import React from 'react';
import './loading.css';  // CSSファイルをインポート

const LoadingSpinner = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading videos...</p>
        </div>
    );
};

export default LoadingSpinner;
