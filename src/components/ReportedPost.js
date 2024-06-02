import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const ReportedPost = ({item}) => {
  return (
    <View style={styles.container}>
      <Text>h/{item.community_name}</Text>
      <Text>u/{item.user_name}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
});

export default ReportedPost;
