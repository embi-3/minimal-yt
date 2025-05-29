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
    if (updatedUrl.startsWith("https://www.youtube.com/shorts/")) {
        console.log("Shorts detected: ", updatedUrl);
        redirect(tabId);
    } else if (updatedUrl) {
        console.log("Updated!");
        removeShorts(tabId);
    }
}

chrome.tabs.onUpdated.addListener(tabUpdateHandler);