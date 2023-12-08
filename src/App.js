import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/configureStore';
import { Router } from './router';
import { COLORS, FontSize, FontType, FontWeight, matrics } from './utility';
import { NavigationContainer } from '@react-navigation/native';

// function call toast message
const toastConfig = {
  success: (props) => {
    // console.log(props)
    return <View style={{ minWidth: 197, alignSelf: "center", borderColor: COLORS.blue, backgroundColor: COLORS.blue, borderWidth: 1, borderRadius: 15, paddingVertical: 10, paddingHorizontal: 20, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontFamily: FontType.poppinsRegular, color: "#FFFFFF", fontSize: FontSize.font14 }}>{props.text1}</Text>
    </View>
  },
  successTop: (props) => {
    // console.log(props)
    return <View style={{ minWidth: 197, alignSelf: "center", borderColor: COLORS.blue, backgroundColor: COLORS.blue, borderWidth: 1, borderRadius: 15, paddingVertical: 10, paddingHorizontal: 20, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontFamily: FontType.poppinsRegular, color: COLORS.white, fontSize: FontSize.font14 }}>{props.text1}</Text>
    </View>
  },
  error: (props) => {
    // console.log(props)
    return <View style={{ minWidth: 197, alignSelf: "center", borderColor: COLORS.red, backgroundColor: COLORS.red, borderWidth: 1, borderRadius: 15, paddingVertical: 10, paddingHorizontal: 20, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontFamily: FontType.poppinsRegular, color: COLORS.white, fontSize: FontSize.font14 }}>{props.text1}</Text>
      <Text style={{ fontFamily: FontType.robotoRegular, color: COLORS.white, fontSize: FontSize.font12 }}>{props.text2}</Text>
    </View>
  },
};

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </PersistGate>
        <Toast config={toastConfig} />
      </Provider>
    </SafeAreaProvider>
  );
};
export default App;