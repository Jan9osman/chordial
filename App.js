import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; 

// Import your existing screens
import ProfileScreen from './screens/ProfileScreen'; 

// Screens (Placeholder components for other tabs)
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

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
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
    backgroundColor: '#fff', // White background for the tab bar
    borderTopWidth: 1,
    borderTopColor: '#ddd', // Light gray border
    paddingBottom: 5,
    paddingTop: 5,
  },
});

export default App;
