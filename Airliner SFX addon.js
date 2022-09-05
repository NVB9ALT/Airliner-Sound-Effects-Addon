console.log("Original scripts copyright Ariakim Taiyo");
console.log("Modified by NVB9");

//variable to tell if the script has run or not
var b737Sounds = new Boolean(0)

function checkForBoeing737() {
if (geofs.aircraft.instance.id == 4 || geofs.aircraft.instance.id == 2769 || geofs.aircraft.instance.id == 2772 || geofs.aircraft.instance.id == 3011 || geofs.aircraft.instance.id == 3054) { //if the aircraft currently being flown is a 737
if (b737Sounds == 0){ //if the script hasn't already run on this aircraft

//running the script
var script737 = document.createElement('script'); 
script737.src="https://cdn.jsdelivr.net/gh/NVB9ALT/GeoFs-737-Immersion-SFX-Repo-for-Realism-Addon@main/indexE.js";
document.body.appendChild(script737);
script737.onload = function (){change737s()}

//script has run now, so we change scriptHasRun to avoid having the script execute multiple times per aircraft instance
//this avoids massive lag
b737Sounds = 1
      }
   }
//if the aircraft isn't a 737
else {
//clearing the script when the aircraft isn't a 737 to avoid filling up the console with errors
if (typeof soundInt != undefined) {
   clearInterval(soundInt)
	clearInterval(tcasIntervalAnnounce)
} else {
void(0)
};
//making sure the script can run again next time a 737 is selected
	b737Sounds = 0
   }
}

//running the above function once per second
checkInterval = setInterval(function(){
checkForBoeing737()
}, 1000)
//-----------------------------------------------------------------------------------------------------------------------------------------
var b777sounds = new Boolean(0)

function checkForBoeing777() {

if (geofs.aircraft.instance.id == 240) {
if (b777sounds == 0){

var script777 = document.createElement('script'); 
script777.src="https://cdn.jsdelivr.net/gh/NVB9ALT/777-Realism-Overhaul-for-Realism-Addon@main/indexA.js";
document.body.appendChild(script777);
script777.onload = function (){change777s()}

b777sounds = 1
      }
   } else {
if (typeof effectInterval != undefined) {
   clearInterval(effectInterval)
} else {
   void(0)
}
	b777sounds = 0
   }
}

checkInterval1 = setInterval(function(){
checkForBoeing777()
}, 1000)
