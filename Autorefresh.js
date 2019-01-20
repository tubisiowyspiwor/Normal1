$('<div id="ar_cfg">').css({
    position: "absolute",
    left: 188,
    top: 200,
    width: 200,
    height: 810,
    color: "#6495ED",
    "background-color": "transparent",
    opacity: 1,
    "font-size": "13px",
}).appendTo("body");

function save(){
    var checkbox = document.getElementById('archeck');
    localStorage.setItem('archeck', checkbox.checked);
}
function load(){
    var checked = JSON.parse(localStorage.getItem('archeck'));
    document.getElementById("archeck").checked = checked;
}
ar_cfg.innerHTML = '<center>AutoRefresh:<br><input type="checkbox" id="archeck" />';
ar_cfg.innerHTML += '<center><button id="przycisk">Zapisz</button>';
load();

$("#przycisk").click(function() {
    save();
});


(function () {
    setInterval(function() {
        if (archeck.checked == true){
                if (hero.hp > 1){;
        window.location.reload();}
        }
        }, Math.floor(Math.random() * 3600) + 4200);})
();
