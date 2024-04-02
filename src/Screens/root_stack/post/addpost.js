import React, {useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

const CreatePost = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({tabBarVisible: false});
  }, []); // Run only once on component mount

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        placeholderTextColor="#000"
      />
      <TextInput
        style={styles.descriptionInput}
        placeholder="Description"
        placeholderTextColor="#000"
        multiline={true}
      />
      <Button title="Next" onPress={() => handleNext()} color="#74C042" />
    </View>
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

export default CreatePost;
