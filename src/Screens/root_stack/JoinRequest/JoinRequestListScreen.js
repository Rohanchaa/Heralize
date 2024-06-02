import {View, Text, StyleSheet, FlatList, Button, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  acceptRequest,
  getJointRequests,
  rejectRequest,
} from '../../../services/community_service';

const JoinRequestListScreen = () => {
  const [data, setData] = useState([]);

  const isFocused = useIsFocused();

  const fetchJoinRequests = () => {
    getJointRequests()
      .then(res => {
        const {success, data} = res.data;

        if (success) {
          setData(data);
        }
      })
      .catch(err => {
        console.log(err?.response?.data);
      });
  };

  const handleAccept = id => {
    Alert.alert('Alert', 'Accept request', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => onAccept(id),
      },
    ]);
  };

  const onAccept = id => {
    acceptRequest(id)
      .then(res => {
        const {success} = res.data;

        if (success) {
          Alert.alert('Success', 'Request has been accepted');
          fetchJoinRequests();
        }
      })
      .catch(err => {
        console.log('errer', err?.response?.data);
      });
  };

  const handleReject = id => {
    Alert.alert('Alert', 'Reject request', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => onReject(id),
      },
    ]);
  };

  const onReject = id => {
    rejectRequest(id)
      .then(res => {
        const {success} = res.data;

        if (success) {
          Alert.alert('Success', 'Request has been rejected');
          fetchJoinRequests();
        }
      })
      .catch(err => {
        console.log('errer', err?.response?.data);
      });
  };

  useEffect(() => {
    if (isFocused) {
      fetchJoinRequests();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text> h/{item.community_name}</Text>
            <Text> u/{item.user_name}</Text>
            <View style={styles.btn}>
              <Button
                title="Accept"
                color="green"
                onPress={() => handleAccept(item._id)}
              />
            </View>
            <View style={styles.btn}>
              <Button
                title="Reject"
                color="red"
                onPress={() => handleReject(item._id)}
              />
            </View>
          </View>
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
  list: {
    padding: 10,
  },
  item: {
    marginVertical: 10,
  },
  btn: {
    marginVertical: 5,
  },
});

export default JoinRequestListScreen;
