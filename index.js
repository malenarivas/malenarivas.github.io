var messages = document.getElementById("messages");
var mb = document.getElementById("messageBox");
var btn = document.getElementById("submit");

function postMessage(msg, user) {
	var li = document.createElement("li");
	var span = document.createElement("span");
	var m = document.createTextNode(msg);
	var u = document.createTextNode(user);
	messages.appendChild(li);
	li.appendChild(span);
	span.appendChild(u);
	li.appendChild(m);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var username = getCookie("username");
    if (username != "") {
        //alert("Welcome back " + username);
    } else {
        username = prompt("What\'s your name?", "");
        if (username != "" && username != null) {
            setCookie("username", username, 365);
        } else {
			alert("You must enter a name in order to chat.");
		}
    }
}

btn.addEventListener("click", function() {
	if (mb.value == null) {
		alert("you did't type a message!");
	} else {
		postMessage(mb.value, getCookie("username"));
		mb.value = null;
	}
});

// Allows user to post new messages with the enter/return key instead of pressing Submit button
mb.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode == 13) {
		btn.click();
	}
});

// Self-invoking function that keeps the shoutbox scrolled to the bottom (most reent message)
(function() {
	function infScroll() {
		messages.scrollTop += 1;
		if (messages.scrollTop === 300) {
			messages.scrollTop = 0;
		}
		window.requestAnimationFrame(infScroll);
	}
	window.requestAnimationFrame(infScroll);
})();

document.addEventListener("DOMContentLoaded", function(event) { 
  	checkCookie();
});