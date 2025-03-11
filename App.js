import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; 

// Import your screens
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

// Placeholder components for other tabs
const MessagingScreen = () => (
  <View style={styles.screen}>
    <Text>Messaging</Text>
  </View>
);

const LiveScreen = () => (
  <View style={styles.screen}>
    <Text>Live/Communities</Text>
  </View>
);

const FeedScreen = () => (
  <View style={styles.screen}>
    <Text>Feed</Text>
  </View>
);

const NotificationsScreen = () => (
  <View style={styles.screen}>
    <Text>Notifications</Text>
  </View>
);

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab navigator component
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Assign icons based on the route name
          if (route.name === 'Feed') {
            iconName = 'home'; 
          } else if (route.name === 'Live') {
            iconName = 'videocamera'; 
          } else if (route.name === 'Messaging') {
            iconName = 'message1'; 
          } else if (route.name === 'Notifications') {
            iconName = 'bells';
          } else if (route.name === 'Profile') {
            iconName = 'user'; 
          } 

          // Return the icon component
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0554fe', 
        tabBarInactiveTintColor: '#666', 
        tabBarStyle: styles.tabBar,
        tabBarLabel: '', 
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Live" component={LiveScreen} />
      <Tab.Screen name="Messaging" component={MessagingScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen 
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

// Main App component
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="MainApp" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingBottom: 5,
    paddingTop: 5,
  },
});

export default App;