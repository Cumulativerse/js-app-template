/**
 * [Page] => [App]
 * [App] => [Page]
 */
export const MessageType = {
  AskConfirmation: 'ask-confirmation',
  ConfirmationResult: 'confirmation-result',
} as const;
export type MessageType = (typeof MessageType)[keyof typeof MessageType];
export type MessageMap = {
  [MessageType.AskConfirmation]: {
    type: typeof MessageType.AskConfirmation;
    question: string;
  };
  [MessageType.ConfirmationResult]: {
    type: typeof MessageType.ConfirmationResult;
    isAccepted: boolean;
  };
};

export const EventType = {
  CustomClick: 'custom-click',
  Message: 'message',
} as const;
type EventType = (typeof EventType)[keyof typeof EventType];
interface EventMap {
  [EventType.CustomClick]: CustomEvent<{ clickNum: number }>;
  [EventType.Message]: MessageEvent<MessageMap[MessageType]>;
}
declare global {
  interface Window {
    dispatchEvent<E extends EventType>(ev: EventMap[E]): void;
    postMessage<M extends MessageType>(message: MessageMap[M]): void;
    addEventListener<E extends EventType>(
      type: E,
      listener: (this: Window, ev: EventMap[E]) => any,
      options?: boolean | AddEventListenerOptions,
    ): void;
  }
}

/**
 * Extension inner request-response
 */
export const ExtMessageType = {
  AskClickNum: 'ask-click-num',
  AskConfirmation: MessageType.AskConfirmation,
  ConfirmationResult: MessageType.ConfirmationResult,
} as const;
export type ExtMessageType =
  (typeof ExtMessageType)[keyof typeof ExtMessageType];
export type ExtReqMap = {
  [ExtMessageType.AskClickNum]: { type: typeof ExtMessageType.AskClickNum };
  [ExtMessageType.AskConfirmation]: MessageMap[typeof MessageType.AskConfirmation];
  [ExtMessageType.ConfirmationResult]: MessageMap[typeof MessageType.ConfirmationResult];
};
export type ExtResMap = {
  [ExtMessageType.AskClickNum]: { clickNum: number };
  [ExtMessageType.AskConfirmation]: { isPopupOpened: boolean };
  [ExtMessageType.ConfirmationResult]: undefined;
};

declare global {
  namespace chrome.runtime {
    export function sendMessage<T extends ExtMessageType>(
      message: { type: T } & ExtReqMap[T],
    ): Promise<ExtResMap[T]>;
  }
  namespace chrome.tabs {
    export function sendMessage<T extends ExtMessageType>(
      tabId: number,
      message: { type: T } & ExtReqMap[T],
    ): Promise<ExtResMap[T]>;
  }
}
