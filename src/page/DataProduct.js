import axios from 'axios';
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
import uuid from 'react-native-uuid';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useDispatch, useSelector } from 'react-redux';
import { deleteToken } from '../redux/reducers/token';
import { BtnMenu } from '../svg';
import { COLORS, FontSize, FontType, FontWeight, matrics } from '../utility';
import { TextInputOnly, TextInputWithLabel } from '../widget';

const initialState = {
  item: '',
  price: '',
  qty: 0,
  total: 0,
};

function DataProduct({ navigation: { navigate, goBack }, route }) {
  const [keyword, setKeyword] = useState('');
  const [date, setDate] = useState('');
  const [dataForm, setDataForm] = useState({
    orderNumber: '',
    orderDate: '',
    type: '',
    address: '',
  });
  const [dataEdit, setDataEdit] = useState({
    item: '',
    price: '',
    qty: 1,
    total: 0,
  });
  const [orderList, setOrderList] = useState([]);
  const token = useSelector(state => state.tokenReducer.token);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);
  const [dataDelete, setDataDelete] = useState('');

  useEffect(() => {
    getListOrder();
  }, []);

  const getListOrder = async () => {
    try {
      let response = await axios.get(`${Config.BASE_URL}/Order/GetItems`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token.access_token}`,
          State: '12345',
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

  const handlePlus = value => {
    let result = value + 1;
    let total = result * dataEdit.price;
    setDataEdit({ ...dataEdit, qty: result, total: total });
  };

  const handleMinus = value => {
    if (value == 1) {
      return;
    }
    let result = value - 1;
    let total = result * dataEdit.price;
    setDataEdit({ ...dataEdit, qty: result, total: total });
  };

  useEffect(() => {
    if (dataEdit.qty > 0) {
      let total = dataEdit.price * dataEdit.qty;
      setDataEdit({ ...dataEdit, total: total });
    } else {
      setDataEdit({ ...dataEdit, total: dataEdit.price });
    }
  }, [dataEdit.price]);

  const handleSaveData = async () => {
    const formData = {
      ItemName: dataEdit.item.toString(),
      Price: dataEdit.price.toString(),
      Quantity: dataEdit.qty.toString(),
      OrderId: uuid.v4(),
      ItemId: uuid.v4(),
    };
    try {
      let response = await axios.post(`${Config.BASE_URL}/Order/CreateItem`, {
        formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token.access_token}`,
          State: '12345',
        },
      });
      const data = response.data;
      console.log('data', data);
      setModalEdit(false);
      getListOrder();
      setRefreshing(false);
    } catch (error) {
      setModalEdit(false);
      setRefreshing(false);
      console.log('error', JSON.stringify(error));
      console.log(
        'Cek Error=======DATA LOAD=================',
        JSON.parse(JSON.stringify(error)).message,
      );
    }
  };

  const handleDelete = async () => {
    try {
      let response = await axios.post(`${Config.BASE_URL}/Order/DeleteItem`, {
        dataDelete,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token.access_token}`,
          State: '12345',
        },
      });
      const data = response.data;
      console.log('data', data);
      setDataDelete('');
      setModalDelete(false);
      getListOrder();
      setRefreshing(false);
    } catch (error) {
      setDataDelete('');
      setModalDelete(false);
      setRefreshing(false);
      console.log('error', JSON.stringify(error));
      console.log(
        'Cek Error=======DATA LOAD=================',
        JSON.parse(JSON.stringify(error)).message,
      );
    }
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
        <Text style={styles.textTitle}>{'Sales Order Input'}</Text>
      </View>
      <View style={styles.boxContainer}>
        <View style={{ height: matrics.screenHeight }}>
          <FlatList
            style={{ flex: 1, marginVertical: 10 }}
            data={orderList}
            refreshing={refreshing}
            onRefresh={_refreshData}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
            ItemSeparatorComponent={() => (
              <View style={{ height: 0.5, marginVertical: 5 }} />
            )}
            ListHeaderComponent={() => (
              <>
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
                  <Text
                    style={[styles.textNormal, { fontSize: FontSize.font14 }]}>
                    {'Sales Information'}
                  </Text>
                  <View style={{ height: 20 }} />
                  <TextInputOnly
                    placeholder={'Sales Order Number'}
                    placeholderTextColor={COLORS.grey}
                    style={{ width: '100%' }}
                    value={dataForm.orderNumber}
                    onChangeText={orderNumber =>
                      setDataForm({ ...dataForm, orderNumber })
                    }
                  />
                  <View style={{ height: 20 }} />
                  <TextInputOnly
                    placeholder={'Sales Order Date'}
                    placeholderTextColor={COLORS.grey}
                    style={{ width: '100%' }}
                    value={dataForm.orderDate}
                    calendar={true}
                    onChangeText={orderDate =>
                      setDataForm({ ...dataForm, orderDate })
                    }
                  />
                  <View style={{ height: 20 }} />
                  <TextInputOnly
                    placeholder={'Customer'}
                    placeholderTextColor={COLORS.grey}
                    style={{ width: '100%' }}
                    value={dataForm.type}
                    dropdown={true}
                    onChangeText={type => setDataForm({ ...dataForm, type })}
                  />
                  <View style={{ height: 20 }} />
                  <TextInputOnly
                    placeholder={'Address'}
                    placeholderTextColor={COLORS.grey}
                    style={{ width: '100%' }}
                    value={dataForm.address}
                    multiline={true}
                    onChangeText={address =>
                      setDataForm({ ...dataForm, address })
                    }
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
                  <Text
                    style={[styles.textNormal, { fontSize: FontSize.font18 }]}>
                    {'Detail Sales'}
                  </Text>
                  <TouchableWithoutFeedback onPress={() => setModalEdit(true)}>
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
                        {'Add Item'}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={{ height: 20 }} />
              </>
            )}
            ListFooterComponent={() => (
              <>
                {orderList.length > 0 && (
                  <View
                    style={{
                      backgroundColor: COLORS.white,
                      marginHorizontal: -20,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                    }}>
                    <Text style={styles.textNormal}>{'Order Summary'}</Text>
                    <View style={{ height: 20 }} />
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.textNormal}>{'Sub Total'}</Text>
                        <Text style={styles.textNormal}>{'12.000.000'}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.textNormal}>{'Total Product'}</Text>
                        <Text style={styles.textNormal}>{'6 Product'}</Text>
                      </View>
                    </View>
                    <View style={{ height: 20 }} />
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                      <TouchableWithoutFeedback onPress={() => goBack()}>
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
                          <Text
                            style={[styles.textNormal, { color: COLORS.white }]}>
                            {'Process Order'}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback onPress={() => { }}>
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
                          <Text
                            style={[styles.textNormal, { color: COLORS.black }]}>
                            {'Cancel'}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                )}
              </>
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height:
                    orderList.length > 0
                      ? matrics.screenHeight - matrics.height * 0.86
                      : matrics.screenHeight - matrics.height * 0.65,
                  elevation: 2,
                  backgroundColor: COLORS.white,
                  marginHorizontal: -20,
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
                  <View style={{ alignItems: 'center' }}>
                    <Text>{`Barang ${index + 1}`}</Text>
                    <Text>{item.ItemName}</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text>{'QTY'}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: COLORS.grey3,
                        width: matrics.width * 0.18,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: 8,
                      }}>
                      <FontAwesome6
                        name={'circle-minus'}
                        size={18}
                        color={COLORS.white}
                      />
                      <Text style={styles.textNormal}>{item.Quantity}</Text>
                      <FontAwesome6
                        name={'circle-plus'}
                        size={18}
                        color={COLORS.white}
                      />
                    </View>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text>{'Total'}</Text>
                    <Text>{item.Price}</Text>
                  </View>
                  <FontAwesome6
                    onPress={() => {
                      let result = 0
                      if (item.Quantity > 0) {
                        result = Number(item.Price) * Number(item.Quantity)
                      } else {
                        result = Number(item.Price)
                      }
                      setDataEdit({
                        item: item.ItemName,
                        price: Number(item.Price),
                        qty: Number(item.Quantity),
                        total: result,
                      })
                      setModalEdit(true);
                    }}
                    name={'pencil'}
                    size={18}
                    color={COLORS.black}
                  />
                  <AntDesign
                    onPress={() => {
                      setDataDelete(item);
                      setModalDelete(true);
                    }}
                    name={'delete'}
                    size={18}
                    color={COLORS.black}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
      {/* modal Edit */}
      <Modal
        animationType="fade"
        visible={modalEdit}
        avoidKeyboard
        onRequestClose={() => {
          setModalEdit(!modalEdit);
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
            <Text>{'New Item'}</Text>
            <View style={{ height: 50 }} />
            <TextInputWithLabel
              label={'Item Name'}
              placeholder={'Masukkan Nama Barang'}
              placeholderTextColor={COLORS.grey}
              style={{ width: '100%' }}
              value={dataEdit.item}
              onChangeText={item => setDataEdit({ ...dataEdit, item })}
            />
            <View style={{ height: 10 }} />
            <TextInputWithLabel
              label={'Item Name'}
              placeholder={'Masukkan Harga Barang'}
              keyboardType={'numeric'}
              placeholderTextColor={COLORS.grey}
              style={{ width: '100%' }}
              value={dataEdit.price}
              onChangeText={price => setDataEdit({ ...dataEdit, price })}
            />
            <View style={{ height: 10 }} />
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
              <Text>{'QTY'}</Text>
              <View style={{ width: 25 }} />
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.grey3,
                  width: matrics.width * 0.18,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 8,
                }}>
                <FontAwesome6
                  name={'circle-minus'}
                  size={18}
                  color={COLORS.white}
                  onPress={() => handleMinus(dataEdit.qty)}
                />
                <Text style={styles.textNormal}>{dataEdit.qty}</Text>
                <FontAwesome6
                  name={'circle-plus'}
                  size={18}
                  color={COLORS.white}
                  onPress={() => handlePlus(dataEdit.qty)}
                />
              </View>
            </View>
            <View style={{ height: 10 }} />
            <View
              style={{
                width: matrics.width * 0.8,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.textNormal}>{'Total : '}</Text>
              <Text style={styles.textNormal}>{dataEdit.total}</Text>
            </View>
            <View style={{ height: 50 }} />
            <View style={{ flexDirection: 'row' }}>
              <TouchableWithoutFeedback onPress={() => handleSaveData()}>
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
                    {'Save'}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  setModalEdit(false);
                  setDataEdit(initialState);
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
                    {'Cancel'}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </Modal>
      {/* modal Delete */}
      <Modal
        animationType="fade"
        visible={modalDelete}
        avoidKeyboard
        onRequestClose={() => {
          setModalDelete(!modalDelete);
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
            <FontAwesome5
              name={'question-circle'}
              size={200}
              color={COLORS.red}
            />
            <View style={{ height: 20 }} />
            <Text>{'Are u sure you wants to delete this item ?'}</Text>
            <View style={{ height: 50 }} />
            <View style={{ flexDirection: 'row' }}>
              <TouchableWithoutFeedback onPress={() => handleDelete()}>
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
                  setDataDelete('');
                  setModalDelete(false);
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

export default DataProduct;

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
