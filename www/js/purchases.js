document.addEventListener('deviceready', initializeApp, false);
//doing this after deviceready event to get product prices and restore purchases
function populatePrices_afterDeviceReady(){
    inAppPurchases.getAllProductInfo(productIds).then( function (products) {
        //handle
        for (var i=0; i<products.length; i++){
            if (products[i]["removeads_001"] == ad_product_id){
                //show the price that was set in the stores
                var buy_amount_elem = document.getElementById("buy_amount");
                buy_amount_elem.innerHTML = products[i].price;
            }
        }
        return inAppPurchases.restorePurchases();
    }).then( function(purchases){
        //restore bought purchases
        for (var i=0; i<purchases.length; i++){
            if (purchases[i]["restorepurchase002"] == ad_product_id){
                //bought the removes ads purchase
                if (purchases[i]["pending"]) continue;
                if (!purchases[i]["completed"]) inAppPurchases.completePurchase(purchases[i]["restorepurchase002"])
                    .catch(function(err){ });
                var buy_elem = document.getElementById("restorePurchase()");
                buy_elem.parentElement.removeChild(buy_elem);
                removeAds();
            }
        }
    }).catch( function(err) {
        console.log("price won't be updated, try again later if connection issue or debug error" + JSON.stringify(err));
    });
}