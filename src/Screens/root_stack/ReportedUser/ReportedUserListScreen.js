import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  deleteUser,
  deleteUserReport,
  getReportedUser,
} from '../../../services/report_service';

const ReportedUserListScreen = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const fetchReportedPosts = () => {
    setLoading(true);
    getReportedUser()
      .then(res => {
        setLoading(false);
        const {success, data} = res.data;

        if (success) {
          setReports(data);
        }
      })
      .catch(err => {
        setLoading(false);

        console.log('err', err?.response?.data);
      });
  };

  const onReportDeletePress = id => {
    Alert.alert('Alert', 'Proceed to delete this report', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => handleReportDelete(id),
      },
    ]);
  };

  const handleReportDelete = id => {
    deleteUserReport(id)
      .then(res => {
        const {success} = res.data;

        if (success) {
          Alert.alert('Success', 'The report has been deleted');
          fetchReportedPosts();
        }
      })
      .catch(err => {
        console.log('err', err?.response?.data);
      });
  };

  const onPostDeletePress = id => {
    Alert.alert('Alert', 'Proceed to delete this user', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => handlePostDelete(id),
      },
    ]);
  };

  const handlePostDelete = id => {
    deleteUser(id)
      .then(res => {
        const {success} = res.data;

        if (success) {
          Alert.alert('Success', 'The report has been deleted');
          fetchReportedPosts();
        }
      })
      .catch(err => {
        console.log('err', err?.response?.data);
      });
  };

  useEffect(() => {
    if (isFocused) {
      fetchReportedPosts();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={fetchReportedPosts}
        data={reports}
        renderItem={({item}) => (
          <View style={styles.item}>
            <View style={styles.reportView}>
              <Text style={styles.errorText}>u/{item?.user_name}</Text>
              <Text style={styles.errorText}>Reported for reason:</Text>
              <Text style={styles.errorText}>{item?.reason}</Text>
              <View style={styles.innerItem}>
                <Icon
                  name="warning"
                  size={22}
                  onPress={() => onReportDeletePress(item._id)}
                />
                <Icon
                  name="account-circle"
                  size={22}
                  onPress={() => onPostDeletePress(item?.user_id)}
                />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text>No reported users found</Text>}
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
  reportView: {
    backgroundColor: 'tomato',
    opacity: 0.7,
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    marginVertical: 5,
  },
  errorText: {
    color: 'white',
    marginVertical: 5,
  },
  innerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
});

export default ReportedUserListScreen;
