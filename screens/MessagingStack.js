// File: /screens/MessagingStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MessagingScreen from './MessagingScreen';
import ChatScreen from './ChatScreen';

const Stack = createStackNavigator();

const MessagingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MessagingScreen" component={MessagingScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default MessagingStack;
