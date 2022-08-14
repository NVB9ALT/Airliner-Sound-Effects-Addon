// Copyright 2022 Ariakim Taiyo

//fix bug with reset
geofs.flyTo = function(a, b) {
  clearInterval(soundInt)
  clearInterval(accelInt);
  setTimeout(function(){
    accelInt = setInterval(function(){
      getAccel()
    },10)

    soundInt = setInterval(function(){
      getFinalSoundVolumes();
      getGearFlapsWarn();
      testForApproach();
      testTerrainorAppr();
      doRadioAltCall();
      overspeed();
      getTrimSound();
      getFlapsSound();
      getFlapsClick();
    })
  }, 2000)

  geofs.animation.values.overspeed = null;
  geofs.animation.values.rainVol = null;
  geofs.animation.values.spoilersSound = null;
  geofs.animation.values.flapsClick = null;
  geofs.animation.values.flapsSound = null;
  geofs.animation.values.trimSound = null;
    if (a) {
        geofs.doPause(1);
        var c = geofs.aircraft.instance;
        a[0] = a[0] || geofs.initialRunways[0][0];
        a[1] = a[1] || geofs.initialRunways[0][1];
        a[2] = a[2] || 0;
        a[3] = a[3] || 0;
        c.absoluteStartAltitude = a[4] ? !0 : !1;
        c.startAltitude = a[2];
        geofs.lastFlightCoordinates = a;
        var d = a[0]
          , e = a[1]
          , f = a[2]
          , g = [0, 0, 0];
        g[0] = a[3];
        var k = 0 == f;
        c.llaLocation = [d, e, f];
        b ? geofs.camera.set(geofs.camera.currentMode) : (geofs.probeTerrain(),
        geofs.camera.reset(),
        controls.reset(),
        weather.reset(),
        weather.refresh());
        geofs.api.waterDetection.reset();
        c.reset(k);
        flight.reset();
        objects.updateVisibility();
        objects.updateCollidables();
        geofs.runways.refresh();
        geofs.runwaysLights.updateAll();
        ui.hideCrashNotification();
        geofs.api.getGuarantiedGroundAltitude([d, e, 0]).then(function(m) {
            m = m[0].height || 0;
            geofs.groundElevation = m;
            k ? (c.startAltitude = geofs.groundElevation + c.definition.startAltitude,
            c.absoluteStartAltitude = !1) : c.absoluteStartAltitude || (c.startAltitude += geofs.groundElevation);
            c.llaLocation[2] = c.startAltitude;
            flight.elevationAtPreviousLocation = m;
            k ? (g[1] = c.definition.startTilt || 0,
            c.startOnGround = !0,
            c.groundContact = !0,
            c.place(c.llaLocation, g),
            c.object3d.compute(c.llaLocation),
            c.render()) : (c.startOnGround = !1,
            c.place(c.llaLocation, g),
            c.object3d.compute(c.llaLocation),
            m = c.definition.minimumSpeed / 1.94 * c.definition.mass,
            c.rigidBody.applyCentralImpulse(V3.scale(c.object3d.getWorldFrame()[1], m)));
            geofs.undoPause(1);
            geofs.camera.setToNeutral();
            geofs.camera.update(2);
            flight.recorder.clear();
            $(document).trigger("flyto")
        })
    }
};
//define new variables
geofs.animation.values.overspeed = null;
geofs.animation.values.spoilersSound = null;          
geofs.animation.values.flapsClick = null;
geofs.animation.values.flapsSound = null;
geofs.animation.values.trimSound = null;

let lastFlapPos = 0;
let lastFlapTarg = 0;
let lastTerrainCall = 0;

function getFlapsSound() {
  if (geofs.camera.currentModeName == "Left wing" || geofs.camera.currentModeName == "Right wing") {
    if (geofs.animation.values.flapsPosition != lastFlapPos) {
      geofs.animation.values.flapsSound = 1;
    }
    else {
      geofs.animation.values.flapsSound = 0;
    }
  }
  else {
    geofs.animation.values.flapsSound = 0;
  }
  lastFlapPos = geofs.animation.values.flapsPosition;
}

function getFlapsClick() {
  if (geofs.camera.currentModeName == "cockpit") {
    if (lastFlapTarg != geofs.animation.values.flapsTarget) {
      geofs.animation.values.flapsClick = 1;
      setTimeout(function() {
        geofs.animation.values.flapsClick = 0;
      }, 200)
    }
  }
  else {
    geofs.animation.values.flapsClick = 0;
  }
  lastFlapTarg = geofs.animation.values.flapsTarget
}

