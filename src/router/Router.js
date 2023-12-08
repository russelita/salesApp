import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../page/authPage';
import Home from '../page/Home';
import DataProduct from '../page/DataProduct';
import { useDispatch, useSelector } from 'react-redux'

const Stack = createNativeStackNavigator();

function Router() {
  const token = useSelector(state => state.tokenReducer.token);
  console.log('token', token);
  return (
    <Stack.Navigator>
      {token == null ? (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DataProduct"
            component={DataProduct}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default Router;

const styles = StyleSheet.create({});
