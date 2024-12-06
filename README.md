# Operating systems final project: Remote-Controlled Car

This project implements a remote-controlled car operated via a mobile app developed with React Native using Expo.
The system allows you to control the car's direction and speed over Bluetooth.

## Authors
* [Oscar Angulo](https://github.com/Kicho115)
* [Rene Lozano García]()

## Main Features
* Direction Control: Move forward, backward, left, or right.
* Speed Control: Gradual acceleration from 0 to maximum speed.
* Bluetooth Connection: Communication via HC-05 module.
* Android Compatibility: Designed for Android devices.

## System Requirements
**Software**
* Node.js (v16 or later recommended)
* Expo CLI (installable via npm)
* Android Studio or a physical Android device for testing

**Hardware**
* STM32 board to control the car.
* HC-05 Bluetooth module connected to the STM32.
* Motors and car chassis.

## How to Run the App

1. Clone the Repository

```bash
git clone https://github.com/username/RCC.git
```

2. Install Dependencies
Ensure Node.js is installed, then run:

```bash
cd RCC 
npm install
```

3. Start the Project with Expo
Launch the development server:

``` bash
npx expo start  
```
This will open the Expo Developer Tools in your browser.

4. Test on Your Device

* Download the Expo Go app from the Google Play Store.
* Scan the QR code shown in Expo Developer Tools.

## How to Build for Android

1. Install Expo EAS CLI

``` bash
npm install -g eas-cli 
```
 
2. Generate the Build
Run the following command to create an APK file:

``` bash
eas build --platform android  
```

3. Download and Install the APK
Once the build process is complete, you’ll receive a link to download the APK.
Download it, transfer it to your Android device, and install it manually.

## Using the App
1. Connect your HC-05 Bluetooth module to the STM32 and ensure it is paired with your Android device.
2. Open the mobile app.
3. Press "Connect Brokeneitor"
4. Search for and select the Bluetooth device representing the car.
5. Use the app’s buttons to control the car’s direction and speed.

## Technologies Used
* React Native: Framework for mobile app development.
* Expo: Platform for simplifying React Native development.
* Bluetooth Classic: Bluetooth communication with HC-05 modules.
* C: Programming language for STM32 firmware.
