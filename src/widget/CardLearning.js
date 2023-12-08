import { Platform, Pressable, StyleSheet, View, Image } from 'react-native';
import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Text,
  Portal,
  Dialog,
  Divider,
} from 'react-native-paper';
import { COLORS, FontSize, FontType, matrics } from '../utility';
import FetchLoading from '../widget/FetchLoading';
import Toast from 'react-native-toast-message';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CardLearning = ({
  pressCard,
  item,
  array,
  index,
  doDelete,
  visible,
  hideDialog,
}) => {
  return (
    <>
      <Pressable
        onPress={pressCard}
        style={{
          width: matrics.width * 0.9,
          padding: 10,
          backgroundColor: COLORS.white,
          borderRadius: 3,
          borderColor: COLORS.black,
          borderWidth: 0.1,
          overflow: 'hidden',
          marginBottom: 10,
        }}>
        {/* <View style={{ position: 'absolute', right: 0, width: matrics.width * 0.4, height: '100%' }}>
          <Card.Cover
            style={{ width: '100%', height: '100%' }}
            resizeMode='cover'
            source={{ uri: item.image }}
          />
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.cardTitle}>{item.className}</Text>
          {item.listStudent.length == 0 &&
            AuthContext.user.role !== 'Siswa' && (
              <MaterialCommunityIcons
                onPress={hideDialog}
                size={15}
                color={COLORS.red}
                name="delete"
              />
            )}
        </View>
        <View style={{ height: 5 }} />
        <Divider />
        <View style={{ height: 10 }} />
        <View style={{ height: 40 }}>
          <Text style={[styles.cardBody, { opacity: 0.8 }]} numberOfLines={2} variant="bodyMedium">
            {item.deskripsi}
          </Text>
        </View>
        <Text style={styles.cardBody} variant="titleLarge">
          {item.createdBy}
        </Text>
        {item.listStudent.length > 0 && (
          <>
            <View style={{ height: 5 }} />
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome5 size={18} color={COLORS.grey} name="user-friends" />
              <View style={{ width: 5 }} />
              <Text
                style={styles.cardBody}
                numberOfLines={1}
                variant="bodyMedium">
                {item.listStudent.length}
              </Text>
            </View>
          </>
        )}
      </Pressable>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{'Attention'}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              {'Do you want to delete this classroom ? '}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>{'Cancel'}</Button>
            <Button onPress={() => doDelete(item)}>{'OK'}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default CardLearning;

const styles = StyleSheet.create({
  cardTitle: {
    color: COLORS.black,
    fontFamily: FontType.poppinsSemiBold,
    fontSize: FontSize.font18,
  },
  cardBody: {
    color: COLORS.black,
    fontFamily: FontType.robotoRegular,
    fontSize: FontSize.font15,
  },
});
