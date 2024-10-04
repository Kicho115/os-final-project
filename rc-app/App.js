import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable, Modal, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BluetoothConnectModal from './BluetoothModal';

const Stack = createStackNavigator();

const ConnectButton = (props) => {
  const { onPress, title = 'Connect Brokeneitor' } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const MainScreen = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.mainScreen}>
      <Text style={styles.title}>Brokeneitor</Text>
      <ConnectButton onPress={() => setIsModalVisible(true)} />
      <BluetoothConnectModal 
        visible={isModalVisible} 
        onClose={() => setIsModalVisible(false)}
      />
      <Button
        title="Go to Controls"
        onPress={() => navigation.navigate('Controls')}
      />
    </View>
  );
};

const ControlsScreen = ({navigation}) => (
  <View style={styles.layout}>
    <Text style={styles.title}>Controls</Text>
    <Button
      title="Go to Main menu"
      onPress={() => navigation.navigate('Main')}
    />
  </View>
);

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
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
    fontSize: 46,
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
  }
});
