import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';
import { FontSize, FontWeight, COLORS } from '../utility';

const Button = ({
  label,
  onPress = () => { },
  style,
  styleLabel,
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: disabled ? COLORS.greenPoin : COLORS.greenTema },
        style,
      ]}
      disabled={disabled}>
      <Text
        style={[
          styles.styleLabel,
          { color: disabled ? COLORS.black : COLORS.white },
          styleLabel,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.gold,
    borderRadius: 10,
    alignItems: 'center',
  },
  styleLabel: { fontWeight: FontWeight.semi, fontSize: FontSize.font14 },
});
