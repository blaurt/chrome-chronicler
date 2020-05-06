chrome.runtime.onInstalled.addListener(function() {
  // chrome.storage.sync.set({ color: "#3aa757" }, function() {
  //   console.log("The color is green.");
  // });

  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   chrome.declarativeContent.onPageChanged.addRules([
  //     {
  //       conditions: [
  //         new chrome.declarativeContent.PageStateMatcher({
  //           pageUrl: { hostEquals: "developer.chrome.com" }
  //         })
  //       ],
  //       actions: [new chrome.declarativeContent.ShowPageAction()]
  //     }
  //   ]);
  // });
  chrome.windows.onCreated.addListener(function onWindowCreatedHandler(window) {
    startWatchOnTabsInWindow(window.id);
  });

  chrome.windows.onRemoved.addListener(function onWindowRemovedHandler(
    windowId
  ) {
    console.log("chrome.windows.onRemoved.addListener");
    chrome.windows.onCreated.removeListener(startWatchOnTabsInWindow);
  });
});

function startWatchOnTabsInWindow(windowId) {
  console.log("startWatchOnTabsInWindow -> windowId", windowId);
  chrome.tabs.query({}, function(tabs) {
    console.log("startWatchOnTabsInWindow -> tabs", tabs);
    for (const tab of tabs) {
      console.log("------------------");

      console.log(tab.title);
      console.log(tab.url);
    }
  });
}
