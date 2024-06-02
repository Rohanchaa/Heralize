import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CreatePost from '../../Screens/root_stack/post/addpost';
import SelectCommunityScreen from '../../Screens/root_stack/post/SelectCommunityScreen';

const {Navigator, Screen} = createNativeStackNavigator();

const PostStack = () => {
  return (
    <Navigator>
      <Screen
        name="AddPost"
        component={CreatePost}
        options={{headerTitle: 'Add post'}}
      />
      <Screen
        name="SelectCommunity"
        component={SelectCommunityScreen}
        options={{headerTitle: 'Select Community'}}
      />
    </Navigator>
  );
};

export default PostStack;
