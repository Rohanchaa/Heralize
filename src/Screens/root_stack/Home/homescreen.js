import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Post from '../../../components/post';
import {useIsFocused} from '@react-navigation/native';
import {getPosts} from '../../../services/post_service';
import ReactNativeModal from 'react-native-modal';
import {addReport, addUserReport} from '../../../services/report_service';

const Homescreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reportModal, setReportModal] = useState({
    open: false,
    id: '',
  });
  const [reportUserModal, setReportUserModal] = useState({
    open: false,
    id: '',
  });

  const [reason, setReason] = useState('');

  const isFocused = useIsFocused();

  const fetchPosts = () => {
    setLoading(true);
    getPosts()
      .then(res => {
        setLoading(false);
        const {success, data} = res.data;
        console.log(data);
        if (success) {
          setPosts(data);
        }
      })
      .catch(error => {
        setLoading(false);

        console.log('errror', error?.response?.data);
      });
  };

  const onReportSubmit = () => {
    if (!reason) {
      Alert.alert('Alert', 'Reason cannot be empty');
      return;
    }

    setLoading(true);
    setReportModal({...reportModal, open: false});

    addReport({post_id: reportModal.id, reason})
      .then(res => {
        setLoading(false);

        const {success} = res.data;

        if (success) {
          Alert.alert('Success', 'The post has been reported');
        }
      })
      .catch(err => {
        setLoading(false);

        console.log('errror', err?.response?.data);
      });
  };

  const onUserReportSubmit = () => {
    if (!reason) {
      Alert.alert('Alert', 'Reason cannot be empty');
      return;
    }

    setLoading(true);
    setReportUserModal({...reportUserModal, open: false});

    addUserReport({user_id: reportUserModal.id, reason})
      .then(res => {
        setLoading(false);

        const {success} = res.data;

        if (success) {
          Alert.alert('Success', 'The user has been reported');
        }
      })
      .catch(err => {
        setLoading(false);

        console.log('errror', err?.response?.data);
      });
  };

  useEffect(() => {
    if (isFocused) {
      fetchPosts();
    }

    return () => {
      setPosts([]);
    };
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={posts}
        refreshing={loading}
        onRefresh={fetchPosts}
        renderItem={({item}) => (
          <Post
            item={item}
            onRefetch={fetchPosts}
            onReportPress={id => setReportModal({id, open: true})}
            onUserReportPress={id => setReportUserModal({id, open: true})}
          />
        )}
      />
      <ReactNativeModal
        isVisible={reportModal.open}
        animationIn="fadeIn"
        backdropOpacity={0.6}
        onDismiss={() => setReportModal({...reportModal, open: false})}
        onBackdropPress={() => setReportModal({...reportModal, open: false})}
        onBackButtonPress={() => setReportModal({...reportModal, open: false})}>
        <View style={styles.modal}>
          <Pressable
            onPress={() => setReportModal({...reportModal, open: false})}>
            <Text style={styles.title}> Enter reason for report</Text>
          </Pressable>
          <View style={styles.input}>
            <TextInput
              value={reason}
              onChangeText={setReason}
              placeholder="Enter reason"
            />
          </View>
          <Pressable
            style={[styles.btn, {backgroundColor: 'green'}]}
            onPress={onReportSubmit}>
            <Text style={styles.text}>Submit</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, {backgroundColor: 'red'}]}
            onPress={() => setReportModal({open: false, id: ''})}>
            <Text style={styles.text}>Close</Text>
          </Pressable>
        </View>
      </ReactNativeModal>
      <ReactNativeModal
        isVisible={reportUserModal.open}
        animationIn="fadeIn"
        backdropOpacity={0.6}
        onDismiss={() => reportUserModal({...reportModal, open: false})}
        onBackdropPress={() => reportUserModal({...reportModal, open: false})}
        onBackButtonPress={() =>
          reportUserModal({...reportModal, open: false})
        }>
        <View style={styles.modal}>
          <Pressable
            onPress={() => reportUserModal({...reportModal, open: false})}>
            <Text style={styles.title}> Enter reason for report user</Text>
          </Pressable>
          <View style={styles.input}>
            <TextInput
              value={reason}
              onChangeText={setReason}
              placeholder="Enter reason"
            />
          </View>
          <Pressable
            disabled={loading}
            style={[styles.btn, {backgroundColor: 'green', width: '100%'}]}
            onPress={onUserReportSubmit}>
            <Text style={styles.text}>Submit</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, {backgroundColor: 'red', width: '100%'}]}
            onPress={() => setReportUserModal({open: false, id: ''})}>
            <Text style={styles.text}>Close</Text>
          </Pressable>
        </View>
      </ReactNativeModal>
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
  modal: {
    alignSelf: 'center',
    padding: 20,
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 20,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    marginVertical: 10,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 10,
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

export default Homescreen;
