# SHALOM APP

Church app Shalom Comunidade Cristã

### Pre-requisites

NodeJS, Android SDK (Android), XCode (iOS).

## Features

- [x] Dark Mode
- [x] Integration with Youtube and Google Maps
- [x] Deep link support with scc.org.br domain
- [x] Push notifications, firebase analytics and update notifications support available
- [x] Saves API queries to local database for offline access


# 🚀 Quick start

## Install node depedences

```bash
  npm install
```

## Start web developing

```bash
  npm run start
```
# Deploy

Add the Firebase google-services.json file to /android/app/.
Change YouTubeDataApiKey value in config.xml.

## Deploy Android

```bash
  npm run build:android:prod
```

Once Android Studio launches, you can build your app through the standard Android Studio workflow. 
Build > Generate Signed Bundle > Android App Bundle > Upload shalom.keystore. 
Upload app bundle (.aab) in the site Google Play Developer Console.

## Deploy iOS

```bash
  npm run build:ios:prod
```

Once Xcode launches, you can build your app binary through the standard Xcode workflow.

# Documentation
 
- [Components](https://ionicframework.com/docs/components)
- [Plugins](https://ionicframework.com/docs/native)

## Tech Stack

<p align="left">
  <a href="https://angular.io" target="_blank" rel="noreferrer"> <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular" width="40" height="40"/> </a> <a href="https://ionicframework.com" target="_blank" rel="noreferrer"> <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Ionic_Logo.svg" alt="ionic" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a>
</p>

## Connect with me
<p align="left">
  <a href="https://linkedin.com/in/raphaelramosbr" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="raphael-r2" height="30" width="40" /></a>
  <a href="https://twitter.com/raphaelramosbr" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="raphaelramosr2" height="30" width="40" /></a>
   <a href="https://www.youtube.com/@raphaelramosbr?sub_confirmation=1" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/youtube.svg" alt="raphaelramosbr" height="30" width="40" /></a>
</p>
