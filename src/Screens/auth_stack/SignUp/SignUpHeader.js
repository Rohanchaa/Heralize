import {Text, View, StyleSheet, Image} from 'react-native';

const SignUpHeader = () => {
  return (
    <View>
      <View style={Styles.Container}>
        <Text style={Styles.headingText}>Create your Account</Text>
        <Text style={Styles.subHeading}>
          Please fill in your details to create your account
        </Text>
      </View>
    </View>
  );
};
const Styles = StyleSheet.create({
  Container: {
    marginTop: 60,
    padding: 20,
    borderRadius: 4,
  },
  headingText: {
    color: '#74C042',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subHeading: {
    marginTop: 5,
    fontSize: 16,
  },
  image: {
    height: 260,
    width: '100%',
  },
});

export default SignUpHeader;
