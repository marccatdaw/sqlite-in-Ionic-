# sqlite-in-Ionic-

## Sumary
 Dev1-Install and Show data: creació d'una base de dades amb una taula amb dades i mostrar aquestes en una vista.  

## Create the project

Comandes a executar en cmd per crear el projecte  i instal·lar els plugins necesaris.
```bash
ionic start CardsGame
cd CardsGame
ionic g service services/database
ionic g page pages/Cards
npm install @ionic-native/sqlite @ionic-native/sqlite-porter
ionic cordova plugin add cordova-sqlite-storage
ionic cordova plugin add uk.co.workingedge.cordova.plugin.sqliteporter
```

## Create apk for Android

Comandes a executar per crear el projecte i crear l'apk amb l'Android Studio.
```bash
npm install --save @capacitor/core @capacitor/cli
npx cap init
ionic build
npx cap add android
npx cap open android
```
