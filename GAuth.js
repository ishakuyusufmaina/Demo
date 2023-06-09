// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import {getAuth, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDtm6d00VS-c2BDmWBAllXPGthD8dEb5bo",
    authDomain: "mainacode.firebaseapp.com",
    projectId: "mainacode",
    storageBucket: "mainacode.appspot.com",
    messagingSenderId: "313458674230",
    appId: "1:313458674230:web:2cc6d4bd4a2ab68b76e697",
    measurementId: "G-K0SDZ6Z9CZ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


var loginPage=`<h1>Sign in</h2>
<h2>Maina GAuth Demo</h2>
<p>You are now signed out</p>
`;

var homePage = `<h1>Home Page</h2>
<h2>Maina Gauth Demo</h2>
<p>You are now signed in as <span id="user"></span></p>
`;

var signinBtn = document.getElementById("signinBtn");
var signoutBtn = document.getElementById("signoutBtn");

signinBtn.addEventListener("click", ()=>{signin()});
signoutBtn.addEventListener("click", ()=>{signout()});
//signinBtn.innerHTML="Sign...";
var main = document.getElementById("main");
alert(window.localStorage.getItem("user") + " " + main);
if(window.localStorage.getItem("user")){
    main.innerHTML = homePage;
    //document.getElementById("user").innerHTML = "user: " + localStorage.getItem("user");
}
else {
    main.innerHTML = loginPage;
}

function signin(){
  alert("sign in click!");
    signInWithRedirect(provider)
}

getRedirectResult(auth).then((result)=>{
  if (result.credential){
    alert("sucessfully signed in as:" + result.user


         
);
  main.innerHTML = homePage;
    }
}).catch((error)=>{
    alert("error: " + error)
})

function signout(){
    signOut(auth).then(()=>{
        alert("Successfully signed out")
      main.innerHTML = loginPage;
    }).catch((error)=>{
        alert(error)
    })
}

onAuthStateChanged(auth, (user)=>{
    if (user){
        main.innerHTML = homePage;
       // document.getElementById("user").innerHTML = "user: " + user;
        window.localStorage.setItem("user", user);
    }
    else {
        window.localStorage.removeItem("user");
        main.innerHTML = loginPage;
    }
})

