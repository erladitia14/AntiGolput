  // Set the date we're counting down to
  var countDownDate = new Date("February 14, 2024 00:00:00").getTime();

  // Update the countdown every 1 second
  var x = setInterval(function() {

    // Get the current date and time
    var now = new Date().getTime();

    // Calculate the remaining time
    var distance = countDownDate - now;

    // Calculate days, hours, minutes, and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Function to add leading zero if needed
    function addLeadingZero(num) {
      return (num < 10 ? "0" : "") + num;
    }

    // Display the countdown in the respective elements
    document.getElementById("days").innerHTML = addLeadingZero(days);
    document.getElementById("hours").innerHTML = addLeadingZero(hours);
    document.getElementById("minutes").innerHTML = addLeadingZero(minutes);
    document.getElementById("seconds").innerHTML = addLeadingZero(seconds);

    // If the countdown is over, display a message
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown").innerHTML = "EXPIRED";
    }
  }, 1000);
  
  const textArray = ["52%", "107 Jt"];
let index = 0;
let currentText = "";
let letterIndex = 0;

function type() {
  if (letterIndex === textArray[index].length) {
    setTimeout(() => {
      erase();
    }, 2000);
    return;
  }

  currentText = textArray[index].substring(0, letterIndex + 1);
  letterIndex++;
  document.querySelector("h1.typing").innerHTML = currentText + "<span class='blink'>|</span>";
  setTimeout(type, 200);
}

function erase() {
  if (letterIndex === 0) {
    index++;
    if (index === textArray.length) {
      index = 0;
    }
    setTimeout(() => {
      type();
    }, 1000);
    return;
  }

  currentText = textArray[index].substring(0, letterIndex - 1);
  letterIndex--;
  document.querySelector("h1.typing").innerHTML = currentText + "<span class='blink'>|</span>";
  setTimeout(erase, 100);
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    type();
  }, 1000);
});

$(function () {

	'use strict';
    
    
    
	//scrollTrig
	gsap.registerPlugin(ScrollTrigger);
    
	function scrollTrig() {
    
	    let gsapBl = $('.gsap__bl').width();
	    // $('.gsap__item').css('width', gsapBl + 'px');
	    let gsapTrack = $('.gsap__track').width();
	    let scrollSliderTransform = gsapTrack - gsapBl;
    
	    let winHeight = $(window).height();
	    let slHeight = $('.gsap_slider').outerHeight(true);
	    let startScrollTrig = (winHeight - slHeight) / 2;
    
	    // Skew
	    let proxy = { skew: 0 },
		skewSetter = gsap.quickSetter(".gsap__item", "skewX", "deg"),
		clamp = gsap.utils.clamp(-1000, 1000);
    
	    gsap.to(".gsap__track", {
		scrollTrigger: {
		    trigger: ".gsap_slider",
		    // start: "top center",
		    start: () => "-=" + startScrollTrig,
		    end: "+=1500px",
		    // end: () => '+=' + gsapTrack,
		    scrub: true,
		    pin: true,
		    // markers: true
		    onUpdate: (self) => {
			let skew = clamp(self.getVelocity() / 800);
			if (Math.abs(skew) > Math.abs(proxy.skew)) {
			    proxy.skew = skew;
			    gsap.to(proxy, {
				skew: 0,
				duration: 0.8,
				ease: "power3",
				overwrite: true,
				onUpdate: () => skewSetter(proxy.skew)
			    });
			}
		    }
		},
		x: "-" + scrollSliderTransform + "px",
	    });
	    gsap.set(".gsap__item", { transformOrigin: "center center", force3D: true });
    
	    setTimeout(() => {
		ScrollTrigger.refresh();
	    }, 1000);
	}
	scrollTrig();
    });

  // Daftar gambar yang akan diganti
  var images = ['./img/Kamu.png', './img/Tunjuk.png', './img/Voting.png'];
  var currentIndex = 0;

  // Fungsi untuk mengganti src gambar dan mengatur animasi
  function changeImage() {
    var image = document.getElementById('image');
    image.src = images[currentIndex];
    currentIndex = (currentIndex + 1) % images.length;
  }

  // Mengatur interval untuk mengganti gambar setiap 2 detik
  setInterval(changeImage, 3000);

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDR8zCtCHwGpc0vtL5ONH5rqq1DAKjI5rs",
  authDomain: "antigolput-9db33.firebaseapp.com",
  projectId: "antigolput-9db33",
  storageBucket: "antigolput-9db33.appspot.com",
  messagingSenderId: "980493264656",
  appId: "1:980493264656:web:08c63fc4c4621399582795",
  measurementId: "G-RWG5KKBYMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
const auth = getAuth();

document.getElementById('login').addEventListener('click', () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
});

onAuthStateChanged(auth, (user) => {
  const { pathname } = window.location;
  console.log(pathname);
  if (user) {
    if (pathname === '/index.html' || pathname === '/' ) window.location.pathname = '/antigolput.html';
  } else {
    // User is signed out
    if (pathname === '/antigolput.html') window.location.pathname = '/index.html';
  }
  window.addEventListener('unload', () => {
    auth.signOut();
  });
});
