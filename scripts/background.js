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

let tabUpdateHandler = (tabId, {url: updatedUrl, status}, tab) => {
    if (updatedUrl) {
        console.log("Updated!");
        removeShorts(tabId);
    }
}

chrome.tabs.onUpdated.addListener(tabUpdateHandler);