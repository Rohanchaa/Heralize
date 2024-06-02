import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  Alert,
  Keyboard,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  addComment,
  deleteComment,
  dislikePost,
  getPostDetails,
  likePost,
} from '../../../services/post_service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
const width = Dimensions.get('window').width;

const PostDetailsScreen = ({route}) => {
  const {id} = route.params;

  const {user} = useSelector(state => state.auth);

  const [post, setPost] = useState({});
  const [likedByMe, setLikedByMe] = useState(false);
  const [dislikedByMe, setDislikedByMe] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [comment, setComment] = useState('');

  const fetchPostDetails = () => {
    getPostDetails(id)
      .then(res => {
        const {success, data} = res.data;

        if (success) {
          console.log(data);
          setPost(data);
          setLikedByMe(data?.liked_by_me);
          setDislikedByMe(data?.disliked_by_me);

          setLikeCount(data?.like_count);

          setDislikeCount(data?.dislike_count);
        }
      })
      .catch(err => {
        console.log('err', err?.response?.data);
      });
  };

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

    likePost({_id: id})
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

    dislikePost({_id: id})
      .then(res => {
        const {success} = res.data;

        if (success) {
        }
      })
      .catch(err => {
        console.log('err', err?.response?.data);
      });
  }, [likedByMe, likeCount, dislikeCount, dislikedByMe]);

  const onAddPress = () => {
    if (!comment) {
      Alert.alert('Alert', 'Comment cannot be empty');
      return;
    }

    Keyboard.dismiss();

    addComment({_id: id, comment})
      .then(res => {
        const {success} = res.data;

        if (success) {
          setComment('');
          Alert.alert('Alert', 'New comment added');
          fetchPostDetails();
        }
      })
      .catch(err => {
        console.log('err', err?.response?.data);
      });
  };

  const onDeletePress = id => {
    Alert.alert('Alert', 'Delete the comment?', [
      {
        text: 'No',
      },
      {
        text: 'yes',
        onPress: () => handleDelete(id),
      },
    ]);
  };

  const handleDelete = id => {
    deleteComment(id)
      .then(res => {
        const {success} = res.data;

        if (success) {
          Alert.alert('Sucess', 'Comment has been deleted');
          fetchPostDetails();
        }
      })
      .catch(err => {
        console.log('err', err?.response?.data);
      });
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>h/{post?.community_name}</Text>
        <Text style={styles.title}>u/{post?.user_name}</Text>
        <Text style={styles.title1}>{post?.title}</Text>
        <Text>{post?.description}</Text>
        <View style={styles.row}>
          <Icon
            name="arrow-upward"
            size={22}
            color={likedByMe ? 'blue' : 'black'}
            onPress={onLikePress}
          />
          <Text style={styles.text}>{likeCount}</Text>
          <Icon
            name="arrow-downward"
            size={22}
            color={dislikedByMe ? 'blue' : 'black'}
            onPress={onDislikePress}
          />
          <Text style={styles.text}>{dislikeCount}</Text>
        </View>
        <Text style={{marginVertical: 10}}>Comments</Text>
        {post?.comments?.map(item => (
          <View key={item._id}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <Text>u/{item?.user?.name}</Text>
              {item?.user?._id === user?._id && (
                <Icon
                  name="delete"
                  size={22}
                  onPress={() => onDeletePress(item?._id)}
                />
              )}
            </View>
            <Text>{item?.comment}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TextInput
          placeholder="Add new comment"
          style={styles.input}
          value={comment}
          onChangeText={setComment}
        />
        <Icon name="upload" size={22} onPress={onAddPress} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  title1: {
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  text: {
    paddingHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: 0.8 * width,
    elevation: 3,
    backgroundColor: 'white',
  },
});

export default PostDetailsScreen;
