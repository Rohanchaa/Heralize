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
      <Text style={Styles.text}>
        Discover People with the same Interests for your Herald Journey
      </Text>
      <Text style={Styles.subtext}>
        Connect, Explore, Unite, Thrive Together.
      </Text>
      <View style={Styles.botton}>
        <Text style={Styles.buttonText}>Get Started</Text>
        <View style={Styles.buttoncontainermain}>
          <TouchableOpacity style={Styles.buttonContainer} onPress={btnactin}>
            <View style={Styles.button}>
              <Icon name="arrow-forward" size={24} color="#74C042" />
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
    marginTop: 40,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    alignItems: 'center',
    padding: 50,
    color: '#74C042',
    fontSize: 20,
  },
  image: {},
  subtext: {
    textAlign: 'center',
    fontSize: 15,
  },
  botton: {
    backgroundColor: '#74C042',
    width: ' 90%',
    margin: 50,
    padding: 5,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  buttonContainer: {
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  button: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  buttoncontainermain: {
    backgroundColor: 'red',
  },
});

export default Splashone;
