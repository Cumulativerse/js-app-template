import { EventType, ExtMessageType } from 'shared-lib';
import type { ExtReqMap, ExtResMap } from 'shared-lib';

console.log('Content script loaded!');

/**
 * Detect events from page
 * <Warning> Do not pass whole event to sendMessage, it will only pass "isTrusted" property
 */
let clickNum = 0;

// Listen for a custom click event.
window.addEventListener(EventType.CustomClick, async function (event) {
  clickNum = event.detail.clickNum;
});

// Proxy messages to extension.
window.addEventListener(EventType.Message, async function (event) {
  if (event.data.type === ExtMessageType.AskConfirmation) {
    const response = await chrome.runtime.sendMessage({
      ...event.data,
    });
    !response.isPopupOpened && alert(`A popup is already opened!`);
  }
});

/**
 * Listen for Content Requests
 */
function extMessageHandler(
  msg: ExtReqMap[ExtMessageType],
  sender: chrome.runtime.MessageSender,
  sendResponse: <E extends ExtMessageType>(response: ExtResMap[E]) => void,
) {
  if (msg.type === ExtMessageType.ConfirmationResult) {
    window.postMessage<typeof ExtMessageType.ConfirmationResult>(msg);
    sendResponse<typeof msg.type>(undefined);
  } else if (msg.type === ExtMessageType.AskClickNum) {
    sendResponse<typeof msg.type>({
      clickNum,
    });
  } else {
    // <Warning> Don't use here, or it will capture unrelated messages
  }
}

chrome.runtime.onMessage.addListener(extMessageHandler);
