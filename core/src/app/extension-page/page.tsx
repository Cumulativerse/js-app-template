'use client';

import { useState, useEffect } from 'react';
import { checkClickNum } from '@/lib/send-message';

export default function Home() {
  const [clickNum, setClickNum] = useState<number>();

  useEffect(() => {
    const checkClickHandler = async () => {
      const response = await checkClickNum();
      setClickNum(response.clickNum);
    };
    checkClickHandler();
  }, []);

  return (
    <main className="prose lg:prose-xl">
      <h1>Extension Page</h1>

      <p className="text-center">Click Number: {clickNum}</p>
    </main>
  );
}
