import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import AddChat from './AddChat';

const Stack = createStackNavigator();
const globalScreenOption={
  headerStyle:{backgroundColor:"#2c6bed"},
  headerTitleStyle:{color:"white",alignSelf:"center"},
  headerTintColor:"white",
}
export default function App() {
  return (
    <NavigationContainer >
        <Stack.Navigator  screenOptions={globalScreenOption}>
        <Stack.Screen  name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddChat" component={AddChat} />
        </Stack.Navigator>
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
});
