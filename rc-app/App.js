import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BluetoothConnectModal from './BluetoothModal';
import useBluetooth, { sendData } from "./UseBluetooth";
import { DeviceMotion } from 'expo-sensors';
import * as ScreenOrientation from 'expo-screen-orientation';
import Slider from '@react-native-community/slider';

const Stack = createStackNavigator();

const MainScreen = ({ navigation }) => {
  const { allDevices, scanForDevices, isDiscovering } = useBluetooth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleScan = async () => {
    setIsModalVisible(true);
    await scanForDevices();
  };

  const ConnectButton = (props) => {
    const { onPress, title = 'Connect Brokeneitor' } = props;
    return (
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.mainScreen}>
      <Text style={styles.title}>Brokeneitor</Text>
      <ConnectButton onPress={handleScan} />
      <BluetoothConnectModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        devices={allDevices}
        isScanning={isDiscovering}
        screens={navigation}
      />
      <Button
        title="Go to Controls"
        onPress={() => navigation.navigate('Controls')}
      />
    </View>
  );
};

const ControlsScreen = ({ route, navigation }) => {
  const { device } = route.params;
  const [orientation, setOrientation] = useState({
    direction: 'Recto',
    angle: 0
  });
  const [isLandscape, setIsLandscape] = useState(false);
  const [speed, setSpeed] = useState(2);

  const ControlsButton = (props) => {
    const { onPress, title } = props;
    return (
      <Pressable style={styles.controlsButton} onPress={onPress}>
        <Text style={styles.controlsButtonText}>{title}</Text>
      </Pressable>
    );
  };

  const BrakeButton = (props) => {
    const { onPress, title } = props;
    return (
      <Pressable style={styles.brakeButton} onPress={onPress}>
        <Text style={styles.brakeButtonText}>{title}</Text>
      </Pressable>
    );
  };

  useEffect(() => {
    // Force landscape mode in this screen
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };

    const checkOrientation = async () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
    };

    // This changes how often is the rotation of the screen updated
    DeviceMotion.setUpdateInterval(500);

    const motionSubscription = DeviceMotion.addListener(({ rotation }) => {
      if (rotation) {
        // Calculate the inclination of the phone in landscape mode
        const degrees = rotation.beta * (180 / Math.PI);

        let direction = '⬆️';
        if (degrees < -15) {
          direction = '⬅️';
          sendData(device, '1')
        } else if (degrees > 15) {
          direction = '➡️';
          sendData(device, '2')
        } else {
          sendData(device, '0')
        }

        setOrientation({
          direction,
          angle: degrees
        });

        console.log(`Inclinación: ${direction} (${degrees.toFixed(2)}°)`);
      }
    });

    lockOrientation();
    checkOrientation();

    // Limpiar suscripciones y desbloquear orientación al salir
    return () => {
      motionSubscription.remove();
      ScreenOrientation.unlockAsync();
    };
  }, [isLandscape]);

  return (
    <View style={styles.controls}>
      <ControlsButton title={"Reverse"} onPress={() => {
        console.log(`Reverseando con intensidad: ${speed}`);
       sendData(device, `${speed + 5}`);
      }} />
      <View>
        <View style={styles.controlsCenter}>
          <Text style={styles.controlsTitle}>Controls</Text>
          <Button
            title="Go to Main menu"
            onPress={() => navigation.navigate('Main')}
          />
          <Text style={styles.direction}>{orientation.direction}</Text>
          <Text style={styles.controlsText}>Angle: {orientation.angle.toFixed(2)}°</Text>
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderText}>Speed</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={3}
            step={1}
            value={2}
            renderStepNumber={true}
            onValueChange={setSpeed}
          />
        </View>
      </View>
      <View>
      <BrakeButton title={"Brake"} onPress={() => {
          console.log("Frenando");
         sendData(device, '9');
        }} />
        <ControlsButton title={"Drive"} onPress={() => {
          console.log(`Acelerando con intensidad: ${speed}`);
          sendData(device, `${speed + 2}`);
        }} />
      </View>
    </View>
  );
};

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Main" component={MainScreen} />
    <Stack.Screen name="Controls" component={ControlsScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const Colors = {
  primary: '#00a6ff',
  secondary: '#e6f4f1',
  background: '#0051b6',
};

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  title: {
    marginBottom: 16,
    fontSize: 50,
    fontWeight: '900',
    color: Colors.secondary,
    letterSpacing: 3,
  },
  button: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    padding: 20,
    fontSize: 1,
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: '900',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '60%',
    gap: 20,
  },
  modalTitle: {
    color: 'black',
    fontWeight: '600',
    fontSize: 20,
  },
  modalButton: {
    backgroundColor: Colors.background,
    color: Colors.primary,
    borderRadius: 10,
    padding: 9,
  },
  controls: {
    backgroundColor: '#00003f',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  controlsText: {
    color: 'white',
    fontSize: 18,
    marginVertical: 10,
  },
  controlsButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 70,
    fontSize: 1,
    minWidth: 150,
    minHeight: 150,
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  controlsButtonText: {
    color: Colors.primary,
    fontWeight: '900',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 'auto'
  },
  sliderContainer: {
    color: 'white',
    backgroundColor: 'white',
    paddingBottom: 20,
    borderRadius: 10,
  },
  controlsCenter: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '70%'
  },
  sliderText: {
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: '700'
  },
  direction: {
    fontSize: 30
  },
  controlsTitle: {
    backgroundColor: Colors.secondary,
    color: Colors.primary,
    fontSize: 30,
    fontWeight: '700',
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 2,
    padding: 5
  },
  brakeButton: {
    backgroundColor: 'gray',
    borderRadius: 70,
    fontSize: 1,
    minWidth: 100,
    minHeight: 100,
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  brakeButtonText: {
    color: 'black',
    fontWeight: '900',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 'auto'
  }
});