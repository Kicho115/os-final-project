import { useState, useCallback } from 'react';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { PermissionsAndroid, Platform } from 'react-native';

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
      
      // Limpiar dispositivos anteriores
      setAllDevices([]);
      
      // Iniciar búsqueda
      const unpairedDevices = await RNBluetoothClassic.startDiscovery();
      console.log('Dispositivos encontrados:', unpairedDevices);
      
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
    scanForDevices
  };
}

export default useBluetooth;