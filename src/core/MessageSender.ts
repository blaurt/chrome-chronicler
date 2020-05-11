import { POPUP_PAGE_EVENTS } from "../popup/popup";
import { BACKGROUND_SCRIPT_EVENTS } from "../background";

export type AppEvents = BACKGROUND_SCRIPT_EVENTS | POPUP_PAGE_EVENTS;

export abstract class AppMessageSender {
  protected sendToBackground(eventName: AppEvents, payload: any) {
    chrome.runtime.sendMessage(this.composeMessage(eventName, payload));
  }

  protected composeMessage(type: AppEvents, payload: any) {
    return {
      type,
      payload
    };
  }
}
