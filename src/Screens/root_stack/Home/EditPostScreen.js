import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getPostDetails, updatePost} from '../../../services/post_service';

const EditPostScreen = ({route, navigation}) => {
  const {_id} = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPostDetails = () => {
    getPostDetails(_id)
      .then(res => {
        const {success, data} = res.data;

        if (success) {
          setTitle(data?.title);
          setDescription(data?.description);
        }
      })
      .catch(err => {
        console.log('post detail err', err?.response?.data);
      });
  };

  const onUpdatePress = () => {
    if (!title || !description) {
      Alert.alert('Error', 'Title and description are required');
      return;
    }

    setLoading(true);

    updatePost({title, description}, _id)
      .then(res => {
        setLoading(false);

        const {success} = res.data;

        if (success) {
          Alert.alert('Success', 'Post has been updated');
          navigation.goBack();
        }
      })
      .catch(err => {
        setLoading(false);

        console.log('err', err?.response?.data);
      });
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Title</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />
      <Text>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
        numberOfLines={3}
      />
      <Pressable
        onPress={onUpdatePress}
        style={[styles.btn, {backgroundColor: loading ? 'grey' : 'green'}]}>
        <Text style={styles.text}>Update</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    marginBottom: 10,
    marginTop: 5,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  btn: {
    marginVertical: 10,
    backgroundColor: 'green',
    padding: 10,
    elevation: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: 'white',
  },
});

export default EditPostScreen;