let lastTrim = 0;

function getTrimSound() {
  if (geofs.camera.currentModeName == "cockpit") {
    if (lastTrim != geofs.animation.values.trim) {
      geofs.animation.values.trimSound = 1;
    }
    else {
      geofs.animation.values.trimSound = 0;      
    }
  }
  else {
    geofs.animation.values.trimSound = 0;
  }
  lastTrim = geofs.animation.values.trim
}

function getSpoilerSound() {
  if (geofs.animation.values.airbrakesPosition != 0) {
    geofs.animation.values.spoilersSound = geofs.animation.values.airbrakesPosition * (geofs.animation.values.kias / 10)
  }
  else {
    geofs.animation.values.spoilersSound = 0;
  }
}

function overspeed() {
  if (geofs.camera.currentModeName == "cockpit") {
  if (geofs.animation.values.kias >= 450) {
    geofs.animation.values.overspeed = 1;
  }
  else {
    geofs.animation.values.overspeed = 0;
    }
  }
  else {
    geofs.animation.values.overspeed = 0;
  }
}

//assign new sounds
function assignSounds() {

  geofs.aircraft.instance.definition.sounds[9] = {};
geofs.aircraft.instance.definition.sounds[9].id = "flapswarn"
  geofs.aircraft.instance.definition.sounds[9].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/tlf.mp3"
geofs.aircraft.instance.definition.sounds[9].effects = {"start": {"value": "isFlapsWarn"}}

  geofs.aircraft.instance.definition.sounds[10] = {};
geofs.aircraft.instance.definition.sounds[10].id = "terrainwarn"
  geofs.aircraft.instance.definition.sounds[10].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/tlt.mp3"
geofs.aircraft.instance.definition.sounds[10].effects = {"start": {"value": "isTerrainWarn"}}

  geofs.aircraft.instance.definition.sounds[11] = {};
geofs.aircraft.instance.definition.sounds[11].id = "pullwarn"
  geofs.aircraft.instance.definition.sounds[11].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/pullup.mp3"
geofs.aircraft.instance.definition.sounds[11].effects = {"start": {"value": "isPullupWarn"}}

  geofs.aircraft.instance.definition.sounds[12] = {};
geofs.aircraft.instance.definition.sounds[12].id = "bankangle"
  geofs.aircraft.instance.definition.sounds[12].file = ""
geofs.aircraft.instance.definition.sounds[12].effects = {"start": {"value": "isBankWarn"}}

  geofs.aircraft.instance.definition.sounds[13] = {};
geofs.aircraft.instance.definition.sounds[13].id = "1000"
  geofs.aircraft.instance.definition.sounds[13].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/1000gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[13].effects = {"start": {"value": "gpws1000"}}

  geofs.aircraft.instance.definition.sounds[14] = {};
geofs.aircraft.instance.definition.sounds[14].id = "500"
  geofs.aircraft.instance.definition.sounds[14].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/500correct.mp3"
geofs.aircraft.instance.definition.sounds[14].effects = {"start": {"value": "gpws500"}}

  geofs.aircraft.instance.definition.sounds[15] = {};
geofs.aircraft.instance.definition.sounds[15].id = "400"
  geofs.aircraft.instance.definition.sounds[15].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/400gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[15].effects = {"start": {"value": "gpws400"}}

  geofs.aircraft.instance.definition.sounds[16] = {};
geofs.aircraft.instance.definition.sounds[16].id = "300"
  geofs.aircraft.instance.definition.sounds[16].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/300gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[16].effects = {"start": {"value": "gpws300"}}

  geofs.aircraft.instance.definition.sounds[17] = {};
geofs.aircraft.instance.definition.sounds[17].id = "200"
  geofs.aircraft.instance.definition.sounds[17].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/200gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[17].effects = {"start": {"value": "gpws200"}}

  geofs.aircraft.instance.definition.sounds[18] = {};
geofs.aircraft.instance.definition.sounds[18].id = "100"
  geofs.aircraft.instance.definition.sounds[18].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/100gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[18].effects = {"start": {"value": "gpws100"}}

  geofs.aircraft.instance.definition.sounds[19] = {};
geofs.aircraft.instance.definition.sounds[19].id = "50"
  geofs.aircraft.instance.definition.sounds[19].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/50gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[19].effects = {"start": {"value": "gpws50"}}

  geofs.aircraft.instance.definition.sounds[20] = {};
geofs.aircraft.instance.definition.sounds[20].id = "40"
  geofs.aircraft.instance.definition.sounds[20].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/40gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[20].effects = {"start": {"value": "gpws40"}}

  geofs.aircraft.instance.definition.sounds[21] = {};
geofs.aircraft.instance.definition.sounds[21].id = "30"
  geofs.aircraft.instance.definition.sounds[21].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/30gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[21].effects = {"start": {"value": "gpws30"}}

  geofs.aircraft.instance.definition.sounds[22] = {};
geofs.aircraft.instance.definition.sounds[22].id = "20"
  geofs.aircraft.instance.definition.sounds[22].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/20gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[22].effects = {"start": {"value": "gpws20"}}

  geofs.aircraft.instance.definition.sounds[23] = {};
geofs.aircraft.instance.definition.sounds[23].id = "10"
  geofs.aircraft.instance.definition.sounds[23].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/10gpws_merged.mp3"
geofs.aircraft.instance.definition.sounds[23].effects = {"start": {"value": "gpws10"}}

geofs.aircraft.instance.definition.sounds[24] = {};
geofs.aircraft.instance.definition.sounds[24].id = "TCAS";
geofs.aircraft.instance.definition.sounds[24].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/traffic.mp3";
geofs.aircraft.instance.definition.sounds[24].effects = {
	"start": {
		"value": "isTCAS"
	}
};

geofs.aircraft.instance.definition.sounds[25] = {};
geofs.aircraft.instance.definition.sounds[25].id = "climb";
geofs.aircraft.instance.definition.sounds[25].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/climb.mp3";
geofs.aircraft.instance.definition.sounds[25].effects = {
	"start": {
		"value": "isTCASClimb"
	}
};

geofs.aircraft.instance.definition.sounds[26] = {};
geofs.aircraft.instance.definition.sounds[26].id = "descend";
geofs.aircraft.instance.definition.sounds[26].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/descend.mp3";
geofs.aircraft.instance.definition.sounds[26].effects = {
	"start": {
		"value": "isTCASDescend"
	}
};

geofs.aircraft.instance.definition.sounds[27] = {};
geofs.aircraft.instance.definition.sounds[27].id = "clear";
geofs.aircraft.instance.definition.sounds[27].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/clear.mp3";
geofs.aircraft.instance.definition.sounds[27].effects = {
	"start": {
		"value": "isTCASClear"
	}
};

geofs.aircraft.instance.definition.sounds[36] = {};
geofs.aircraft.instance.definition.sounds[36].id = "overspeed";
geofs.aircraft.instance.definition.sounds[36].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/sounds_overspeed.mp3";
geofs.aircraft.instance.definition.sounds[36].effects = {
	"start": {
		"value": "overspeed"
	}
};

geofs.aircraft.instance.definition.sounds[40] = {};
geofs.aircraft.instance.definition.sounds[40].id = "flapsClick";
geofs.aircraft.instance.definition.sounds[40].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/flapslever.mp3";
geofs.aircraft.instance.definition.sounds[40].effects = {
	"start": {
		"value": "flapsClick"
	}
};

geofs.aircraft.instance.definition.sounds[41] = {};
geofs.aircraft.instance.definition.sounds[41].id = "flapsSound";
geofs.aircraft.instance.definition.sounds[41].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/737flaps.mp3";
geofs.aircraft.instance.definition.sounds[41].effects = {
	"start": {
		"value": "flapsSound"
	}
};

geofs.aircraft.instance.definition.sounds[42] = {};
geofs.aircraft.instance.definition.sounds[42].id = "trim";
geofs.aircraft.instance.definition.sounds[42].file = "https://138772948-227015667470610340.preview.editmysite.com/uploads/1/3/8/7/138772948/sounds_trim.mp3";
geofs.aircraft.instance.definition.sounds[42].effects = {
	"start": {
		"value": "trimSound"
	}
};

assignSounds()


function groundEffect() {
  if (geofs.animation.values.haglFeet <= 100) {
    geofs.aircraft.instance.rigidBody.applyCentralImpulse([0,0,(-(geofs.animation.values.haglFeet) + 100) * geofs.animation.values.kias] / 10)
  }
}

let restingPoint = 5.152139372973117

//detect and execute GPWS callouts
let isApprConfig = false;
 geofs.animation.values.isFlapsWarn = 0;
geofs.animation.values.isGearWarn = 0;
geofs.animation.values.isTerrainWarn = 0;
 geofs.animation.values.isPullupWarn = 0;
 geofs.animation.values.isBankWarn = 0;
 geofs.animation.values.gpws1000 = 0;
 geofs.animation.values.gpws500 = 0;
 geofs.animation.values.gpws400 = 0;
 geofs.animation.values.gpws300 = 0;
 geofs.animation.values.gpws200 = 0;
 geofs.animation.values.gpws100 = 0;
 geofs.animation.values.gpws50 = 0;
 geofs.animation.values.gpws40 = 0;
 geofs.animation.values.gpws30 = 0;
 geofs.animation.values.gpws20 = 0;
 geofs.animation.values.gpws10 = 0;
geofs.animation.values.isTCASClimb = 0;
geofs.animation.values.isTCASDescend = 0;
geofs.animation.values.isTCAS = 0;
geofs.animation.values.isTCASClear = 0;

function getGearFlapsWarn() {
if (geofs.animation.values.groundContact == 1) {
  geofs.animation.values.isGearWarn = 0;
  geofs.animation.values.isFlapsWarn = 0;
  return;
}
	if (geofs.animation.values.haglFeet <= 500 && geofs.animation.values.gearPosition == 1 && geofs.animation.values.climbrate < 0 && geofs.animation.values.isPullupWarn == 0) {
		geofs.animation.values.isGearWarn = 1;
	} else {
		geofs.animation.values.isGearWarn = 0;
	}

	if (geofs.animation.values.haglFeet <= 1000 && geofs.animation.values.flapsPosition == 0 && geofs.animation.values.climbrate < 0 && geofs.animation.values.isPullupWarn == 0) {
		geofs.animation.values.isFlapsWarn = 1;
	} else {
		geofs.animation.values.isFlapsWarn = 0;
	}
}

function testTerrainorAppr() {
lastTerrainCall = geofs.animation.values.haglFeet
setTimeout(() => {
	if (geofs.animation.values.isGearWarn == 0 && geofs.animation.values.isFlapsWarn == 0 && isApprConfig == 0) {
		if ((lastTerrainCall - geofs.animation.values.haglFeet) <= 200) {
			geofs.animation.values.isTerrainWarn = 1;
		} else {
			geofs.animation.values.isTerrainWarn = 0;
		}

		if ((lastTerrainCall - geofs.animation.values.haglFeet) <= 500 || (geofs.animation.values.haglFeet <= 1000 && isApprConfig == 0)) {
			geofs.animation.values.isPullupWarn = 1;
		} else {
			geofs.animation.values.isPullupWarn = 0;
		}
	} else {
		geofs.animation.values.isTerrainWarn = 0;
    geofs.animation.values.isPullupWarn = 0;
		return;
	}
}, 1000)
}


function testForApproach(){
  if (geofs.animation.values.isFlapsWarn == 0 && geofs.animation.values.isGearWarn == 0 && geofs.animation.values.climbrate <= -1){
    isApprConfig = true
  }
  else{
    isApprConfig = false
  }
}

function doRadioAltCall(){
  if (isApprConfig){
  if (geofs.animation.values.haglFeet <= 1000 + restingPoint && geofs.animation.values.haglFeet >= 900 + restingPoint){
    geofs.animation.values.gpws1000 = 1;
  }
  else{
    geofs.animation.values.gpws1000 = 0;
  }
   if (geofs.animation.values.haglFeet <= 500 + restingPoint && geofs.animation.values.haglFeet >= 400 + restingPoint){
    geofs.animation.values.gpws500 = 1;
  }
  else{
    geofs.animation.values.gpws500 = 0;
  } 
   if (geofs.animation.values.haglFeet <= 400 + restingPoint && geofs.animation.values.haglFeet >= 300 + restingPoint){
    geofs.animation.values.gpws400 = 1;
  }
  else{
    geofs.animation.values.gpws400 = 0;
  } 
   if (geofs.animation.values.haglFeet <= 300 + restingPoint && geofs.animation.values.haglFeet >= 200 + restingPoint){
    geofs.animation.values.gpws300 = 1;
  }
  else{
    geofs.animation.values.gpws300 = 0;
  } 
   if (geofs.animation.values.haglFeet <= 200 + restingPoint && geofs.animation.values.haglFeet >= 100 + restingPoint){
    geofs.animation.values.gpws200 = 1;
  }
  else{
    geofs.animation.values.gpws200 = 0;
  } 
   if (geofs.animation.values.haglFeet <= 100 + restingPoint && geofs.animation.values.haglFeet >= 50 + restingPoint){
    geofs.animation.values.gpws100 = 1;
  }
  else{
    geofs.animation.values.gpws100 = 0;
  } 
   if (geofs.animation.values.haglFeet <= 50 + restingPoint && geofs.animation.values.haglFeet >= 40 + restingPoint){
    geofs.animation.values.gpws50 = 1;
  }
  else{
    geofs.animation.values.gpws50 = 0;
  } 
   if (geofs.animation.values.haglFeet <= 40 + restingPoint && geofs.animation.values.haglFeet >= 30 + restingPoint){
    geofs.animation.values.gpws40 = 1;
  }
  else{
    geofs.animation.values.gpws40 = 0;
  } 
   if (geofs.animation.values.haglFeet <= 30 + restingPoint && geofs.animation.values.haglFeet >= 20 + restingPoint){
    geofs.animation.values.gpws30 = 1;
  }
  else{
    geofs.animation.values.gpws30 = 0;
  } 
   if (geofs.animation.values.haglFeet <= 20 + restingPoint && geofs.animation.values.haglFeet >= 10 + restingPoint){
    geofs.animation.values.gpws20 = 1;
  }
  else{
    geofs.animation.values.gpws20 = 0;
  } 
   if (geofs.animation.values.haglFeet <= 10 + restingPoint && geofs.animation.values.haglFeet >= 5 + restingPoint){
    geofs.animation.values.gpws10 = 1;
  }
  else{
    geofs.animation.values.gpws10 = 0;
  } 
}
  else {
    geofs.animation.values.gpws1000 = 0;
    geofs.animation.values.gpws500 = 0;
    geofs.animation.values.gpws400 = 0;
    geofs.animation.values.gpws300 = 0;
    geofs.animation.values.gpws200 = 0;
    geofs.animation.values.gpws100 = 0;
    geofs.animation.values.gpws50 = 0;
    geofs.animation.values.gpws40 = 0;
    geofs.animation.values.gpws30 = 0;
    geofs.animation.values.gpws20 = 0;
    geofs.animation.values.gpws10 = 0;
  }
}






soundInt = setInterval(function(){
  getFinalSoundVolumes();
  getGearFlapsWarn();
  testForApproach();
  testTerrainorAppr();
  doRadioAltCall();
  overspeed();
  getTrimSound();
  getFlapsSound();
  getFlapsClick();
})


let alreadyChecked = false;
function doTrafficCheck() {
  geofs.animation.values.isTCASDescend = 0;
  geofs.animation.values.isTCASClimb = 0;
  Object.values(multiplayer.visibleUsers).forEach(function(e) {
    if (e.distance <= 1000) {
      if (alreadyChecked) {
        return;
      }
      geofs.animation.values.isTCAS = 1;
      setTimeout(function(){
         alreadyChecked = true
        geofs.animation.values.isTCAS = 0;
      }, 1000)
    }
})
  getTrafficProximity()
}

function getTrafficProximity() {
  if (geofs.animation.values.isTCAS == 1) {
    return;
  }
	Object.values(multiplayer.visibleUsers).forEach(function(e) {
		if (e.distance <= 1000) {
			if (e.referencePoint.lla[2] >= geofs.animation.values.altitudeMeters && e.referencePoint.lla[2] <= geofs.animation.values.altitudeMeters + 1000) {
				geofs.animation.values.isTCASDescend = 1;
				} else {
					geofs.animation.values.isTCASDescend = 0;
				}
				if (e.referencePoint.lla[2] <= geofs.animation.values.altitudeMeters && e.referencePoint.lla[2] >= geofs.animation.values.altitudeMeters - 1000) {
					geofs.animation.values.isTCASClimb = 1;

				} else {
					geofs.animation.values.isTCASClimb = 0;
				}
			}
	});
  if (geofs.animation.values.isTCASClimb == 0 && geofs.animation.values.isTCASDescend == 0) {
    alreadyChecked = false
  }
}


tcasIntervalAnnounce = setInterval(function() {
  if (geofs.animation.values.altitudeMeters >= 1000) {
  doTrafficCheck();
  }
}, 200)
