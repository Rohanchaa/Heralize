import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import {addPost} from '../../../services/post_service';

const AddCommunityPostScreen = ({navigation, route}) => {
  const {id} = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    navigation.setOptions({tabBarVisible: false});
  }, []); // Run only once on component mount

  const handleNext = () => {
    if (!title || !description) {
      Alert.alert('Alert', 'Title and description are required');
      return;
    }

    addPost({title, description, community_id: id})
      .then(res => {
        const {success} = res.data;

        if (success) {
          Alert.alert('Alert', 'Post has been added');
          navigation.goBack();
        }
      })
      .catch(error => {
        console.log('error', error?.response?.data);
      });
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          placeholderTextColor="#000"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.descriptionInput}
          placeholder="Description"
          placeholderTextColor="#000"
          multiline={true}
          value={description}
          onChangeText={setDescription}
        />
      </ScrollView>
      <Button title="Submit" onPress={() => handleNext()} color="#74C042" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    marginBottom: 5,
  },
  titleInput: {
    fontSize: 16,
    marginBottom: 5,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  descriptionInput: {
    fontSize: 16,
    textAlignVertical: 'top',
    padding: 10,
    borderWidth: 0,
    flex: 1,
  },
});

export default AddCommunityPostScreen;
