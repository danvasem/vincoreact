* Para habilitar react-native-maps: https://github.com/react-native-community/react-native-maps/blob/HEAD/docs/installation.md
* Para habilitar react-native-firebase: https://rnfirebase.io/docs/v5.x.x/installation/ios

* Para ver el log del simulador utilizar: react-native log-ios

* Para resolver el problema de que la aplicación se cierra y el mensaje es version mismatch de google: https://github.com/invertase/react-native-firebase/issues/1633
    Actualizar pod con: pod 'GoogleAppMeasurement', '~> 5.2.0'
    ejecutar: pod update

* Para habilitar Firebase Cloud Messaging: https://rnfirebase.io/docs/v5.x.x/messaging/ios

* Para habilitar Firebase Notifications: https://rnfirebase.io/docs/v5.x.x/notifications/ios

NOTA: Al agreagar nuevas dependencias en POD, entonces hay que ejcutar pod install en la carpeta ./ios

* Para solucionar problema en el cual no encuentra un header, verificar en xCode del proyecto que los Paths de Header Search incluyan: ...react-native-firebase/ios/RNFirebase

* Para ejecutar el codigo en el iphone fisico:
    Se debe ejecutar desde xCode
    Recordar abrir el proyecto /ios/proyecto.xcworkspace (NO el xcodeproj) ya que el primero contiene las referencias a los PODS

* Para depurar JS en el dispositivo, se debe:
    Instalar chrome en mac
    Actualizar la direccion IP en archivo RTCWebSocketExecutor.m  https://facebook.github.io/react-native/docs/debugging
    Abrir en chrome la direccion: IP/debugger-ui
    Habilitar debug js remotelly from developer menu en el dispositivo
    Ya se comienza a depurar

* Para configurar APN con Firebase: https://firebase.google.com/docs/cloud-messaging/ios/certs  
    NOTA: Con Firebase ya no es necesario manejar otro APPLICATION en SNS ya que los mensajes de Firebase llegan a iOS tambien.

* Para configurar Crashlytics: https://rnfirebase.io/docs/v5.x.x/crashlytics/ios
    NOTA: Los pods deben ser agregados segun se indica en: https://firebase.google.com/docs/crashlytics/get-started

* Para configurar Facebook en iOS: https://github.com/facebook/react-native-fbsdk
    Seguir los pasos como se indica en el link anterior.
    Recordar:
        Colocar el SDK de Facebook en $(HOME)/documents/FacebookSDK
        Arrastrar desde la direccion anterior a la carpeta Frameworks del .xcodeproj para que los reconozca, arrastar Login, Share, Core y Bolt
        Validar que en el proyecto .xcodeproj en "Framework search paths" se incluya $(HOME)/Documents/FacebookSDK
        Si existen errores de ejecucion con la version 4.39.0 de FBSDK entonces descargar la version 4.38 desde https://origincache.facebook.com/developers/resources/?id=FacebookSDKs-iOS-4.38.0.zip y reemplazar su contenido en Documents/FacebookSDK
        Agregar el proyecto node_modules/react-native-fbsdk/ios/RCTFBSDK.xcodeproj a las librerias del proyecto en xCode y verificar que libRCTFBSDK.a se encuentra en la lista de Linked Framework and Libreries
    NOTA:Si en algun momento el motor JS de debug da un problema de referencias repetidas de React,colocar lo siguiente en el archivo ios/Podfile:
        pod 'React', :path => '../node_modules/react-native'
        pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'



