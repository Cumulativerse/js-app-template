'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
// Controllers
import { respondQuestion } from '@/lib/controllers/send-message';

export default function Popup() {
  const searchParams = useSearchParams();

  const confirmationHandler = async (isAccepted: boolean) => {
    respondQuestion(window, searchParams.get('hostTabId'), isAccepted);
  };

  return (
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
        <p className="my-2 text-center">{searchParams.get('question')}</p>

        <div>
          <button
            onClick={() => confirmationHandler(true)}
            className="mx-2 rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Accept
          </button>
          <button
            onClick={() => confirmationHandler(false)}
            className="mx-2 rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      </div>

      <div></div>
    </main>
  );
}
