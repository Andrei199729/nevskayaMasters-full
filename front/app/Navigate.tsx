import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../ui/screens/LoginScreen';
import RegisterScreen from '../ui/screens/RegisterScreen';
import RestorePasswordScreen from '../ui/screens/RestorePasswordScreen';
import SuccessScreen from '../ui/screens/SuccessScreen';
import NewPasswordScreen from '../ui/screens/NewPasswordScreen';
import Main from '../ui/components/Main/Main';
import React, {useEffect} from 'react';
import FilterPopup from '../ui/components/FilterPopup/FilterPopup';
import SearchPopup from '../ui/components/SearchPopup/SearchPopup';
import CreateProjectScreen from '../ui/screens/CreateProjectScreen';
import PrivacyPolicy from '../ui/components/PrivacyPolicy/PrivacyPolicy';
import UnwrappedProductScreen from '../ui/screens/UnwrappedProductScreen';
import FormDataAddProductScreen from '../ui/screens/FormDataAddProductScreen';
import ProductScreen from '../ui/screens/ProductScreen';
import SplashScreen from '../ui/components/SplashScreen/SplashScreen';
const Stack = createStackNavigator();

function Navigate({isAuthenticated}: any) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="SplashScreen"
          component={SplashScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="RestorePassword"
          component={RestorePasswordScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Success"
          component={SuccessScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="NewPassword"
          component={NewPasswordScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Main"
          component={Main}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Filter"
          component={FilterPopup}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Search"
          component={SearchPopup}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="CreateProject"
          component={CreateProjectScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Policy"
          component={PrivacyPolicy}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="UnwrappedProduct"
          component={UnwrappedProductScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="FormDataAddProduct"
          component={FormDataAddProductScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Product"
          component={ProductScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigate;
