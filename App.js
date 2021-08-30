import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SignIn, CreateAccount, Profile, Home, Search, Details, Search2, Splash } from './Components/Screens';

const Tabs = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Details" component={Details} options={({ route }) => ({ title: route.params.name })} />
  </HomeStack.Navigator>
);

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
    <Tabs.Screen name="Search" component={SearchStackScreen} options={{ headerShown: false }} />
  </Tabs.Navigator>
);

const Drawer = createDrawerNavigator();

export default () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, []);

  if (isLoading) {
    return <Splash />
  };

  return (
    <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabsScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Profile" component={ProfileStackScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
    {/* <AuthStack.Navigator>
      <AuthStack.Screen 
        name="SignIn" 
        component={SignIn} 
        options={{ title: "Sign In" }} 
      />
      <AuthStack.Screen 
        name="CreateAccount" 
        component={CreateAccount} 
        options={{ title: "Create Account" }} 
      />
    </AuthStack.Navigator> */}
    </NavigationContainer>
  );
}
