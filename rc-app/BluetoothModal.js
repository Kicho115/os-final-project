import React from 'react';
import { Modal, View, Text, Pressable, ActivityIndicator, FlatList, StyleSheet } from 'react-native';

const BluetoothConnectModal = ({ visible, onClose, devices, isScanning }) => {
  const renderDevice = ({ item }) => (
    <Pressable
      style={styles.deviceItem}
      onPress={() => console.log('Selected device:', item)}
    >
      <Text style={styles.deviceName}>{item.name || 'Unknown Device'}</Text>
      <Text style={styles.deviceAddress}>{item.address}</Text>
    </Pressable>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {isScanning ? 'Scanning devices...' : 'List of devices'}
          </Text>
          
          {isScanning && <ActivityIndicator size="large" color="#0051b6" />}
          
          <FlatList
            data={devices}
            renderItem={renderDevice}
            keyExtractor={item => item.address}
            style={styles.deviceList}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                {isScanning ? 'Scanning...' : '0 devices found'}
              </Text>
            }
          />

          <Pressable
            style={styles.modalButton}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  deviceList: {
    maxHeight: 300,
  },
  deviceItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deviceAddress: {
    fontSize: 14,
    color: '#666',
  },
  modalButton: {
    backgroundColor: '#0051b6',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    color: '#666',
  },
});

export default BluetoothConnectModal;