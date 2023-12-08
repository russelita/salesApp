import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FontSize, FontType } from '../utility';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const TextInputWithLabel = ({
  label,
  style,
  placeholder,
  placeholderTextColor,
  styleLabel,
  inputText,
  secureTextEntry,
  numberOfLines = 1,
  styleInput,
  editable = true,
  keyboardType = 'default',
  multiline = false,
  value,
  onChangeText,
}) => {
  const [eyesOpen, setEyesOpen] = useState(secureTextEntry);
  return (
    <View style={style}>
      <Text style={[styles.label, styleLabel]}>{label}</Text>
      <View style={{ height: 5 }} />
      <View
        style={[styles.inputText, { height: multiline ? 70 : 40 }, inputText]}>
        <TextInput
          placeholderTextColor={placeholderTextColor}
          placeholder={placeholder}
          multiline={multiline}
          numberOfLines={numberOfLines}
          secureTextEntry={eyesOpen}
          style={[
            {
              flex: 1,
              fontSize: FontSize.font12,
              textAlignVertical: 'top',
              fontFamily: FontType.robotoBold,
            },
            styleInput,
          ]}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          autoCapitalize='none'
        />
        {secureTextEntry != null ? (
          <FontAwesome5
            name={eyesOpen ? 'eye-slash' : 'eye'}
            size={18}
            color={COLORS.grey}
            onPress={() => setEyesOpen(!eyesOpen)}
          />
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

export default TextInputWithLabel;

const styles = StyleSheet.create({
  label: {
    fontFamily: FontType.poppinsMedium,
    textAlign: 'left',
    fontSize: FontSize.font14,
    color: COLORS.greenTema,
  },
  inputText: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: FontSize.font12,
    height: 40,
    lineHeight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
