import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from 'constants/routes';

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      {routes.map((item, index) => {
        // const ItemComponent = item.protected
        //   ? ProtectedScreen(item.component)
        //   : item.component;
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{ headerShown: false, animation: item.animation }}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default StackNavigation;
