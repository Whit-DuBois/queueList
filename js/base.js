//var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//
////FIREBASE
//var config = {
//    apiKey: "AIzaSyDTpHPmETnUOxK83zChn0AMXls7FUFE70Q",
//    authDomain: "red-cup-karaoke.firebaseapp.com",
//    databaseURL: "https://red-cup-karaoke.firebaseio.com",
//    projectId: "red-cup-karaoke",
//    storageBucket: "red-cup-karaoke.appspot.com",
//    messagingSenderId: "543472684430"
// };
//  firebase.initializeApp(config);

var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Setup Firebase
var config = {
    apiKey: "AIzaSyA78kWDC292akH__tHstKLj4w5-4URCKVY",
    authDomain: "queue-list.firebaseapp.com",
    databaseURL: "https://queue-list.firebaseio.com",
    projectId: "queue-list",
    storageBucket: "queue-list.appspot.com",
    messagingSenderId: "944413653961"
  };
  firebase.initializeApp(config);

var usersRef = firebase.database().ref('users');

var app = new Vue({
  el: '#app',
  data: {
  	newUser: {
      	name: '',
      	email: '',
		song: ''
    }
  },
	
  firebase: {
    users: usersRef
  },
  // computed property for form validation state
  computed: {
    validation: function () {
      return {
        name: !!this.newUser.name.trim(),
        song: !!this.newUser.song.trim(),
//        email: emailRE.test(this.newUser.email)
      }
    },
    isValid: function () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  // methods
  methods: {
    addUser: function (e) {
        e.preventDefault();
      if (this.isValid) {
        usersRef.push(this.newUser)
        this.newUser.name = ''
        this.newUser.email = ''
		this.newUser.song = ''
        document.getElementById("form").className = "hidden";
        document.getElementById("thank-you").innerHTML = "Thank you for participating!";
      }
    },
    removeUser: function (user) {
      usersRef.child(user['.key']).remove()
    },
	  removeSong: function (song){
	  usersRef.child(song['.key']).remove()
  	}
  }
})


