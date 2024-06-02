import {
  View,
  Text,
  StyleSheet,
  Switch,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  getCommunities,
  getMyCommunities,
} from '../../../services/community_service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

const Communities = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [all, setAll] = useState(true);
  const [data, setData] = useState(true);

  const isFocused = useIsFocused();

  const {user} = useSelector(state => state.auth);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        user?.type === 'admin' && (
          <Icon
            name="add"
            size={22}
            onPress={() => navigation.navigate('AddCommunityScreen')}
          />
        ),
    });
  }, [user]);

  const fetchAllCommunities = () => {
    setLoading(true);
    getCommunities()
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

  const fetchMyCommunities = () => {
    setLoading(true);

    getMyCommunities()
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

  const onToggle = useCallback(
    e => {
      setAll(!all);

      if (!e.nativeEvent.value) {
        fetchAllCommunities();
      } else {
        fetchMyCommunities();
      }
    },
    [all],
  );

  useEffect(() => {
    if (isFocused) {
      if (all) {
        fetchAllCommunities();
      } else {
        fetchMyCommunities();
      }
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.text}>All</Text>
        <Switch value={!all} onChange={onToggle} />
        <Text style={styles.text}>Joined</Text>
      </View>

      <FlatList
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={() => (all ? fetchAllCommunities() : fetchMyCommunities())}
        data={data}
        ListEmptyComponent={
          <Text>
            {all ? 'No communities found' : 'No joined communities found'}
          </Text>
        }
        renderItem={({item}) => (
          <Pressable
            style={styles.item}
            onPress={() =>
              navigation.navigate('CommunitDetailScreen', {id: item._id})
            }>
            <Text>h/{item?.name}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Communities;
