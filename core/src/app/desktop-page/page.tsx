'use client';

export default function Home() {
  return (
    <main className="prose lg:prose-xl">
      <h1>Desktop Page</h1>
      <button
        onClick={() => window.desktopApi?.logNodejs({ name: 'electron' })}
        className="btn btn-primary mr-2"
      >
        Log To Nodejs Process
      </button>
      <button
        onClick={() =>
          window.desktopApi
            ?.logBrowser()
            .then((packages) => console.log(packages))
        }
        className="btn btn-primary"
      >
        Log To Browser Process
      </button>
    </main>
  );
}
