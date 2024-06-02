import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReportListScreen from '../../Screens/root_stack/Report/ReportListScreen';

const {Navigator, Screen} = createNativeStackNavigator();

const ReportStack = () => {
  return (
    <Navigator>
      <Screen
        name="ReportListScreen"
        component={ReportListScreen}
        options={{headerTitle: 'Report'}}
      />
    </Navigator>
  );
};

export default ReportStack;
