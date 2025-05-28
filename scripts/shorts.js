function removePopUps() {
    // let shorts = document.querySelectorAll("div#content.style-scope.ytd-rich-section-renderer");
    let popups = document.querySelectorAll("div#dismissible.style-scope.ytd-rich-shelf-renderer");
    
    // ! DEBUG STATEMENT
    if (popups.length != 0) {
        console.log("here are all the popups: ", popups);
    }

    popups.forEach((popup) => {
        console.log(popup);
        popup.remove();
    });
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
            removePopUps();
        }
    }
}

console.log("Removing shorts...")

createIndicator();
const body = document.querySelector("div#content.style-scope.ytd-app");
console.log(body);

const browse = document.querySelector("ytd-browse");
console.log(browse);

const columns = document.querySelector("ytd-two-column-browse-results-renderer");
console.log(columns);

const content = document.querySelector("div#contents.style-scope.ytd-rich-grid-renderer"); // not seen at runtime
console.log(content);

let observer = new MutationObserver(logger);

const observerOptions = {
  childList: true,
  subtree: true,
};

observer.observe(body, observerOptions);

console.log("shorts have been removed!");
