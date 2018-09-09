// htmlBling.js

function createList() {
    var list = document.getElementById("List")
    for(var i = 0; i < 25; i++) {
	list.innerHTML += ('<button>'+ i +'</button>');
    }
}

function clicked() {
    console.log("buttonClicked");
}
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
