'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { respondQuestion } from '@/lib/send-message';

export default function Popup() {
  const searchParams = useSearchParams();

  const confirmationHandler = async (isAccepted: boolean) => {
    respondQuestion(window, searchParams.get('hostTabId'), isAccepted);
  };

  return (
    <main className="flex flex-col items-center">
      <div className="prose lg:prose-xl">
        <h1>Popup Page</h1>
        <p className="text-center">{searchParams.get('question')}</p>
      </div>

      <div>
        <button
          onClick={() => confirmationHandler(true)}
          className="btn btn-primary mr-2"
        >
          Accept
        </button>
        <button
          onClick={() => confirmationHandler(false)}
          className="btn btn-secondary"
        >
          Reject
        </button>
      </div>
    </main>
  );
}
