import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
  return (
    <View style={styles.mainScreen}>
      <Text style={styles.title}>Main Menu</Text>
      <ConnectButton />
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
  <Stack.Navigator>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    margin: 50,
    fontSize: 1,
  },
  buttonText: {
    color: 'blue',
    fontWeight: '900',
    fontSize: 20,
  }
});
