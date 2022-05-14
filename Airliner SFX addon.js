ui.notification.show("This addon is still in development. As such, running it may cause bugs, errors, or parts of the simulation may break.")
// Copyright Ariakim Taiyo

//Modified by NVB9

var b737Sounds = new Boolean(0)

function checkForBoeing() {

if (b737Sounds == 0){
if (geofs.aircraft.instance.id == 4 || geofs.aircraft.instance.id == 2769 || geofs.aircraft.instance.id == 2772 || geofs.aircraft.instance.id == 3011 || geofs.aircraft.instance.id == 3054) {

var script737 = document.createElement('script'); 
script737.src="https://cdn.jsdelivr.net/gh/NVB9ALT/GeoFs-737-Immersion-SFX@main/index.js";
document.body.appendChild(script737);
script737.onload = function (){change737s()}

b737Sounds = 1
      }
   }
}
let checkInterval = setInterval(function(){
checkForBoeing()
}, 1000)
