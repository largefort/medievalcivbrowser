var admobid = {};
if (/(android)/i.test(navigator.userAgent)) { //Android
  admobid = {
    banner : 'ca-app-pub-5816082932921993/5439448724',
    interstitial : 'ca-app-pub-5816082932921993/4900570284',
    gotHereMsg1 : 'banner and interstitial have the android IDs'
  };
} else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { //iOS
  admobid = {
    banner : 'Stand in iOS banner ID',
    interstitial: 'stand in iOS interstitial ID',
    gotHereMsg1 : 'banner and interstitial have the iOS IDs'
  };
} else { //Neither
  admobid = {
    gotHereMsg1 : 'banner and interstitial have no IDs'
  }
}

if (window.AdMob) {
  var admob = window.AdMob;
  admob.createBanner ({
    adId : admobid.banner,
    position : admob.AD_POSITION.BOTTOM_CENTER,
    isTesting : false, //False for live ; True for production
    autoShow : true
  });
  admob.prepareInterstitial ({
    adId : admobid.interstitial,
    autoShow : false
  });
  gotHereMsg2 = "window.AdMob is true";
} else {
  gotHereMsg2 = "window.AdMob is not true";
}

//Got an ID and the actual ID's
document.getElementById("getIdCheck").innerHTML = admobid.gotHereMsg1;
document.getElementById("bannerId").innerHTML = admobid.banner;
document.getElementById("interstitialId").innerHTML = admobid.interstitial;
//window.AdMob is true and banner is created + interstitial is prepared
document.getElementById("isWindowAdmob").innerHTML = gotHereMsg2;
//Show interstitial function is executed or has not been executed
document.getElementById("startInterstitial").onclick = function () {
  if (window.AdMob) {
    var admob = window.AdMob;
    admob.showInterstitial();
    gotHereMsg3 = "Show Interstitial function has been executed";
  } else {
    gotHereMsg3 = "Show Interstitial function has not been executed";
  }
  document.getElementById("checkInterstitial").innerHTML = gotHereMsg3;
}