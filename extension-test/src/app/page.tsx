'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
// Controllers
import {
  broadcastClickNum,
  askConfirmation,
} from '@/lib/controllers/send-message';

export default function Home() {
  const [clickNum, setClickNum] = useState(0);
  const [question, setQuestion] = useState('Do you confirm?');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    broadcastClickNum(window, clickNum);
  }, [clickNum]);

  const handleClick = () => {
    setClickNum((prev) => prev + 1);
  };

  const handleConfirmation = async () => {
    setAnswer('Waiting...');
    const res = await askConfirmation(window, question);
    setAnswer(res.isAccepted ? 'Accepted' : 'Rejected');
  };
  return (
    <main className="container flex min-h-screen flex-col items-center justify-between px-4 py-8">
      <Image src="/logo.svg" alt="Logo" width={180} height={37} priority />
      <div className="prose lg:prose-xl mx-auto mt-2 text-center">
        <h1>Extension Test App</h1>
        <p>Webpage to test your extension</p>
      </div>

      <div className="flex flex-grow flex-col items-center justify-center">
        <button onClick={handleClick} className="btn btn-primary">
          Trigger Custom Click Event
        </button>
        <div>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="input input-bordered input-primary"
          />
          <button onClick={handleConfirmation} className="btn btn-primary m-2">
            Ask Confirmation To Extension
          </button>
          <span className="text-secondary text-sm">{answer}</span>
        </div>
      </div>
    </main>
  );
}
