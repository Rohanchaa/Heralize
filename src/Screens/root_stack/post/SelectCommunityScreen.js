import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getMyCommunities} from '../../../services/community_service';
import {addPost} from '../../../services/post_service';

const SelectCommunityScreen = ({route, navigation}) => {
  const [communites, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);

  const {title, description} = route.params;

  const fetchCommunities = () => {
    setLoading(true);

    getMyCommunities()
      .then(res => {
        setLoading(false);

        const {success, data} = res.data;

        if (success) {
          setCommunities(data);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('err', error?.response?.data);
      });
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const onItemPress = item => {
    Alert.alert('Alert', `Create a post on ${item?.name}`, [
      {
        text: 'No',
      },
      {
        text: 'Create',
        onPress: () => onAddPost(item),
      },
    ]);
  };

  const onAddPost = item => {
    addPost({title, description, community_id: item._id})
      .then(res => {
        const {success} = res.data;

        if (success) {
          Alert.alert('Alert', 'Post has added');
          navigation.goBack();
          navigation.navigate('Home');
        }
      })
      .catch(error => {
        console.log('error', error?.response?.data);
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={communites}
        refreshing={loading}
        onRefresh={fetchCommunities}
        renderItem={({item}) => (
          <Pressable style={styles.item} onPress={() => onItemPress(item)}>
            <Text>{item?.name}</Text>
            <Icon name="chevron-right" size={22} />
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
  item: {
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 10,
    elevation: 3,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SelectCommunityScreen;
