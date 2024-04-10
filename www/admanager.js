var AdManager = {
    bannerAdUnitId: 'ca-app-pub-5816082932921993/9449380571',
    interstitialAdUnitId: 'YOUR_INTERSTITIAL_AD_UNIT_ID',
    
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.initializeAdMob();
    },

    initializeAdMob: function() {
        AdMob.initialize(function() {
            // AdMob is initialized successfully
            // You can now create and show ads
            AdManager.createAndShowBannerAd();
            AdManager.prepareInterstitialAd();
        }, function(error) {
            // Error occurred while initializing AdMob
            console.error('AdMob initialization error: ' + error);
        });
    },

    createAndShowBannerAd: function() {
        var bannerOptions = {
            adSize: 'SMART_BANNER', // Change to desired banner size
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            isTesting: false // Set to true during development/testing
        };

        AdMob.createBanner({
            adId: this.bannerAdUnitId,
            adSize: bannerOptions.adSize,
            position: bannerOptions.position,
            isTesting: bannerOptions.isTesting,
            autoShow: true // Set to false if you want to control when to show the banner
        });
    },

    prepareInterstitialAd: function() {
        AdMob.prepareInterstitial({
            adId: this.interstitialAdUnitId,
            autoShow: false // Set to true if you want the interstitial to be shown immediately after loading
        });

        // Optionally, you can listen for interstitial ad events
        document.addEventListener('onAdLoaded', function(data) {
            // Interstitial ad is loaded
        });
        
        document.addEventListener('onAdClosed', function(data) {
            // Interstitial ad is closed
            // You may want to load another interstitial ad here for future display
            AdManager.prepareInterstitialAd();
        });
    }
};

AdManager.initialize();
