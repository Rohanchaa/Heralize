import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReportedUserListScreen from '../../Screens/root_stack/ReportedUser/ReportedUserListScreen';

const {Navigator, Screen} = createNativeStackNavigator();

const ReportedUserStack = () => {
  return (
    <Navigator>
      <Screen
        name="ReportedUserListScreen"
        component={ReportedUserListScreen}
        options={{headerTitle: 'Reported users', title: 'Users'}}
      />
    </Navigator>
  );
};

export default ReportedUserStack;
