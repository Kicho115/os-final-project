import React from "react";
import { Text, View, Pressable, Modal, StyleSheet } from 'react-native';

const BluetoothConnectModal = ({visible, onClose}) => {
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>List of devices</Text>
            <Pressable style={styles.modalButton} onPress={onClose}>
              <Text style={{color: 'white', fontWeight: '600'}}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>)
  };

export default BluetoothConnectModal;

const Colors = {
    primary: '#00a6ff',
    secondary: '#e6f4f1',
    background: '#0051b6',
  };
  
  const styles = StyleSheet.create({
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
    }
  });