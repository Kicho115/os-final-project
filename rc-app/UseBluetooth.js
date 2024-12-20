import { useState, useCallback } from 'react';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { PermissionsAndroid, Platform } from 'react-native';

export const handleConnection = async (device, navigation) => {
  if (!navigation || typeof navigation.navigate !== 'function') {
    console.error('Navigation object is not available');
    return;
  }

  try {
    const isPaired = device.bonded;
    if (!isPaired) {
      console.log('Device is not paired, attempting to pair...');
      const paired = await pairDevice(device.address);
      if (!paired) {
        console.error('Failed to pair device.');
        return;
      }
    }

    console.log('Connecting to device...');
    const connection = await connectToDevice(device);
    if (connection) {
      console.log('Connected to device successfully.');
      navigation.navigate('Controls', { device });
    } else {
      console.error('Failed to connect to the device.');
    }
  } catch (error) {
    console.error('Error handling connection:', error);
  }
};

export const connectToDevice = async (device) => {
  try {
    const isConnected = await device.isConnected();
    if (isConnected) {
      console.log('Already connected to the device');
      return;
    }

    const connection = await device.connect();
    console.log('Connected to device:', connection);

    return connection;
  } catch (error) {
    console.error('Error connecting to device:', error);
  }
};

export const pairDevice = async (device) => {
  try {
    await device.pair();
  } catch (error) {
    console.error('Error pairing with device:', error);
  }
};

export const sendData = async (device, data) => {
  try {
    const isConnected = await device.isConnected();
    if (!isConnected) {
      console.error('The device is not conected');
      return;
    }

    const uint8Data = new Uint8Array([parseInt(data)]);

    await device.write(data);
    console.log('Data sent:', data);
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

function useBluetooth() {
  const [allDevices, setAllDevices] = useState([]);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [error, setError] = useState(null);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location permission',
            message: 'Bluetooth requires access to your location',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.error('Permission request error:', err);
        return false;
      }
    }
    return true;
  };

  const scanForDevices = useCallback(async () => {
    if (isDiscovering) {
      console.log('Already scanning...');
      return;
    }

    try {
      setError(null);
      
      const granted = await requestPermissions();
      if (!granted) {
        throw new Error('Location permission not granted');
      }

      setIsDiscovering(true);
      
      // Clean previous devices
      setAllDevices([]);
      
  
      const unpairedDevices = await RNBluetoothClassic.startDiscovery();
      
      setAllDevices(unpairedDevices);

    } catch (err) {
      console.error('Error discovering devices:', err);
      setError(err.message);
    } finally {
      setIsDiscovering(false);
    }
  }, [isDiscovering]);

  return {
    allDevices,
    isDiscovering,
    error,
    scanForDevices,
  };
}

export default useBluetooth;