import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '../../Screens/root_stack/Profile/Settings';
import UpdatePasswordScreen from '../../Screens/root_stack/Profile/UpdatePasswordScreen';
import AddCommunityRequest from '../../Screens/root_stack/Profile/AddCommunityRequest';
import CommunityRequested from '../../Screens/root_stack/Profile/CommunityRequested';

const {Navigator, Screen} = createNativeStackNavigator();

const SettingsStck = () => {
  return (
    <Navigator>
      <Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <Screen
        name="UpdatePasswordScreen"
        component={UpdatePasswordScreen}
        options={{headerTitle: 'Edit password'}}
      />
      <Screen
        name="AddCommunityRequest"
        component={AddCommunityRequest}
        options={{headerTitle: 'Add community request'}}
      />
      <Screen
        name="CommunityRequested"
        component={CommunityRequested}
        options={{headerTitle: 'Add community request'}}
      />
    </Navigator>
  );
};

export default SettingsStck;
