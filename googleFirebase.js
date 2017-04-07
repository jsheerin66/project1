
var email = "justinsheerin@yahoo.com";
var password= "Yahoosucks88!";

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCuiY95IJRHCl_JP_YHtnG4iVWFsmVzSGM",
    authDomain: "urtinerary-1490759762590.firebaseapp.com",
    databaseURL: "https://urtinerary-1490759762590.firebaseio.com",
    projectId: "urtinerary-1490759762590",
    storageBucket: "urtinerary-1490759762590.appspot.com",
    messagingSenderId: "613365076371"
  };
  firebase.initializeApp(config);

  firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    // ...
  } else {
    // User is signed out.
    // ...
  }
  // ...
});

var credential = firebase.auth.EmailAuthProvider.credential(email, password);

auth.currentUser.link(credential).then(function(user) {
  console.log("Anonymous account successfully upgraded", user);
}, function(error) {
  console.log("Error upgrading anonymous account", error);
});
