import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddPost from '../../Screens/root_stack/Home/addpost';
import HomeScreens from './homestack';
const Tab = createBottomTabNavigator();
const RootStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Homescreen" component={HomeScreens} />
      <Tab.Screen name="Addpost" component={AddPost} />
    </Tab.Navigator>
  );
};

export default RootStack;
