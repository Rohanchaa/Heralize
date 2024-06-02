import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Communities from '../../Screens/root_stack/Community/communities';
import CommunityDetailsScreen from '../../Screens/root_stack/Community/CommunityDetailsScreen';
import AddCommunityPostScreen from '../../Screens/root_stack/Community/AddCommunityPostScreen';
import PostDetailsScreen from '../../Screens/root_stack/Community/PostDetailsScreen';
import AddCommunityScreen from '../../Screens/root_stack/Community/AddCommunityScreen';

const {Screen, Navigator} = createNativeStackNavigator();

const CommunityStack = () => {
  return (
    <Navigator>
      <Screen
        name="CommunityListScreen"
        component={Communities}
        options={{headerTitle: 'Communities'}}
      />
      <Screen
        name="CommunitDetailScreen"
        component={CommunityDetailsScreen}
        options={{headerTitle: 'Community details'}}
      />
      <Screen
        name="AddCommunityPostScreen"
        component={AddCommunityPostScreen}
        options={{headerTitle: 'Add post'}}
      />
      <Screen
        name="PostDetailsScreen"
        component={PostDetailsScreen}
        options={{headerTitle: 'Post details'}}
      />
      <Screen
        name="AddCommunityScreen"
        component={AddCommunityScreen}
        options={{headerTitle: 'Add community'}}
      />
    </Navigator>
  );
};

export default CommunityStack;
