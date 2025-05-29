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
    } else if (updatedUrl) {
        removeShorts(tabId);
    }
}

chrome.tabs.onUpdated.addListener(tabUpdateHandler);