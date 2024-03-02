import { ExtMessageType } from 'shared-lib';

export async function checkClickNum() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return await chrome.tabs.sendMessage(tabs[0].id!, {
    type: ExtMessageType.AskClickNum,
  });
}

export async function respondQuestion(
  window: Window,
  hostTabId: string | string[] | null,
  isAccepted: boolean,
) {
  const msg = {
    type: ExtMessageType.ConfirmationResult,
    isAccepted,
  };
  if (!Number.isNaN(hostTabId)) {
    await chrome.tabs.sendMessage(Number(hostTabId), msg);
    window.close();
  }
}
