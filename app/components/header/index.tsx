// 'use client'; // ここで明示的にクライアントサイドで実行することを示します

// import { useEffect, useRef } from 'react';
// import lottie from 'lottie-web';

// export default function Header() {
//     const animationContainer = useRef<HTMLDivElement>(null); // 型を明示的に指定

//     useEffect(() => {
//         if (animationContainer.current) {
//             lottie.loadAnimation({
//                 container: animationContainer.current,
//                 renderer: 'svg',
//                 loop: true,
//                 autoplay: true,
//                 path: "" // publicディレクトリに配置した場合のパス
//             });
//         }
//     }, []);

//     return <div ref={animationContainer}></div>;
// }

export default function (){
    return (
        <div>
            ヘッダー
        </div>
    );
}