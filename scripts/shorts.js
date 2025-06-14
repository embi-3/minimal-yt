const CHECK_INTERVAL = 20

function removePopUps() {
    let popups = document.querySelectorAll("ytd-rich-section-renderer.style-scope.ytd-rich-grid-renderer");
    
    if (popups.length != 0) {
        console.log("Removing shorts: ", popups);
    }

    popups.forEach((popup) => {
        popup.remove();
    });
}

function removeShortsButton() {
    let shortsButton = document.querySelector('ytd-mini-guide-entry-renderer[aria-label="Shorts"]');

    if (shortsButton) {
        console.log("Removing shorts button: ", shortsButton);
        shortsButton.remove();
    }
}

function removeShortsSidebar() {
    let shortsSidebar = document.querySelectorAll('[title="Shorts"]');

    if (shortsSidebar.length > 0) {
        shortsSidebar.forEach((node) => node.remove());
    }
}

function removeReelShelf() {
    let reelShelf = document.querySelector('ytd-reel-shelf-renderer');

    if (reelShelf) {
        console.log("Removing reel shelf: ", reelShelf);
        reelShelf.remove();
    }
}

function logger(records, observer) {
    for (const record of records) {
        if (record.addedNodes) {
            editPage();
            break;
        }
    }

    if (!document.querySelector("div#content")) {
        observer.disconnect();
    }
}

function editPage() {
    removePopUps();
    removeShortsButton();
    removeShortsSidebar();
    removeReelShelf();
}

function createObserver(body) {
    let observer = new MutationObserver(logger);

    const observerOptions = {
        childList: true,
        subtree: true,
    };

    observer.observe(body, observerOptions);
}

function checkContent() {
    let body = document.querySelector("div#content")
    if (body) {
        clearInterval(interval);
        createObserver(body);
    }
}

if (window.hasRun === true) {
    console.log("Already running!");
} else {
    window.hasRun = true;
    console.log("Now running!");

    // Periodically check whether the content has loaded yet.
    // See: https://stackoverflow.com/questions/42731323/content-script-not-executing-in-new-window
    if (document.querySelector("div#content")) {
        let body = document.querySelector("div#content")
        createObserver(body)
    } else {
        var interval = setInterval(checkContent, CHECK_INTERVAL);
    }
}