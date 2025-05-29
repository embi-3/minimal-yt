const newURL = document.URL.replace("shorts/", "watch?v=");
console.log("Redirecting to: ", newURL);
window.location.replace(newURL);