import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import HomeScreens from './homestack';
import CreatePost from '../../Screens/root_stack/post/addpost';
import Communities from '../../Screens/root_stack/Community/communities';
import Settings from '../../Screens/root_stack/Profile/Settings';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Tab = createBottomTabNavigator();

const RootStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreens}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Post"
        component={CreatePost}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="add" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Communities"
        component={Communities}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="people-alt" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RootStack;
