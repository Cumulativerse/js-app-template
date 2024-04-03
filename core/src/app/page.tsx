'use client';

import Link from 'next/link';
import { appNavs } from '@/data/navigation';
// Redux
import { useAppSelector } from '@/lib/redux/hooks';
import { selectAppType } from '@/lib/redux/features/environment/environment-slice';

export default function Home() {
  const appType = useAppSelector(selectAppType);
  return (
    <main className="flex flex-col items-center">
      <div className="prose lg:prose-xl my-4 text-center">
        <h1>APPs</h1>
        <p>Current app type is {appType}.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {appNavs.map((appNav) => (
          <div className="card bg-base-300 w-80 shadow-xl" key={appNav.name}>
            <div className="card-body">
              <h2 className="card-title">{appNav.name}</h2>
              <p>{appNav.description}</p>
              <div className="card-actions justify-end">
                {appNav.appType?.includes(appType || '') === false ? (
                  <button className="btn btn-disabled">
                    {appNav.appType.join(' or ')} version needed
                  </button>
                ) : (
                  <Link href={appNav.href} className="btn btn-primary">
                    GO
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
