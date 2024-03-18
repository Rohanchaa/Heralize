import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Update import statement

const themeColor = '#74C042';

const Input = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // try {
    //   const response = await axios.post(
    //     'http://192.168.101.6:8080/auth/login',
    //     {
    //       email: email,
    //       password: password,
    //     },
    //   );
    //   const token = response.data.token;
    //   await AsyncStorage.setItem('token', token); // Store token locally
    //   console.log('Token:', token);

    //   // Navigate to the home screen or any other screen upon successful login
    //   // Replace 'Home' with the name of your desired screen
    //   navigation.navigate('Home');
    // } catch (error) {
    //   console.error('Error:', error);
    // }
    console.log('Pressed');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 3,
    padding: 20,
  },
  password: {
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
});

export default Input;
