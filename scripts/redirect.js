const newURL = document.URL.replace("shorts", "watch");
console.log("Redirecting to: ", newURL);
window.location.replace(newURL);