# health-app-frontend

## Steps for Production build

1. Change following values in the environemt
    - ssdURL: `https://health-appprod.azurewebsites.net`
    - clientIdWebLogin: `a88cc2a4-ee56-4244-aa32-153fe32ba9fc`
    - redirectUrlWebLogin: `https://carefirst-appprod.azurewebsites.net/logincomplete`
    - postLogoutRedirectUri: `https://carefirst-appprod.azurewebsites.net/landingpage`


2. Update the version in `package.json` & `config.xml` file.


3. Update the `id` value in `config.xml` file. For android build `id` would be `co.blucocoondigital.healthapp` and for ios build `id` would be `com.blucocoondigital.healthapp`


4. Check the list of cordova plugin and make sure unnecessary plugins are removed. 
    `cordova plugin ls`


5. Run appropriate build command
    - `npm run android-build`
    - `npm run ios-build`


6. For android build comment the `READ_PHONE_STATE` permission in `android-manifest.xml` file.

7. For ios build make sure `iPad` is not selected in the Xcode. 

