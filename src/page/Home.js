import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Config from 'react-native-config';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { deleteToken } from '../redux/reducers/token';
import { BtnMenu } from '../svg';
import { COLORS, FontSize, FontType, FontWeight, matrics } from '../utility';
import { TextInputOnly } from '../widget';

function Home({ navigation: { navigate }, route }) {
  const [keyword, setKeyword] = useState('');
  const [date, setDate] = useState('');
  const [orderList, setOrderList] = useState([]);
  const token = useSelector(state => state.tokenReducer.token);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [modalLogout, setModalLogout] = useState(false);

  useEffect(() => {
    getListOrder();
  }, []);

  const getListOrder = async () => {
    try {
      let response = await axios.get(`${Config.BASE_URL}/Order/GetOrderList`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      const data = response.data;
      console.log('data', data);
      setOrderList(data);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      console.log('error', JSON.stringify(error));
      console.log(
        'Cek Error=======DATA LOAD=================',
        JSON.parse(JSON.stringify(error)).message,
      );
    }
  };

  const _refreshData = async () => {
    setRefreshing(true);
    getListOrder();
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.formAvatar}>
            <Image
              style={styles.avatarImage}
              source={require('../images/avatar_male.jpg')}
            />
          </View>
          <BtnMenu
            onPress={() => setModalLogout(true)}
            width={50}
            height={50}
          />
        </View>
        <View style={{ height: matrics.height * 0.02 }} />
        <Text style={styles.textTitle}>{'Sales Order List'}</Text>
      </View>
      <View style={styles.boxContainer}>
        <View style={{ height: 20 }} />
        <View
          style={{
            paddingHorizontal: matrics.width * 0.05,
            borderColor: COLORS.black,
            borderWidth: 0.3,
            width: matrics.width * 0.9,
            borderRadius: 20,
          }}>
          <View style={{ height: 20 }} />
          <Text style={[styles.textNormal, { fontSize: FontSize.font14 }]}>
            {'Search'}
          </Text>
          <View style={{ height: 20 }} />
          <TextInputOnly
            placeholder={'Keyword'}
            placeholderTextColor={COLORS.grey}
            style={{ width: '100%' }}
            value={keyword}
            onChangeText={keyword => setKeyword(keyword)}
          />
          <View style={{ height: 20 }} />
          <TextInputOnly
            placeholder={'Order Date'}
            placeholderTextColor={COLORS.grey}
            style={{ width: '100%' }}
            value={date}
            calendar={true}
            onChangeText={date => setDate(date)}
          />
          <View style={{ height: 20 }} />
        </View>
        <View style={{ height: 20 }} />
        <View
          style={{
            flexDirection: 'row',
            width: matrics.width * 0.9,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[styles.textNormal, { fontSize: FontSize.font18 }]}>
            {'Order List'}
          </Text>
          <Text style={styles.textNormal}>{'Total Items'}</Text>
        </View>
        <View style={{ height: 20 }} />
        <TouchableWithoutFeedback onPress={() => navigate('DataProduct')}>
          <View
            style={{
              width: matrics.width * 0.2,
              backgroundColor: COLORS.greenTema,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              alignSelf: 'flex-start',
              marginLeft: matrics.width * 0.05,
              paddingVertical: 4,
            }}>
            <Text style={[styles.textNormal, { color: COLORS.white }]}>
              {'Add'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ height: 20 }} />
        <View style={{ height: matrics.screenHeight }}>
          <FlatList
            style={{ flex: 1, marginVertical: 10 }}
            data={orderList}
            refreshing={refreshing}
            onRefresh={_refreshData}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            ItemSeparatorComponent={() => (
              <View style={{ height: 0.5, marginVertical: 5 }} />
            )}
            ListFooterComponent={() => <View style={{ height: 10 }} />}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: FontWeight.bold,
                    fontSize: FontSize.font18,
                    color: COLORS.black,
                  }}>
                  Belum Ada Data
                </Text>
              </View>
            )}
            renderItem={({ item, index }) => {
              return (
                <View
                  key={index}
                  style={{
                    paddingHorizontal: matrics.width * 0.05,
                    borderColor: COLORS.black,
                    width: matrics.width * 0.9,
                    borderRadius: 6,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,

                    elevation: 3,
                    backgroundColor: COLORS.white,
                    marginBottom: 15,
                    alignItems: 'center',
                  }}>
                  <Text>{item.CustomerName}</Text>
                  <Text>{item.OrderNo}</Text>
                  <Text>{moment(item.OrderDate).format('DD/MM/YYYY')}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
      {/* modal Logout */}
      <Modal
        animationType="fade"
        visible={modalLogout}
        avoidKeyboard
        onRequestClose={() => {
          setModalLogout(!modalLogout);
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#rgba(0, 0, 0, 0.5)',
            margin: -20,
          }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 10,
              paddingVertical: matrics.height * 0.05,
              width: matrics.width * 0.9,
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign
              name={'logout'}
              size={200}
              color={COLORS.black}
            />
            <View style={{ height: 20 }} />
            <Text>{'Are u sure you wants to logout ?'}</Text>
            <View style={{ height: 50 }} />
            <View style={{ flexDirection: 'row' }}>
              <TouchableWithoutFeedback onPress={() => dispatch(deleteToken())}>
                <View
                  style={{
                    width: matrics.width * 0.3,
                    backgroundColor: COLORS.greenTema,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    alignSelf: 'flex-start',
                    marginLeft: matrics.width * 0.05,
                    paddingVertical: 4,
                  }}>
                  <Text style={[styles.textNormal, { color: COLORS.white }]}>
                    {'Yes'}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  setModalLogout(false);
                }}>
                <View
                  style={{
                    width: matrics.width * 0.3,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    alignSelf: 'flex-start',
                    marginLeft: matrics.width * 0.05,
                    paddingVertical: 4,
                    borderWidth: 0.6,
                    borderColor: COLORS.black,
                  }}>
                  <Text style={[styles.textNormal, { color: COLORS.black }]}>
                    {'No'}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: matrics.screenWidth,
    height: matrics.screenHeight,
    backgroundColor: COLORS.greenTema,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    width: matrics.screenWidth,
    paddingHorizontal: matrics.width * 0.05,
    marginTop: matrics.height * 0.02,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  formAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
  },
  textTitle: {
    fontFamily: FontType.poppinsMedium,
    fontSize: FontSize.font32,
    color: COLORS.white,
  },
  boxContainer: {
    backgroundColor: COLORS.white,
    width: matrics.screenWidth,
    height: matrics.screenHeight,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
  textNormal: {
    fontFamily: FontType.robotoMedium,
    fontSize: FontSize.font12,
    color: COLORS.black,
  },
});
