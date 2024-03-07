import React, { useCallback } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { propsNavigationStack } from '../@types';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';



import Navigation from './Components/Navigation';
import Home from './App/Home';
import AddTasks from './App/AddTasks';
import { SafeAreaView } from 'react-native';
import Header from './Components/Header';
import CompletedTasks from './App/CompletedTasks';
import ListOneTask from './App/listOneTask';
import CalendarHome from './App/CalendarHome';
import UserProvider from './context/UserContext';


export default function Router () {


    const [fontsLoaded] = useFonts({
        'WorkSans_VariableFont_wght': require('../assets/fonts/WorkSans-VariableFont_wght.ttf'),
        'WorkSans_VariableFont_Bold': require('../assets/fonts/WorkSans-Bold.ttf'),
    });

    const { 
        Navigator, Screen
    } = createNativeStackNavigator<propsNavigationStack>();

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
  
    return (
        <SafeAreaView 
            style={{ flex: 1 }} 
            onLayout={onLayoutRootView}>

            <NavigationContainer>
                <UserProvider>
                
                    <Header />
                        
                    <Navigator
                        screenOptions={{
                            headerShown: false,
                            animation: 'none',
                            statusBarColor: '#f9f7f0',
                            navigationBarColor: 'transparent',
                            statusBarStyle: 'dark'
                        }}>

                        <Screen 
                            name="CalendarHome" 
                            component={CalendarHome}
                        />

                        <Screen 
                            name="AddTasks" 
                            component={AddTasks}
                        />

                        <Screen 
                            name="Home"
                            component={Home}
                        />

                        <Screen 
                            name="ListOneTask" 
                            component={ListOneTask}
                        />
                    
                        <Screen 
                            name="CompletedTasks" 
                            component={CompletedTasks}
                        />

                    </Navigator>
                
                    <Navigation />
      
                </UserProvider>
            </NavigationContainer>

        </SafeAreaView>
    );
}