import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export const QrScanner = () => {
    const [scanResult, setScanResult] = useState<string | null>(null);
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {
        scannerRef.current = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            /* verbose= */ false
        );

        scannerRef.current.render(
            (text) => {
                setScanResult(text);
                scannerRef.current?.clear(); // Останавливаем после сканирования
            },
            (error) => {
                console.error("Ошибка сканирования:", error);
            }
        );

        return () => {
            scannerRef.current?.clear();
        };
    }, []);

    return (
        <div>
            <h1>Сканировать QR-код</h1>
            {!scanResult ? (
                <div id="reader" style={{ width: '300px' }} />
            ) : (
                <p>Результат: {scanResult}</p>
            )}
        </div>
    );
};
