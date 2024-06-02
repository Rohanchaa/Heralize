import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Homescreen from '../../Screens/root_stack/Home/homescreen';
import EditPostScreen from '../../Screens/root_stack/Home/EditPostScreen';
import PostDetailsScreen from '../../Screens/root_stack/Community/PostDetailsScreen';
const HomeStack = createStackNavigator();

const HomeScreens = () => (
  <HomeStack.Navigator
    screenOptions={{
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: true,
    }}>
    <HomeStack.Screen
      name="HomeScreen"
      component={Homescreen}
      options={{headerTitle: 'Home'}}
    />
    <HomeStack.Screen
      name="EditPostScreen"
      component={EditPostScreen}
      options={{headerTitle: 'Edit your post'}}
    />
    <HomeStack.Screen
      name="PostDetailsScreen"
      component={PostDetailsScreen}
      options={{headerTitle: 'Post details'}}
    />
  </HomeStack.Navigator>
);

export default HomeScreens;
