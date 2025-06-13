const CHECK_INTERVAL = 20

function removePopUps() {
    // let shorts = document.querySelectorAll("div#content.style-scope.ytd-rich-section-renderer");
    // let popups = document.querySelectorAll("div#dismissible.style-scope.ytd-rich-shelf-renderer");
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

// ! DEBUG FUNCTION
function createIndicator() {
    const app = document.querySelector("ytd-app");
    const content = document.querySelector("div#content.style-scope.ytd-app");

    const indicator = document.createElement("div");
    indicator.id = "content";
    indicator.style = "font-size:32px; background-color:white; text-align:center; padding:10px"
    const text = document.createElement("p");
    text.textContent = "Minimal YT is active!";
    indicator.appendChild(text);

    const masthead = document.querySelector("div#masthead-container.style-scope.ytd-app");
    masthead.style = "margin-top:58.55px";

    const sidebar = document.querySelector("ytd-mini-guide-renderer");
    sidebar.style = "margin-top:58.55px";
    // masthead.insertAdjacentElement("afterend", indicator);

    app.insertBefore(indicator, content);
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
    // let body = document.querySelector("div#content");
    // console.log("body:", body);

    // const browse = document.querySelector("ytd-browse");
    // console.log(browse);

    // const columns = document.querySelector("ytd-two-column-browse-results-renderer");
    // console.log(columns);

    // const content = document.querySelector("div#contents.style-scope.ytd-rich-grid-renderer"); // not seen at runtime
    // console.log(content);

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
    console.log("Now running!")

    // Checks whether the body element has been created yet.
    // See: https://stackoverflow.com/questions/42731323/content-script-not-executing-in-new-window
    if (document.querySelector("div#content")) {
        let body = document.querySelector("div#content")
        createObserver(body)
    } else {
        // Find a good interval to check for the body
        var interval = setInterval(checkContent, CHECK_INTERVAL);
    }

    // createIndicator();
}