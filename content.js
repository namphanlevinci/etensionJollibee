
console.log('log message from content scriipt');

chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log('response hohi');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('on Message from bacjground to content : ',message)
  // return true <- this and the callback in background.js are what caused a crash in extensions page of my Google chrome
  });