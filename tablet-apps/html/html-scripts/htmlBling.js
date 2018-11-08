// htmlBling.js

function createList() {
    var list = document.getElementById("skinsList");
    for(var i = 0; i < 25; i++) {
	    var button = document.createElement("BUTTON");
        var text = document.createTextNode(i);

        button.className = "test";
        button.appendChild(text);
        list.appendChild(button);
    }
}

function clicked() {
    console.log("buttonClicked");
}
