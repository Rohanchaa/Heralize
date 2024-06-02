import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MMKV} from 'react-native-mmkv';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {toggleSplash} from '../../../store/slices/auth.slice';

const storage = new MMKV();

const Splashone = ({navigation}) => {
  const dispatch = useDispatch();

  const btnactin = () => {
    dispatch(toggleSplash());
  };

  return (
    <View style={Styles.container}>
      <Image
        style={Styles.image}
        source={require('../../../images/Mehenat4.png')}
      />
      <View style={Styles.textContainer}>
        <Text style={Styles.text}>
          Discover People with the same Interests for your Herald Journey
        </Text>
        <Text style={Styles.subtext}>
          Connect, Explore, Unite, Thrive Together.
        </Text>
        <View style={Styles.buttoncontainer}>
          <Text style={Styles.buttonText}>Get Started</Text>
          <TouchableOpacity onPress={btnactin}>
            <View style={Styles.button}>
              <Icon name="chevron-right" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    alignItems: 'center',
    color: '#74C042',
    marginTop: 40,
    fontSize: 20,
    marginBottom: 10,
  },
  image: {},
  subtext: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 10,
  },
  buttoncontainer: {
    marginTop: 10,
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
    borderRadius: 50,
    width: '80%',
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  button: {
    alignSelf: 'flex-end',
  },
});

export default Splashone;
