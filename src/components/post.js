import React, {useCallback, useState} from 'react';
import {Alert, Pressable, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {deletePost, dislikePost, likePost} from '../services/post_service';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const Post = ({item, onRefetch, onReportPress, onUserReportPress}) => {
  const [likeCount, setLikeCount] = useState(item.like_count);
  const [dislikeCount, setDislikeCount] = useState(item.dislike_count);
  const [likedByMe, setLikedByMe] = useState(item.liked_by_me);
  const [dislikedByMe, setDislikedByMe] = useState(item.disliked_by_me);

  const {user} = useSelector(state => state.auth);

  const {navigate} = useNavigation();

  const onLikePress = useCallback(() => {
    setLikedByMe(!likedByMe);
    setDislikedByMe(false);

    if (likedByMe) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }

    if (dislikedByMe) {
      setDislikeCount(prev => prev - 1);
    }

    likePost({_id: item._id})
      .then(res => {
        const {success} = res.data;

        if (success) {
        }
      })
      .catch(err => {
        console.log('err', err?.response?.data);
      });
  }, [likedByMe, likeCount, dislikeCount, dislikedByMe]);

  const onDislikePress = useCallback(() => {
    setDislikedByMe(!dislikedByMe);
    setLikedByMe(false);

    if (dislikedByMe) {
      setDislikeCount(prev => prev - 1);
    } else {
      setDislikeCount(prev => prev + 1);
    }

    if (likedByMe) {
      setLikeCount(prev => prev - 1);
    }

    dislikePost({_id: item._id})
      .then(res => {
        const {success} = res.data;

        if (success) {
        }
      })
      .catch(err => {
        console.log('err', err?.response?.data);
      });
  }, [likedByMe, likeCount, dislikeCount, dislikedByMe]);

  const handleDelete = () => {
    deletePost(item._id)
      .then(res => {
        const {success} = res.data;

        if (success) {
          Alert.alert('Success', 'This post has been deleted');
          onRefetch();
        }
      })
      .catch(err => {
        console.log('err', err?.response?.data);
      });
  };

  const onDeletePress = () => {
    Alert.alert('Alert', 'Delete the post', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => handleDelete(),
      },
    ]);
  };

  return (
    <View
      style={{
        padding: 10,
        marginBottom: 7,
        elevation: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 2,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{fontSize: 13, color: '#0064bd'}} onPress={() => {}}>
            h/{`${item?.community_name}`} ·{' '}
          </Text>
          <Text style={{fontSize: 13, color: '#0064bd'}} onPress={() => {}}>
            u/{`${item?.user_name}`} ·{' '}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item.editable && (
            <>
              <Icon
                name="edit"
                size={22}
                style={{marginHorizontal: 3}}
                onPress={() => navigate('EditPostScreen', {_id: item?._id})}
              />
              <Icon
                name="delete-forever"
                size={22}
                style={{marginHorizontal: 3}}
                onPress={onDeletePress}
              />
            </>
          )}
        </View>
      </View>

      <Text style={{fontSize: 17, fontWeight: 'bold'}}>{item?.title}</Text>
      <Text
        style={{fontSize: 13, color: '#333', marginVertical: 10}}
        numberOfLines={3}>
        {item?.description}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 12,
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity>
            <Icon
              name="arrow-upward"
              size={20}
              color={likedByMe ? 'blue' : 'black'}
              onPress={onLikePress}
            />
          </TouchableOpacity>
          <Text style={{paddingHorizontal: 5}}>{likeCount}</Text>

          <TouchableOpacity>
            <Icon
              name="arrow-downward"
              size={20}
              color={dislikedByMe ? 'blue' : 'black'}
              onPress={onDislikePress}
            />
          </TouchableOpacity>
          <Text style={{paddingHorizontal: 5}}>{dislikeCount}</Text>
        </View>
        <Pressable
          style={{paddingHorizontal: 10}}
          onPress={() => navigate('PostDetailsScreen', {id: item._id})}>
          <Text>{item.comment_count} Comments</Text>
        </Pressable>
        <View
          style={{flexDirection: 'row', alignItems: 'center', columnGap: 4}}>
          <TouchableOpacity activeOpacity={0.7}>
            <Icon
              name="warning"
              size={20}
              color="red"
              onPress={() => onReportPress(item._id)}
            />
          </TouchableOpacity>
          {user._id !== item.user_id && item.user_type !== 'admin' && (
            <Icon
              name="account-circle"
              size={20}
              color="red"
              onPress={() => onUserReportPress(item.user_id)}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Post;
