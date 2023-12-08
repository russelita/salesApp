import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const matrics = {
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
    width,
    height,
};

const FontSize = {
    font10: matrics.screenWidth * (10 / 375),
    font11: matrics.screenWidth * (11 / 375),
    font12: matrics.screenWidth * (12 / 375),
    font13: matrics.screenWidth * (13 / 375),
    font14: matrics.screenWidth * (14 / 375),
    font16: matrics.screenWidth * (16 / 375),
    font18: matrics.screenWidth * (18 / 375),
    font20: matrics.screenWidth * (20 / 375),
    font22: matrics.screenWidth * (22 / 375),
    font24: matrics.screenWidth * (24 / 375),
    font26: matrics.screenWidth * (26 / 375),
    font28: matrics.screenWidth * (28 / 375),
    font30: matrics.screenWidth * (30 / 375),
    font32: matrics.screenWidth * (32 / 375),
};

const FontWeight = {
    full: '900',
    semi: '600',
    low: '400',
    bold: 'bold',
    normal: 'normal',
};

const FontType = {
    robotoMedium: 'Roboto-Medium',
    robotoRegular: 'Roboto-Regular',
    robotoSemiBold: 'Roboto-SemiBold',
    robotoBold: 'Roboto-Bold',
    playfairdisplayBold: 'PlayfairDisplay-Bold',
    playfairdisplayMedium: 'PlayfairDisplay-Medium',
    playfairdisplayRegular: 'PlayfairDisplay-Regular',
    playfairdisplaySemiBold: 'PlayfairDisplay-SemiBold',
    poppinsBold: 'Poppins-Bold',
    poppinsMedium: 'Poppins-Medium',
    poppinsRegular: 'Poppins-Regular',
    poppinsSemiBold: 'Poppins-SemiBold',
};

export {
    FontSize,
    FontWeight,
    FontType,
    matrics,
};