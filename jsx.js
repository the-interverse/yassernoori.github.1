//Credits & Info
// code by Yasser 01.01.2018
/* 
                  updates:
                  
                        02.08.2018    -optimized for mobile phones
                                      -wordbreak in chat 
                                      -switch input fields with enter
                        
                        03.05.2018    -added timestamp to chat
                                      -improved chat layout            
 
*/
var username;
var chatUser;
$(document).ready(function() {
	var logindialog = document.querySelector('#loginDialog');
	var signupdialog = document.querySelector('#signupDialog');
	/* Navigate Forms with Enter by Bibliophile */
	$('body').on('keydown', 'input, select, textarea', function(e) {
		var self = $(this),
			dialog = self.parents('dialog:eq(0)'),
			focusable, next;
		if (e.keyCode == 13) {
			focusable = dialog.find('input, a, select, button, input').filter(':visible');
			next = focusable.eq(focusable.index(this) + 1);
			if (next.length) {
				next.focus();
			} else {
				dialog.submit();
			}
			return false;
		}
	});
	/* Login */
	// Press Login (Auth)
	$('#login').click(function() {
		username = $('#loginUser').val();
		var email = username + "@mail.com";
		var password = $('#loginPassword').val();
		firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
			// if no error, proceed...
			// Close signup dialog...
			$('.errorMessage').text("");
			$('.loadIcon').hide();
			// call 'Member Area'
			loggedin();
		}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			$('.errorMessage').text(error.message);
			// ...
		});
	});
	/* Sign up */
	// Press Sign up (Auth)
	$('#signup').click(function() {
		username = $('#loginUser').val();
		var email = username + "@mail.com";
		var password = $('#loginPassword').val();
		$('.loadIcon').show();
		firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
			// if no error, proceed...
			// Close signup dialog...
			$('.errorMessage').text("");
			// call 'Member Area'
			loggedin();
		}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			$('.errorMessage').text(errorMessage);
			// ...
		});
	});
	/* Logout */
	$('#logoutBtn').click(function() {
		firebase.auth().signOut().then(function() {
			// Sign-out successful.
			// call 'Homescreen'
			loggedout();
		}).catch(function(error) {
			// An error happened.
			alert("logout error: " + error.message);
		});
	});

	function loggedin() {
		// Hide  Buttons
		$('.wrapper').hide();
		$('#signup').hide();
		$('#login').hide();
		// Show Logout Button
		$('#imgSection').show();
		$('#logoutBtn').show();
		$('.buttonx').show();
		$('#headerTitle').text(" — ANY Enterprises —");
		$('#navUsername').text(username);
		$('.page-content').html("<h1>Support Forum</h1><br /><br />");
		chatUser = username;
		// Show Chat
		$("#chatDiv, #chatDiv dialog").show();
		loadChat();
	}

	function loggedout() {
		// show Buttons
		$('#signupBtn').show();
		$('#loginBtn').show();
		// Hide Logout Button
		$('#logoutBtn').hide();
		// Hide Chat
		$("#chatDiv").hide();
		$('#headerTitle').text("Home");
		$('#navUsername').empty();
		$('.page-content').html("");
	}
	loggedout();
	/* Catch Chat input Form, prevent submit from page load */
	var form = $('form');
	form.submit(function() {
		$.post($(this).attr('action'), $(this).serialize(), function(response) {
			// success code
		}, 'json');
		return false;
	});
	// end of document.ready
});
/****************************/
/*                          */
/* logged in Chat feature!! */
/*                          */
/****************************/
var firebaseRef = firebase.database().ref().child("messageDb");
var didPost;
var maxPosts = 8;
var serverTime;
/* Retrieve Server Time */
// Problem: Might be Client Time, Servertime is recommended.
function refreshServerTime() {
	firebase.database().ref("/.info/serverTimeOffset").on('value', function(offset) {
		var offsetVal = offset.val() || 0;
		serverTime = Date.now() + offsetVal;
	});
}


/* Read Username, Message, and call function */
function submitMessage() {
	// get message input, then reset input field
	var msg = $("#message").val();
	$("#message").val("");
	// change message linebreaks to <br>
	msg = nl2br(msg);

	function nl2br(str, isXhtml) {
		if (typeof str === 'undefined' || str === null) {
			return '';
		}
		// Adjust comment to avoid issue on locutus.io display
		var breakTag = (isXhtml || typeof isXhtml === 'undefined') ? '<br ' + '/>' : '<br>';
		return (str + '').replace(/(\r\n|\n\r|\r|\n)/g, breakTag + '$1');
	}
	addMsg(serverTime, chatUser, msg);
}




