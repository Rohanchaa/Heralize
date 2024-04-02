import React from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Settings({navigation}) {
  const EditAccount = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* Header */}
      <View style={styles.container}>
        <TouchableOpacity>
          <Icon style={styles.backButton} name="arrow-back-ios" size={25} />
        </TouchableOpacity>
        <Text style={styles.header}>Settings</Text>
      </View>
      {/* User Info */}
      <View style={styles.profileBox}>
        <View style={styles.insideProfileBox}>
          <Image
            source={require('../../../images/1.jpg')}
            style={styles.image}
          />
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Rohan Shrestha
            </Text>
            <TouchableOpacity onPress={EditAccount}>
              <Text style={{color: 'blue', marginTop: 5}}>Edit Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Options */}
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.options}>
          <View style={styles.containerFlex}>
            <View
              style={[styles.optionContainer1, {backgroundColor: '#74C042'}]}>
              <Icon
                style={styles.nextbutton}
                name="lock-outline"
                size={25}
                color={'white'}
              />
            </View>
            <Text style={styles.optionImage}>Change Password</Text>
          </View>
          <Icon style={styles.nextbutton} name="navigate-next" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginHorizontal: 20,
  },
  header: {
    marginHorizontal: 65,
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileBox: {
    backgroundColor: '#f0f0f0',
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  insideProfileBox: {flexDirection: 'row', alignItems: 'center'},
  image: {width: 60, height: 60, borderRadius: 30},
  options: {
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionContainer: {
    marginTop: 30,
    marginHorizontal: 15,
  },
  nextbutton: {},
  optionContainer1: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#3451d5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionImage: {marginLeft: 15},
  containerFlex: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
