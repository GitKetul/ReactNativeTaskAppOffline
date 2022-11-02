import { StyleSheet, Dimensions, Platform } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const deviceWitdh = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  bgImage: {
    position: 'absolute',
    width: deviceWitdh,
    height: deviceHeight,
  },
  textWrapper: {
    marginTop: 50,
    marginHorizontal: 38,
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  infoTextWrapper: {
    marginVertical: 30,
    alignItems: 'center',
  },
  langWrapper: {
    marginTop: 30,
    alignItems: 'center',
  },
  localeWrapper: {
    marginTop: Platform.OS === 'android' ? 0 : -50,
    marginBottom: 20,
    alignItems: 'center',
  },
  helpWrapper: {
    marginLeft: 30,
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rowContainer: {
    width: wp(47),
    aspectRatio: 1 / 1,
    resizeMode: 'cover',
    alignSelf: 'center',
    margin: wp(1),
  },
  columnContainer: {
    width: wp(96),
    aspectRatio: 1 / 1,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: wp(1),
  },
  loadingContainer: {
    marginTop: 10,
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    paddingBottom: hp(0.5),
  },
});
