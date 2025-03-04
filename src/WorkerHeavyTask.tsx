import { useState, useRef, useEffect } from 'react';

// ایجاد TypeScript type برای پیامهای Worker
type WorkerMessage = {
  data: number;
};

const WorkerHeavyTask = () => {
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  const startWorkerCalculation = () => {
    // اگر Worker قبلی فعال است، آن را متوقف کن
    if (workerRef.current) {
      workerRef.current.terminate();
    }
    setLoading(true);
    setResult(null);
    // ایجاد یک Worker جدید برای هر محاسبه
    const worker = new Worker(new URL('./heavyWorker.ts', import.meta.url), {
      type: 'module'
    });
    workerRef.current = worker;
    worker.onmessage = (e: WorkerMessage) => {
      setResult(e.data);
      setLoading(false);
      workerRef.current = null; // ریست کردن رفرنس
    };
    worker.onerror = (error) => {
      console.error('Worker error:', error);
      setLoading(false);
      workerRef.current = null;
    };
    worker.postMessage('start');
  };
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        console.log('Worker terminated by cleanup');
      }
    };
  }, []); 
  return (
    <div>
      <h2>با Web Worker (UI روان)</h2>
      <button onClick={startWorkerCalculation} disabled={loading}>
        {loading ? 'در حال محاسبه...' : 'شروع محاسبه با Worker'}
      </button>
      {result !== null && <p>نتیجه: {result}</p>}
    </div>
  );
};

export default WorkerHeavyTask;