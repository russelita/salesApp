import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInputWithLabel, Button } from '../../widget';
import { COLORS, FontSize, FontType, FontWeight, matrics } from '../../utility';
import Toast from 'react-native-toast-message';
import FetchLoading from '../../widget/FetchLoading';
import axios from 'axios';
import Config from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
import { addToken } from '../../redux/reducers/token';

const Login = () => {
  const [dataForm, setDataForm] = useState({ username: '', password: '' });
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  /**
   * @description Check from mapping {userDB} when dataForm.username and dataForm.password is same as userDb
   * @return object user and add to function Authcontext.login()
   * @return function Toast and show success notification
   */

  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const doLogin = async () => {
    setFetching(true);
    console.log('do Login');
    const formData = {
      username: dataForm.username,
      password: dataForm.password,
      grant_type: 'client_credentials',
      client_id: 'profes-api',
      client_secret: 'P@ssw0rd'
    };
    console.log('formDatabase', Config.BASE_URL);
    try {
      let response = await axios.post(
        `${Config.BASE_URL}/token`,
        formData,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      const data = response.data;
      const result = {
        ...data,
        stateToken: makeid(5),
      }
      console.log('data', result);
      dispatch(addToken(result));
      setFetching(false);
    } catch (error) {
      setFetching(false);
      console.log('error', JSON.stringify(error));
      console.log(
        'Cek Error=======DATA LOAD=================',
        JSON.parse(JSON.stringify(error)).message,
      );
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <View style={{ height: matrics.height * 0.15 }} />
        <Text
          style={{
            fontFamily: FontType.poppinsSemiBold,
            fontSize: FontSize.font22,
            color: COLORS.greenTema,
          }}>
          Login
        </Text>
      </View>
      <View style={{ flex: 2, width: matrics.width * 0.8 }}>
        <TextInputWithLabel
          label={'Username'}
          placeholder={'Masukkan Username'}
          placeholderTextColor={COLORS.grey}
          style={{ width: '100%' }}
          value={dataForm.username}
          onChangeText={username => setDataForm({ ...dataForm, username })}
        />
        <View style={{ height: 10 }} />
        <TextInputWithLabel
          label={'Password'}
          placeholder={'Masukkan Password'}
          placeholderTextColor={COLORS.grey}
          style={{ width: '100%' }}
          value={dataForm.password}
          secureTextEntry={true}
          onChangeText={password => setDataForm({ ...dataForm, password })}
        />
        <View style={{ height: 20 }} />
        <Button
          label={'Login'}
          style={{ minWidth: 150 }}
          disabled={
            dataForm.username != '' && dataForm.password != '' ? false : true
          }
          onPress={doLogin}
        />
      </View>
      <View style={{ height: 20 }} />
      <FetchLoading visible={fetching} />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
