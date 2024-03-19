export {};

declare global {
  interface Window {
    desktopApi: {
      logNodejs: (arg1: { [key: string]: string }) => void;
      logBrowser: () => Promise<string>;
    };
  }
}
