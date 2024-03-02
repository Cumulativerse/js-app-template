'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Controllers
import { checkClickNum } from '@/lib/controllers/send-message';

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
    <div className="mx-auto h-[600px] w-[400px]">
      {/* Above is added for extension */}
      <main className="flex min-h-screen flex-col items-center justify-between p-12">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/logo.svg"
          alt="Logo"
          width={180}
          height={37}
          priority
        />

        <div>
          <p className="my-2 text-center">Click Number: {clickNum}</p>
        </div>

        <div className="my-8 grid text-center">
          <Link
            href="/tmp/redux"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Test{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Redux examples
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
