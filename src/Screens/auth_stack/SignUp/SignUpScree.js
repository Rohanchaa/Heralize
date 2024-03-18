import {ScrollView, Text, StyleSheet, View} from 'react-native';
import React from 'react';
import SignUpHeader from './SignUpHeader';
import SignUpInput from './SignUpInput';

const SignUpScreen = () => {
  return (
    <ScrollView style={Styles.Container}>
      <SignUpHeader />
      <SignUpInput />
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default SignUpScreen;
