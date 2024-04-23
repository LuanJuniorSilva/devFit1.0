android material icon generator

https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.type=clipart&foreground.clipart=android&foreground.space.trim=1&foreground.space.pad=0.25&foreColor=rgba(96%2C%20125%2C%20139%2C%200)&backColor=rgb(68%2C%20138%2C%20255)&crop=0&backgroundShape=circle&effects=none&name=ic_launcher

keytool -genkeypair -v -keystore devfit.keystore -alias devfit -keyalg RSA -keysize 2048 -validity 10000

Informe a senha da área de armazenamento de chaves: {no minimo 6 digitos}
Qual é o seu nome e sobrenome? Luan Silva
Qual é o nome da sua unidade organizacional?
Qual é o nome da sua empresa?
Qual é o nome da sua Cidade ou Localidade? Gravataí
Qual é o nome do seu Estado ou Município? RS
Quais são as duas letras do código do país desta unidade? BR

gradle.properties
MYAPP_UPLOAD_STORE_FILE=devfit.keystore
MYAPP_UPLOAD_KEY_ALIAS=devfit
MYAPP_UPLOAD_STORE_PASSWORD=123456
MYAPP_UPLOAD_KEY_PASSWORD=123456

build.gradle
android{
signingConfigs{
debug{...}
release {
if(project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
storeFile file(MYAPP_UPLOAD_STORE_FILE)
storePassword MYAPP_UPLOAD_STORE_PASSWORD
keyAlias MYAPP_UPLOAD_KEY_ALIAS
keyPassword MYAPP_UPLOAD_KEY_PASSWORD
}
}
}

buildTypes {
release {
signingConfig signingConfigs.release
}
}
}

cd android
./gradlew bundleRelease

(

Se der erro no comando acima:
ir na pasta:
node_modules/fsevents/node_modules/ e apagar a pasta .bin
node_modules/node-pre-gyp/node_modules/ e apagar a pasta .bin
)

build.gradle
defaultConfig {
aplicationId "com.luan.devfit"
minSdkVersion rootProject.ext.minSdkVersion
targetSdkVersion rootProject.ext.targetSdkVersion
versionCode 2
versionName "1.1"
}

cd androind
./gradlew bundleRelease (gera o arquivo .aab)
android/app/build/outputs/bundle/release/app.aab

./gradlew assembleRelease ()
android/app/build/outputs/apk/app-release.apk

---
