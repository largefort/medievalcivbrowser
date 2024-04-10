document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Initialize the in-app purchase plugin
    if (!window.store) {
        console.log('Store not available');
        return;
    }

    // Configure the store
    store.register({
        id: 'removeads_001',
        alias: 'Remove Ads',
        type: store.NON_CONSUMABLE
    });

    // When the product is approved for purchase
    store.when('removeads_001').approved(function (product) {
        product.finish();
        removeAds(); // Call your function to remove ads here
    });

    // When the purchase is initiated
    store.when('removeads_001').updated(function (product) {
        if (product.state === store.APPROVED) {
            product.finish();
            removeAds(); // Call your function to remove ads here
        }
    });

    // When an error occurs during purchase
    store.error(function (err) {
        console.log('Store Error: ' + err.message);
    });

    // Initialize the store
    store.ready(function () {
        console.log('Store Ready');
        store.refresh();
    });

    // Attempt to restore purchases when the device is ready
    store.ready(function () {
        store.refresh();
    });
}

// Function to remove banner ads
function removeAds() {
    // Check if banner ads are currently displayed
    if (bannerAdsDisplayed && !bannerAdsRemoved) {
        // Remove the banner ads from the DOM
        var bannerAds = document.getElementsByClassName('banner-ad');
        for (var i = 0; i < bannerAds.length; i++) {
            bannerAds[i].style.display = 'none';
        }
        // Set a flag indicating that banner ads are removed
        bannerAdsRemoved = true;
    }
}

// Assume you have some logic to check if banner ads are currently displayed
var bannerAdsDisplayed = true; // Change this to false if there are no banner ads initially
var bannerAdsRemoved = false; // Flag to keep track if banner ads are removed

// Function to initiate purchase
function purchaseProduct(productId) {
    // Trigger Google Play IAP interface
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.inapppurchase) {
        window.cordova.plugins.inapppurchase.buy(productId);
    }
}

// Function to restore purchase
function restorePurchases() {
    // Trigger Google Play IAP interface
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.inapppurchase) {
        window.cordova.plugins.inapppurchase.buy('restorepurchase002');
    }
}

// Replace the HTML elements with JavaScript event listeners
document.addEventListener('DOMContentLoaded', function() {
    var removeAdsButton = document.querySelector('.remove-ads-button');
    removeAdsButton.addEventListener('click', function() {
        purchaseProduct('removeads_001');
    });

    var restorePurchaseButton = document.querySelector('.restore-purchase-button');
    restorePurchaseButton.addEventListener('click', function() {
        purchaseProduct('restorepurchase002');
    });
});


 console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
