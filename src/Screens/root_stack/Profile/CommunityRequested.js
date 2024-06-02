import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  getCommunities,
  getCommunityRequested,
} from '../../../services/community_service';

export default function CommunityRequested({navigation}) {
  const [loading, setLoading] = useState(false);
  const [all, setAll] = useState(true);
  const [data, setData] = useState(true);
  const fetchAllCommunities = () => {
    setLoading(true);
    getCommunityRequested()
      .then(res => {
        setLoading(false);

        const {data, success} = res.data;

        if (success) {
          setData(data);
        }
      })
      .catch(err => {
        setLoading(false);

        console.log('err', err?.response?.data);
      });
  };

  useEffect(() => {
    fetchAllCommunities();
  }, []);

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={() => fetchAllCommunities()}
        data={data}
        ListEmptyComponent={
          <Text>
            {all ? 'No communities found' : 'No joined communities found'}
          </Text>
        }
        renderItem={({item}) => (
          <Pressable style={styles.item}>
            <Text>Requested Id: {item?._id}</Text>
            <Text>Requested Community Name: {item?.name}</Text>
            <Text>Requested by: {item?.user.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  top: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingHorizontal: 10,
  },
  list: {
    padding: 10,
  },
  item: {
    marginVertical: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
});
