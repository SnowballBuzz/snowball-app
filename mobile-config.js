App.info({
  id: 'buzz.snowball.app',
  name: 'Snowball',
  description: 'Snowball is a platform to crowdsource ideas for change.',
  author: 'Elmidou',
  email: 'hi@snowball.buzz',
  website: 'https://www.snowball.buzz/',
  version: '0.0.7'
});
//meteor build ~/Builds/Snowball --architecture os.linux.x86_64 --server https://app.snowball.buzz

App.icons({
//iOS
  'iphone': 'mobile/iOS/Resources/icons/Icon-60.png',
  'iphone_2x': 'mobile/iOS/Resources/icons/Icon-120.png',
  'iphone_3x': 'mobile/iOS/Resources/icons/Icon-180@3x.png',
  'ipad': 'mobile/iOS/Resources/icons/Icon-76.png',
  'ipad_2x': 'mobile/iOS/Resources/icons/Icon-152.png',

//Android
  'android_ldpi': 'mobile/Android/res/drawable-ldpi/icon.png',
  'android_mdpi': 'mobile/Android/res/drawable-mdpi/icon.png',
  'android_hdpi': 'mobile/Android/res/drawable-hdpi/icon.png',
  'android_xhdpi': 'mobile/Android/res/drawable-xhdpi/icon.png'
});

App.launchScreens({
//iOS
  'iphone': 'mobile/iOS/Resources/splash/Default~iphone.png',
  'iphone_2x': 'mobile/iOS/Resources/splash/Default@2x~iphone_640x960.png',
  'iphone5': 'mobile/iOS/Resources/splash/Default-568h@2x~iphone_640x1136.png',
  'iphone6': 'mobile/iOS/Resources/splash/Default-750@2x~iphone6-portrait_750x1334.png',
  'iphone6p_portrait': 'mobile/iOS/Resources/splash/Default-1242@3x~iphone6s-portrait_1242x2208.png',
  'iphone6p_landscape': 'mobile/iOS/Resources/splash/Default-1242@3x~iphone6s-landscape_2208x1242.png',
  'ipad_portrait': 'mobile/iOS/Resources/splash/Default~ipad.png',
  'ipad_portrait_2x': 'mobile/iOS/Resources/splash/Default-Portrait@2x~ipad_1536x2048.png',
  'ipad_landscape': 'mobile/iOS/Resources/splash/Default-Landscape~ipad_1024x768.png',
  'ipad_landscape_2x': 'mobile/iOS/Resources/splash/Default-Landscape@2x~ipad_2048x1536.png',

//Android
  'android_ldpi_portrait': 'mobile/Android/res/drawable-ldpi/screen.png',
  'android_ldpi_landscape': 'mobile/Android/res/drawable-land-ldpi/screen.png',
  'android_mdpi_portrait': 'mobile/Android/res/drawable-mdpi/screen.png',
  'android_mdpi_landscape': 'mobile/Android/res/drawable-land-mdpi/screen.png',
  'android_hdpi_portrait': 'mobile/Android/res/drawable-hdpi/screen.png',
  'android_hdpi_landscape': 'mobile/Android/res/drawable-land-hdpi/screen.png',
  'android_xhdpi_portrait': 'mobile/Android/res/drawable-xhdpi/screen.png',
  'android_xhdpi_landscape': 'mobile/Android/res/drawable-land-xhdpi/screen.png'
});

App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'portrait');
//App.setPreference('Orientation', 'all', 'ios');
//App.setPreference('AutoHideSplashScreen' ,'true');


// Pass preferences for a particular PhoneGap/Cordova plugin
//App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//APP_ID: '1234567890',
//API_KEY: 'supersecretapikey'
//});

//remove these sometime
App.accessRule("*");
App.accessRule("blob:*");
//App.accessRule(domainRule, [options])
