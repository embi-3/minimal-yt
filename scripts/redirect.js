console.log("Redirecting...")
const newURL = document.URL.replace("shorts", "watch");
console.log(newURL);
window.location.replace(newURL);