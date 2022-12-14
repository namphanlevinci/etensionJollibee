
try{
  self.importScripts('firebase/firebase-app.js', 'firebase/firebase-messaging.js');
  
  const config = {
    apiKey: "AIzaSyCroh4YEvOo6aoQIdcuwT_ezyoSYzOny1c",
    authDomain: "delivery-jollibee.firebaseapp.com",
    databaseURL: "https://delivery-jollibee.firebaseio.com",
    projectId: "delivery-jollibee",
    storageBucket: "delivery-jollibee.appspot.com",
    messagingSenderId: "320365913986",
    appId: "1:320365913986:web:a57ad96431ba760562919b",
    measurementId: "G-X41HD11MC4",
  };
  
  firebase.initializeApp(config);
  const messaging = firebase.messaging();

  function tokenRegistered(registration_id) {
    // The token can be used to send messages specifically to this
    // user. So you can store it server side and when you need to send
    // a message, you can do so.
    console.log("Registered hihi: ", registration_id)
    if (chrome.runtime.lastError) {
      console.log("failed")
      return
    }
  };

  function onMessageFCM(messageFCM) {
    // The token can be used to send messages specifically to this
    // user. So you can store it server side and when you need to send
    // a message, you can do so.
    console.log("Message FCM: ", messageFCM);
    chrome.notifications.create(`my-notification-${Date.now()}`, {
      type: "basic",
      iconUrl: "fcm.png",
      title: "My Title",
      message: "My Message",
  });
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(6786757, {action: "open_dialog_box"}, function(response) {});  
});
  };


  chrome.gcm.register(["320365913986"], tokenRegistered)

  chrome.gcm.onMessage.addListener(onMessageFCM);
  

  
  
  chrome.action.onClicked.addListener((tab) => {
    console.log('createt chrome action');
  });
  
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log('on message', request, sender);
      if (request.greeting == "hello")
        sendResponse({farewell: "test"});
    }
  );
}catch(error){
  console.log(error);
}
