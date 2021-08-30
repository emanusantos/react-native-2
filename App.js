import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SignIn, CreateAccount, Profile, Home, Search, Details, Search2 } from './Components/Screens';

const Tabs = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();

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

export default () => (
  <NavigationContainer>
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
      <Tabs.Screen name="Search" component={SearchStackScreen} options={{ headerShown: false }} />
    </Tabs.Navigator>
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
)
