import {ScrollView, Text, StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../login/Header';
import Input from '../login/Input';

const LoginScreen = () => {
  return (
    <ScrollView style={Styles.Container}>
      <Header />
      <Input />
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default LoginScreen;
