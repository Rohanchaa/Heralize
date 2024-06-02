import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import JoinRequestListScreen from '../../Screens/root_stack/JoinRequest/JoinRequestListScreen';

const {Navigator, Screen} = createNativeStackNavigator();

const JoinRequestStack = () => {
  return (
    <Navigator>
      <Screen
        name="JoinRequestListScreen"
        component={JoinRequestListScreen}
        options={{headerTitle: 'Join requests'}}
      />
    </Navigator>
  );
};

export default JoinRequestStack;
