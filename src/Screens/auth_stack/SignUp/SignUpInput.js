import {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const themeColor = '#74C042';

const SignUpInput = () => {
  const navigation = useNavigation();
  const btnactin = () => {
    console.log('pressed');
    navigation.navigate('Login');
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [confirmpassword, setconfirmPassword] = useState('');

  return (
    <View style={Styles.container}>
      <Text style={Styles.toptext}>Full Name</Text>
      <TextInput
        placeholder="Email"
        style={Styles.inputEmail}
        onChangeText={setname}
        value={name}
      />
      <Text style={Styles.toptext}>Email</Text>
      <TextInput
        placeholder="Email"
        style={Styles.inputEmail}
        onChangeText={setEmail}
        value={email}
      />
      <View style={Styles.pass}>
        <Text style={Styles.toptext}>Password</Text>
        <TextInput
          placeholder="Password"
          style={Styles.inputPassword}
          onChangeText={setPassword}
          value={password}
        />
        <Text style={Styles.toptext}>Confirm Password</Text>
        <TextInput
          placeholder="Password"
          style={Styles.inputPassword}
          onChangeText={setconfirmPassword}
          value={confirmpassword}
        />
      </View>

      <View style={Styles.button}>
        <Button title="SignUp" color={themeColor} />
      </View>

      <View style={Styles.loginbutton}>
        <TouchableOpacity onPress={btnactin}>
          <Text style={Styles.signupText}>Already Have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 3,
    padding: 20,
  },
  toptext: {
    marginTop: 10,
  },
  inputEmail: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 10},
    elevation: 5,
    shadowOpacity: 0.1,
  },
  inputPassword: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 10},
    elevation: 5,
    shadowOpacity: 0.1,
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
  },
  signupText: {
    alignItems: 'center',
    fontSize: 13,
    color: '#74C042',
    textDecorationLine: 'underline',
  },
  pass: {},
  loginbutton: {
    alignItems: 'center',
  },
});

export default SignUpInput;
