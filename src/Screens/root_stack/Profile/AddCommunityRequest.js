import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {addCommunityRequest} from '../../../services/community_service';

const AddCommunityRequest = ({navigation}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitPress = () => {
    if (!name || !description) {
      Alert.alert('Alert', 'Name and description are required');
      return;
    }

    setLoading(true);

    addCommunityRequest({name, description})
      .then(res => {
        setLoading(false);

        const {success} = res.data;

        if (success) {
          Alert.alert('Success', 'New Community Add Request has been sent');
          navigation.goBack();
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        console.log('err', err?.response?.data);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.root}>
        <Text>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          numberOfLines={3}
          multiline
        />
        <Button title="Add" disabled={loading} onPress={onSubmitPress} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  root: {
    padding: 10,
  },
  input: {
    marginVertical: 10,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  btn: {
    marginVertical: 10,
  },
});

export default AddCommunityRequest;
