import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Image,
} from 'react-native';

const themeColor = '#74C042';

const Header = () => {
  return (
    <View>
      <Image
        style={styles.image}
        source={require('../../../images/upperimage.png')}
      />
      <View style={styles.container}>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.subHeading}>
          Please fill in your email and password to login to your account.
        </Text>
      </View>
    </View>
  );
};

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('Attempting to login...');
    navigation.navigate('Homescreen');
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.formContainer}>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.inputEmail}
          onChangeText={setEmail}
          value={email}
        />
        <Text style={styles.password}>Password</Text>
        <TextInput
          placeholder="Password"
          style={styles.inputPassword}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <View style={styles.button}>
          <Button title="Login" color={themeColor} onPress={handleLogin} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  formContainer: {
    padding: 20,
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
  password: {
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
  },
});

export default LoginScreen;
