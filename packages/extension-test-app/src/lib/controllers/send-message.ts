import { EventType, MessageType, type MessageMap } from 'shared-lib';

export function broadcastClickNum(window: Window, clickNum: number) {
  const event = new CustomEvent(EventType.CustomClick, {
    detail: {
      clickNum,
    },
  });
  window.dispatchEvent<typeof EventType.CustomClick>(event);
}

export async function askConfirmation(window: Window, question: string) {
  const message = {
    type: MessageType.AskConfirmation,
    question,
  };
  let messageRes = listenMessage(window, MessageType.ConfirmationResult);
  window.postMessage<typeof MessageType.AskConfirmation>(message);
  return await messageRes;
}

async function listenMessage<T extends MessageType>(window: Window, type: T) {
  let message = new Promise<MessageMap[T]>(function (resolve, reject) {
    window.addEventListener('message', function listener(event) {
      const msg = event.data;
      if (msg.type === type) {
        window.removeEventListener('message', listener);
        resolve(msg as MessageMap[T]);
      }
    });
  });
  return message;
}
