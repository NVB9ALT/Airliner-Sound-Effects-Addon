ui.notification.show("This addon is still in development. As such, running it may cause bugs, errors, or parts of the simulation may break.");
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
//-----------------------------------------------------------------------------------------------------------------------------------------
/*var a321sounds = new Boolean(0)

function checkForAirbusA321() {

if (geofs.aircraft.instance.id == 242) {
if (a321sounds == 0){

var scriptA321 = document.createElement('script'); 
scriptA321.src="https://cdn.jsdelivr.net/gh/NVB9ALT/A321Neo-Plus-Addon@realism-addon/A321NeoF.js";
document.body.appendChild(scriptA321);
scriptA321.onload = function (){changeA321s()}

a321sounds = 1
      }
   } else {
if (typeof simInterval != undefined) {
   clearInterval(simInterval)
   clearInterval(alarmsInterval)
} else {
   void(0)
}
	a321sounds = 0
   }
}

checkInterval2 = setInterval(function(){
checkForAirbusA321()
}, 1000)*/
//-----------------------------------------------------------------------------------------------------------------------------------------
/*Note: include stall and bank angle alarms*/
//-----------------------------------------------------------------------------------------------------------------------------------------
var airbusAlarms = new Boolean(0)
//smart GPWS (excessive terrain closure rate trigger)
function checkForAirbusAlarms() {
if () { //all Airbuses except A321Neo and A220
if (airbusAlarms == 0) {

var scriptAA = document.createElement('script');
scriptAA.src = "";
document.body.appendChild(scriptAA);
scriptAA.onload = function (){addAirbusAlarms()}

airbusAlarms = 1
   }
} else {
if (typeof alarmIntervalAirbus != undefined) {
   clearInterval(alarmIntervalAirbus);
} else {
   void(0)
}
airbusAlarms = 0
   }
}

checkIntervalAirbus = setInterval(function(){
checkForAirbusAlarms()
}, 1000)
//-----------------------------------------------------------------------------------------------------------------------------------------
var boeingAlarms = new Boolean(0)
//smart GPWS (excessive terrain closure rate trigger)
// https://https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/stall.ogg
function checkForBoeingAlarms() {
if () { //all Boeings except 737s and 777
if (boeingAlarms == 0) {

var scriptBA = document.createElement('script');
scriptBA.src = "";
document.body.appendChild(scriptBA);
scriptBA.onload = function (){addBoeingAlarms()}

boeingAlarms = 1
   }
} else {
if (typeof alarmIntervalBoeing != undefined) {
   clearInterval(alarmIntervalBoeing);
} else {
   void(0)
}
boeingAlarms = 0
   }
}

checkIntervalBoeing = setInterval(function(){
checkForBoeingAlarms()
}, 1000)
