import Link from 'next/link';
import { appNavs } from '@/data/navigation';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="prose lg:prose-xl my-4">
        <h1>APPs</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {appNavs.map((appNav) => (
          <div className="card w-80 shadow-xl" key={appNav.name}>
            <div className="card-body">
              <h2 className="card-title">{appNav.name}</h2>
              <p>{appNav.description}</p>
              <div className="card-actions justify-end">
                <Link href={appNav.href} className="btn btn-primary">
                  GO
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
