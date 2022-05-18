ui.notification.show("This addon is still in development. As such, running it may cause bugs, errors, or parts of the simulation may break.")
// Original script copyright Ariakim Taiyo

//Modified by NVB9

//variable to tell if the script has run or not
var b737Sounds = new Boolean(0)

function checkForBoeing() {

if (geofs.aircraft.instance.id == 4 || geofs.aircraft.instance.id == 2769 || geofs.aircraft.instance.id == 2772 || geofs.aircraft.instance.id == 3011 || geofs.aircraft.instance.id == 3054) { //if the aircraft currently being flown is a 737
if (b737Sounds == 0){ //if the script hasn't already run on this aircraft

//running the script
var script737 = document.createElement('script'); 
script737.src="https://cdn.jsdelivr.net/gh/NVB9ALT/GeoFs-737-Immersion-SFX-Repo-V3@main/index.js";
document.body.appendChild(script737);
script737.onload = function (){change737s()}

//script has run now, so we change scriptHasRun to avoid having the script execute multiple times per aircraft instance
//this avoids massive lag
b737Sounds = 1
      }
   }
//if the aircraft isn't a 737
else {
//clearing the intervals when the aircraft isn't a 737 to avoid filling up the console with errors
if (typeof soundInt !== 'undefined') {
   clearInterval(soundInt)
}
if (typeof tcasIntervalAnnounce !== 'undefined') {
	clearInterval(tcasIntervalAnnounce)
}
//making sure the script can run again next time a 737 is selected
	b737Sounds = 0
   }
}

//running the above function once per second
let checkInterval = setInterval(function(){
checkForBoeing()
}, 1000)

//Future plans:
/*
Concorde engine sounds
Airbus alarms (except A220)
777 expansion
*/
