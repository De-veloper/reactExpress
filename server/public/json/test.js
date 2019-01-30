//cc#635858 internal GTM
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TTQLSC9');


/*****************
 * Google Analytics
 *****************/
jQuery.getScript('/www/ev_pitt/ss/evenue/customize/ev_pitt/script/global/pixel_config.js',function(){
    jQuery.getScript('//media.paciolan.com/evenue/Common/pixels/google_analytics.js');
});
/*****************
 * End Google Analytics
 *****************/

 //All pixel from Pixel Lib
jQuery.getScript('//media.paciolan.com/evenue/Common/pixels/Pixel_Lib.js',function(){
    /************************
        Google Adwords (template) 
    *************************/
    pixel_lib.GooglePixel({
        debug:true, //show console (optional)
        id:'1002384165',//provide by client
        remar_label:'',
        conv_label:'FPPdCPrE-l0Qpdb83QM',
        currency:'USD'
    });
    /************************
        End Google Adwords (template)
    *************************/

    //cc#574561 New Global Google Adwords (Interanl only)
    jQuery.getScript('//media.paciolan.com/evenue/Common/pixels/pixelAutoLoop.js',function(){
        pixelAutoLoop('/www/ev_pitt/ss/evenue/customize/ev_pitt/pixel/json/paciolan-pixel.json');//new internal FB id
        pixelAutoLoop('/www/ev_pitt/ss/evenue/customize/ev_pitt/pixel/json/client-pixel.json');
    });
    //end cc#574561 New Global Google Adwords (Interanl only)

    pixel_lib.SPORTSDESK({
        debug:true,
        pixelId:"5238814",
        Confirm_typeId:"pitt100",
        typeId:"pitt10",
        Confirm_catId:"pitts0",
        catId:"pitts0",
        FB_ID:"256156034764754"
    });

});
//FanOneTracking
//case558364
if(/DisplayGroupList|DisplayEventList|DisplayEventInfo/i.test(pageName)){
    jQuery.getScript('//media.paciolan.com/evenue/Common/pixels/fanOneTracking.js',function(){
        var fanOnePixels = new fanOneTracking('case558364');
        fanOnePixels.launch();
    });     
}
//CartAbandonment
//cc#567438
if(/CartDisplay/i.test(pageName)){
    jQuery(window).load(function(){
        jQuery.getScript('//media.paciolan.com/evenue/Common/pixels/cartAbandonment.js',function(){
            (function(){
                var cartPixels = new CartAbandonment('Pitt_Cart_Abandonment');
                cartPixels.launch();
                var cartPixels = new CartAbandonment('Pitt_Cart_Abandonment_3.28.18');//cc#595280
                cartPixels.launch();
                var cartPixels = new CartAbandonment('Pitt_Cart_Abandonment_5.10.18');//cc#602631
                cartPixels.launch();
                //cc#604084
                var cartPixels = new CartAbandonment('Pitt_Cart_Abandonment_5.18.18');
                cartPixels.launch();
                //cc#625388
                var cartPixels = new CartAbandonment('Pitt_Cart_Abandonment_9.11.18');
                cartPixels.launch();
            }());
        }); 
    });
}

