import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NoteListScreen from './NoteListScreen';
import NoteDetailScreen from './NoteDetailScreen';
// import { library } from '@fortawesome/fontawesome-svg-core';

import RootNavigation from './RootNavigation'; // Import RootNavigation

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // Hide splash screen here if needed
  }, []);

  return (
    <NavigationContainer ref={RootNavigation.setTopLevelNavigator}>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName="NoteList">
        <Stack.Screen
          name="NoteList"
          component={NoteListScreen}
          options={{ title: '', headerTitleStyle: { display: 'none' } }}
        />
        <Stack.Screen
          name="NoteDetail"
          component={NoteDetailScreen}
          options={{ title: '', headerTitleStyle: { display: 'none' } }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
