import { ExtMessageType, type ExtReqMap, type ExtResMap } from 'shared-lib';

console.log('Background script loaded!');

/**
 * Popup Handling
 */
let currentPopup: chrome.windows.Window | undefined;

async function triggerPopup<T extends ExtMessageType>(
  hostTabId: number,
  request: { type: T } & ExtReqMap[T],
) {
  const handlePopupClosed = (windowId: number) => {
    if (currentPopup && windowId == currentPopup.id) {
      currentPopup = undefined;
    }
  };

  if (!currentPopup) {
    const popupPath = chrome.runtime.getURL(`./popup.html`);
    let popupUrl = new URL(popupPath);
    popupUrl.searchParams.append('hostTabId', hostTabId.toString());
    for (const [key, value] of Object.entries(request)) {
      popupUrl.searchParams.append(key, value);
    }
    const window = await chrome.windows.create({
      url: popupUrl.toString(),
      type: 'popup',
      height: 700,
      width: 450,
      left: 500,
    });
    currentPopup = window;
    chrome.windows.onRemoved.addListener(handlePopupClosed);
    return true;
  } else {
    return false;
  }
}

/**
 * Listen for Background Requests
 */
function extMessageHandler(
  msg: ExtReqMap[ExtMessageType],
  sender: chrome.runtime.MessageSender,
  sendResponse: <E extends ExtMessageType>(response: ExtResMap[E]) => void,
) {
  if (msg.type === ExtMessageType.AskConfirmation && sender.tab?.id) {
    triggerPopup(sender.tab?.id, msg).then((isPopupOpened) => {
      sendResponse<typeof msg.type>({
        isPopupOpened,
      });
    });
    // <Warning> Return true to indicate you want to send a response asynchronously
    return true;
  } else {
    // <Warning> Don't use here, or it will capture unrelated messages
  }
}

chrome.runtime.onMessage.addListener(extMessageHandler);