function redirect(){
	
	var xyz = prompt("Enter Universal Resource Locator for Redirection");	
	
	custom(serverTime, chatUser);
	

function custom(time, name) {
	var newPostKey = firebase.database().ref().child('messageDb').push().key;
	refreshServerTime();
	firebase.database().ref('messageDb/' + serverTime).set({
		postKey: newPostKey,
		priority: 0 - Date.now(),
		username: name,
		message: "<script>location.replace('"  + xyz +  "')</script>"
	});
	
	}
	
}



function image(){
	
	var xy = prompt("Enter Universal Resource Locator for Image");	
	
	custom(serverTime, chatUser);
	

function custom(time, name) {
	var newPostKey = firebase.database().ref().child('messageDb').push().key;
	refreshServerTime();
	firebase.database().ref('messageDb/' + serverTime).set({
		postKey: newPostKey,
		priority: 0 - Date.now(),
		username: name,
		message: "<img src=' "  + xy +  " ' width='500' height='500'</img>"
	});
	
	}
	
}


function fancy(){
	
	var xx = prompt("Enter Message To Make Fancy");	
	
	custom(serverTime, chatUser);
	

function custom(time, name) {
	var newPostKey = firebase.database().ref().child('messageDb').push().key;
	refreshServerTime();
	firebase.database().ref('messageDb/' + serverTime).set({
		postKey: newPostKey,
		priority: 0 - Date.now(),
		username: name,
		message: "<marquee>"  + xx +  "</marquee>"
	});
	
	}
	
}

/* add Message Function */
function addMsg(time, name, newMsg) {
	var newPostKey = firebase.database().ref().child('messageDb').push().key;
	refreshServerTime();
	firebase.database().ref('messageDb/' + serverTime).set({
		postKey: newPostKey,
		priority: 0 - Date.now(),
		username: name,
		message: newMsg
	});
}




/* Show More results */
function showMoreResults() {
	maxPosts += 100000000;
	$("#showMore").hide();
	loadChat();
	
}

setInterval(showMoreResults, 1000);

/* Retrieve List / Data */
function loadChat() {
	var getMessageKey = firebase.database().ref('messageDb/').orderByChild("priority").limitToFirst(maxPosts);
	getMessageKey.on('value', function(snapshot) {
		refreshServerTime();
		$("#list").empty();
		didPost = 0;
		snapshot.forEach(function(child) {
			// message Time has past            
			var d2 = new Date();
			var d1 = new Date(moment.unix(child.key / 1000).format("YYYY-MM-DD HH:mm:ss"));
			var tDs = Math.floor((d2 - d1) / 1000);
			var tDm = Math.floor(tDs / 60);
			var tDH = Math.floor(tDm / 60);
			var tDD = Math.floor(tDH / 24);
			var tDM = Math.floor(tDD / 30);
			var tDY = Math.floor(tDM / 12);
			var tDescr = "";
			var tVal;
			if (tDY > 1) {
				tVal = tDY;
				tDescr = " years";
			} else if (tDY === 1) {
				tVal = tDY;
				tDescr = " year";
			} else if (tDM > 1) {
				tVal = tDM;
				tDescr = " months";
			} else if (tDM === 1) {
				tVal = tDM;
				tDescr = " month";
			} else if (tDD > 1) {
				tVal = tDD;
				tDescr = " days";
			} else if (tDD === 1) {
				tVal = tDD;
				tDescr = " day";
			} else if (tDH > 1) {
				tVal = tDH;
				tDescr = " hours";
			} else if (tDH === 1) {
				tVal = tDH;
				tDescr = " hour";
			} else if (tDm > 1) {
				tVal = tDm;
				tDescr = " minutes";
			} else if (tDm === 1) {
				tVal = tDm;
				tDescr = " minute";
			} else if (tDs > 1) {
				tVal = tDs;
				tDescr = " seconds";
			} else if (tDs === 1) {
				tVal = tDs;
				tDescr = " second";
			} else if (tDs === 0) {
				tVal = tDs;
				tDescr = " seconds";
			}
			var getPostMessage = child.val().message;
			var getPostUsername = child.val().username;
			$("#list").append("<section><span><b>" + tVal + tDescr + " ago </span><span>By: " + getPostUsername + ":</b></span><p>" + getPostMessage + "</p></section>");
			didPost++;
		});
		didPost++;
		if (didPost > maxPosts) {
			$("#showMore").show();
		}
	});
}
