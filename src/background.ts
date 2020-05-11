import { AppMessageSender } from "./core/MessageSender";

export type BACKGROUND_SCRIPT_EVENTS = "BG:";
class BackgroundHandler {
  constructor() {
    // super();
    this.init();
  }

  private init() {
    chrome.runtime.onMessage.addListener(this.handleMessage);
  }
  private handleMessage(request, sender, sendResponse) {
    console.log(
      "backgroundMessageListener -> request, sender, sendResponse",
      request,
      sender,
      sendResponse
    );
  }
}

new BackgroundHandler();
