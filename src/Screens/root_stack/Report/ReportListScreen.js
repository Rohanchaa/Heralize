import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  deletePost,
  deleteReport,
  getReportedPosts,
} from '../../../services/post_service';
import Post from '../../../components/post';
import ReportedPost from '../../../components/ReportedPost';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReportListScreen = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const fetchReportedPosts = () => {
    setLoading(true);
    getReportedPosts()
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
    deleteReport(id)
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
    Alert.alert('Alert', 'Proceed to delete this post', [
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
    deletePost(id)
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
              <Text style={styles.errorText}>Reported for reason:</Text>
              <Text style={styles.errorText}>{item?.reason}</Text>
            </View>
            <View style={styles.innerItem}>
              <Icon
                name="warning"
                size={22}
                color="tomato"
                onPress={() => onReportDeletePress(item._id)}
              />
              <Icon
                name="delete"
                size={22}
                color="tomato"
                onPress={() => onPostDeletePress(item?.post_id)}
              />
            </View>
            <ReportedPost item={item} />
          </View>
        )}
        ListEmptyComponent={<Text>No reported posts found</Text>}
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

export default ReportListScreen;
