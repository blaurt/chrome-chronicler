import { AppMessageSender } from "../core/MessageSender";
export type POPUP_PAGE_EVENTS = "POPUP:FETCHED_TABS_LIST";

class PopupHandler extends AppMessageSender {
  constructor() {
    super();
    this.init();
  }

  private init() {
    const trigger = document.getElementById("snapshot-trigger");
    trigger.onclick = this.queryTabs;
  }

  private queryTabs = () => {
    chrome.tabs.query({}, tabs => {
      this.sendToBackground("POPUP:FETCHED_TABS_LIST", tabs);
    });
  };
}

new PopupHandler();
