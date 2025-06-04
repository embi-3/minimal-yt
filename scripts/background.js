function removeShorts(tabId) {
    chrome.scripting.executeScript({
        target: {
            tabId: tabId
        },
        files: [
            "scripts/shorts.js"
        ]
    });
}

function redirect(tabId) {
    chrome.scripting.executeScript({
        target: {
            tabId: tabId
        },
        files: [
            "scripts/redirect.js"
        ]
    });
}

let tabUpdateHandler = (tabId, {url: updatedUrl, status}, tab) => {
    console.log(updatedUrl);
    if (updatedUrl?.startsWith("https://www.youtube.com/shorts/")) {
        redirect(tabId);
    } else if (updatedUrl?.startsWith("https://www.youtube.com/")) {
        removeShorts(tabId);
        activeObservers[tabId] = true;
    }
}


// Store whether the script has been activated on each tab.
// See: https://stackoverflow.com/questions/11112270/chrome-extension-attach-properties-to-each-tab

let activeObservers = {};

// chrome.tabs.onCreated.addListener(tabUpdateHandler);
chrome.tabs.onUpdated.addListener(tabUpdateHandler);
chrome.tabs.onReplaced.addListener(tabUpdateHandler);
chrome.tabs.onRemoved.addListener((tabId) => {
    delete activeObservers[tabId];
});
