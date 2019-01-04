* npm install aws-sdk
* npm install --save amazon-cognito-identity-js
* npm install --save react-navigation
* npm install --save react-navigation-gesture-handler
* npm install link react-native-gesture-handler
* Actualizar mainActivity.java para hablitar los gestos en Android
https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html
* npm install react-native-qrcode-svg
* react-native link react-native-qrcode-svg
* npm install react-native-maps --save
* Para configuraciones posteriores (Android/iOS): https://github.com/react-native-community/react-native-maps/blob/HEAD/docs/installation.md
* Para Android considerar para evitar errores de build:
	implementation 'com.google.android.gms:play-services-base:12.0.0'
	implementation 'com.google.android.gms:play-services-maps:12.0.0'

* Para obtener versión de sistema de imagen Android compatible con 4.4: https://dl.google.com/android/repository/sys-img/google_apis/x86-19_r34.zip

* Para Redux: npm install redux react-redux --save

* Para utilizar Firebase: 
npm install --save react-native-firebase
Para ANdroid:
react-native link react-native-firebase
seguir los pasos de: https://rnfirebase.io/docs/v5.x.x/installation/android
NOTA: en la versión de Google Maps actualizar build.gradle con la versión 16.0.0
*Para habilitar firebase push notifications en Android: https://rnfirebase.io/docs/v4.3.x/messaging/android
* Para solucionar error de versiones de Firebase, aplicar la linea, como se indica en: https://github.com/flutter/flutter/issues/19983
	com.google.gms.googleservices.GoogleServicesPlugin.config.disableVersionCheck = true
*Para solucionar problema de crash app cuando se recibe un push: https://github.com/OneSignal/OneSignal-Gradle-Plugin/issues/69
	en app/build.gradle cambiar la versión a: implementation 'com.google.firebase:firebase-messaging:17.3.3'
*Para habilitar la visualización de notificaciones en ANdroid, seguir los pasos: https://rnfirebase.io/docs/v4.3.x/notifications/android

* Para habilitar Crashlytics: https://rnfirebase.io/docs/v5.x.x/crashlytics/android

* Para instalar login con Facebook: https://developers.facebook.com/docs/react-native/getting-started
	npm install --save react-native-fbsdk
	react-native link react-native-fbsdk

	Seguir los pasos de: https://developers.facebook.com/docs/react-native/configure-android-current
	NOTA: Recordar no repetir en MainApplication.java el FBSDKPackage en la lista, si ya existe se reemplaza.

	Para obtener la clave hash de desarrollo:
	cd "C:\Program Files (x86)\Java\jdk1.8.0_161\jre\bin"
	keytool -exportcert -alias androiddebugkey -keystore "C:\Users\user\AppData\Local\Xamarin\Mono for Android\debug.keystore" | "C:\OpenSSL\bin\openssl" sha1 -binary | "C:\OpenSSL\bin\openssl" base64
	Introduzca la contraseña del almacén de claves:  android



