import {View, Text, ScrollView, StyleSheet, Button, Alert} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {updatePassword} from '../../../services/auth_service';

const UpdatePasswordScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onUpdatePress = () => {
    if (!password || !confirmPassword) {
      Alert.alert('Alert', 'Fill both fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Alert', 'Passwords dont match');
      return;
    }

    updatePassword({password})
      .then(res => {
        const {success} = res.data;

        if (success) {
          Alert.alert('Success', 'Password has been changed');
          navigation.goBack();
        }
      })
      .catch(err => {
        console.log('err', err?.response?.data);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>New Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text>Confirm Password</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Update" onPress={onUpdatePress} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  input: {
    marginVertical: 10,
    elevation: 3,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default UpdatePasswordScreen;
