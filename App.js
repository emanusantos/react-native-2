import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AuthContext } from './Components/Context';

import { SignIn, CreateAccount, Profile, Home, Search, Details, Search2, Splash } from './Components/Screens';

const Tabs = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
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
  </AuthStack.Navigator>
);

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
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Profile">
    <Drawer.Screen name="Home" component={TabsScreen} options={{ headerShown: false }} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} options={{ headerShown: false }} />
  </Drawer.Navigator>
);

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator>
    {!userToken ? (
      <RootStack.Screen name="Auth" component={AuthStackScreen} options={{ headerShown: false, animationEnabled: false }} />
    ) : (
      <RootStack.Screen name="App" component={DrawerScreen} options={{ headerShown: false, animationEnabled: false }} />
    ) }
  </RootStack.Navigator>
);

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken('asdf');
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('asdf');
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      }
    };
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, []);

  if (isLoading) {
    return <Splash />
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
