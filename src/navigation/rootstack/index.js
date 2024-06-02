import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Settings from '../../Screens/root_stack/Profile/Settings';
import CommunityStack from './CommunityStack';
import PostStack from './PostStack';
import HomeScreens from './homestack';
import SettingsStck from './SettingsStck';
import ReportStack from './ReportStack';
import {useSelector} from 'react-redux';
import ReportedUserStack from './ReportedUserStack';
import JoinRequestStack from './JoinRequestStack';
const Tab = createBottomTabNavigator();

const RootStack = () => {
  const {user} = useSelector(state => state.auth);

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
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
        name="Post"
        component={PostStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="add" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="CommunityStack"
        component={CommunityStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="people-alt" size={size} color={color} />
          ),
          title: 'Communities',
        }}
      />

      {user && user?.type === 'admin' && (
        <>
          <Tab.Screen
            name="JoinRequestStack"
            component={JoinRequestStack}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="bookmark" size={size} color={color} />
              ),
              title: 'Join requests',
            }}
          />
          <Tab.Screen
            name="ReportStack"
            component={ReportStack}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="warning" size={size} color={color} />
              ),
              title: 'Reports',
            }}
          />
          <Tab.Screen
            name="ReportedUserStack"
            component={ReportedUserStack}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="supervised-user-circle" size={size} color={color} />
              ),
              title: 'Reported users',
            }}
          />
        </>
      )}

      <Tab.Screen
        name="SettingsStack"
        component={SettingsStck}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="settings" size={size} color={color} />
          ),
          title: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

export default RootStack;
