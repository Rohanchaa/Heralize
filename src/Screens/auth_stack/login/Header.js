import {Text, View, StyleSheet, Image} from 'react-native';

const Header = () => {
  return (
    <View>
      <Image
        style={Styles.image}
        source={require('../../../images/upperimage.png')}
      />
      <View style={Styles.Container}>
        <Text style={Styles.headingText}>Welcome</Text>
        <Text style={Styles.subHeading}>
          Please fill in your email password to login to your account.
        </Text>
      </View>
    </View>
  );
};
const Styles = StyleSheet.create({
  Container: {
    padding: 20,
    borderRadius: 4,
  },
  headingText: {
    color: '#74C042',
    fontSize: 30,
    marginTop: 20,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 16,
  },
  image: {
    height: 260,
    width: '100%',
  },
});

export default Header;
