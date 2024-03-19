import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Splashone = ({navigation}) => {
  const btnactin = () => {
    console.log('pressed');
    navigation.navigate('Login');
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
              <Icon name="add-card" size={24} color="red" />
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
