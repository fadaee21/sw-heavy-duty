import { useState } from 'react';

const HeavyTask = () => {
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateSum = () => {
    setLoading(true);
    let sum = 0;
    for (let i = 0; i < 5e9; i++) sum += i;
    setResult(sum);
    setLoading(false);
  };

  return (
    <div>
      <h2>بدون Worker (UI فریز میشود)</h2>
      <button onClick={calculateSum} disabled={loading}>
        {loading ? 'در حال محاسبه...' : 'شروع محاسبه سنگین'}
      </button>
      {result !== null && <p>نتیجه: {result}</p>}
    </div>
  );
};

export default HeavyTask;