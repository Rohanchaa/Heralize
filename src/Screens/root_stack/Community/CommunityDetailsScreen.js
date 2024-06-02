import React, {useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Post from '../../../components/post';
import {
  getCommunityDetails,
  joinCommunity,
  leaveCommunity,
} from '../../../services/community_service';
import {getPostsByCommunity} from '../../../services/post_service';
import {addReport, addUserReport} from '../../../services/report_service';
import {useIsFocused} from '@react-navigation/native';

const CommunityDetailsScreen = ({route, navigation}) => {
  const {id} = route.params;

  const [community, setCommunity] = useState({});
  const [joined, setJoined] = useState(false);
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

  const fetchCommunityDetails = () => {
    getCommunityDetails(id)
      .then(res => {
        const {success, data} = res.data;

        if (success) {
          setJoined(data.is_joined);
          setCommunity(data);
        }
      })
      .catch(err => {
        console.log('err', err?.response?.data);
      });
  };

  const fetchPosts = () => {
    getPostsByCommunity(id)
      .then(res => {
        const {success, data} = res.data;

        if (success) {
          setPosts(data);
        }
      })
      .catch(err => {
        console.log('err', err?.response?.data);
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
    setReportUserModal({...reportModal, open: false});

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

  const handleJoin = () => {
    setLoading(true);

    joinCommunity(id)
      .then(res => {
        setLoading(false);
        const {success} = res.data;

        if (success) {
          Alert.alert('Success', 'You have requested to join');
          fetchCommunityDetails();
        }
      })
      .catch(err => {
        setLoading(false);
        const {message} = err?.response?.data;

        if (message) {
          Alert.alert('Error', message);
        }
      });
  };

  const handleLeave = () => {
    setLoading(true);

    leaveCommunity(id)
      .then(res => {
        setLoading(false);
        const {success} = res.data;

        if (success) {
          Alert.alert('Success', 'You have left the community');
          fetchCommunityDetails();
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('err', err?.response?.data);
      });
  };

  useEffect(() => {
    if (isFocused) {
      fetchCommunityDetails();
      fetchPosts();
    }
  }, [isFocused]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 60}}>
        <View style={styles.circle}>
          <Text style={styles.avatar}>/h</Text>
        </View>
        <Text style={styles.title}>h/{community?.name}</Text>
        <Text>{community?.description}</Text>
        <View style={styles.row}>
          <Text>{community?.user_count} members</Text>
          <Pressable
            style={styles.btn}
            onPress={() => (joined ? handleLeave() : handleJoin())}>
            <Text style={styles.text}>
              {joined ? 'Leave' : 'Request to join'}
            </Text>
          </Pressable>
        </View>
        {joined && (
          <Pressable
            style={[styles.btn, {backgroundColor: 'green', width: '100%'}]}
            onPress={() => navigation.navigate('AddCommunityPostScreen', {id})}>
            <Text style={styles.text}>Add post</Text>
          </Pressable>
        )}
        <Text>Posts</Text>
        {posts.map(item => (
          <Post
            key={item._id}
            item={item}
            onRefetch={fetchPosts}
            onReportPress={id => setReportModal({id, open: true})}
            onUserReportPress={id => setReportUserModal({id, open: true})}
          />
        ))}

        <ReactNativeModal
          isVisible={reportModal.open}
          animationIn="fadeIn"
          backdropOpacity={0.6}
          onDismiss={() => setReportModal({...reportModal, open: false})}
          onBackdropPress={() => setReportModal({...reportModal, open: false})}
          onBackButtonPress={() =>
            setReportModal({...reportModal, open: false})
          }>
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
              disabled={loading}
              style={[styles.btn, {backgroundColor: 'green', width: '100%'}]}
              onPress={onReportSubmit}>
              <Text style={styles.text}>Submit</Text>
            </Pressable>
            <Pressable
              style={[styles.btn, {backgroundColor: 'red', width: '100%'}]}
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  circle: {
    backgroundColor: 'green',
    marginVertical: 10,
    borderRadius: 100,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  row: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btn: {
    marginVertical: 10,
    backgroundColor: 'green',
    padding: 10,
    elevation: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  text: {
    fontSize: 14,
    color: 'white',
  },
  input: {
    marginVertical: 10,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modal: {
    alignSelf: 'center',
    padding: 20,
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 20,
    elevation: 3,
  },
});

export default CommunityDetailsScreen;
