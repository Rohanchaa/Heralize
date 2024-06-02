import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '../../../services/auth_service';
import {
  storeToken,
  storeType,
  storeUser,
} from '../../../store/slices/auth.slice';
const themeColor = '#74C042';

const Header = () => {
  return (
    <View>
      <Image
        style={styles.image}
        source={require('../../../images/upperimage.png')}
      />
      <View style={[styles.container, {padding: 10}]}>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.subHeading}>
          Please fill in your email and password to login to your account.
        </Text>
      </View>
    </View>
  );
};

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await login({email, password});

      setLoading(false);

      const {success, token, data} = res.data;

      if (success) {
        dispatch(storeUser(data));
        dispatch(storeToken(token));
        dispatch(storeType(data.type));
      }
    } catch (err) {
      setLoading(false);
      if (err?.response?.status === 401) {
        Alert.alert('Alert', 'Invalid email or password');
        return;
      }

      const {errors} = err?.response?.data;

      if (errors) {
        Alert.alert('Alert', JSON.stringify(errors));
      }
    }
  };

  useEffect(() => {
    const subscribe = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert('Alert', 'Exit app?', [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    });

    return () => subscribe.remove();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.formContainer}>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.inputEmail}
          onChangeText={setEmail}
          value={email}
        />
        <Text style={styles.password}>Password</Text>
        <TextInput
          placeholder="Password"
          style={styles.inputPassword}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <View style={styles.button}>
          <Button
            title="Login"
            color={themeColor}
            onPress={handleLogin}
            disabled={loading}
          />
        </View>
        <Pressable
          style={styles.footerText}
          onPress={() => navigation.navigate('SignUpScreen')}>
          <Text>Register now</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  formContainer: {
    padding: 20,
  },
  headingText: {
    color: '#74C042',
    fontSize: 30,
    marginTop: 20,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 16,
  },
  image: {
    height: 260,
    width: '100%',
  },
  inputEmail: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 10},
    elevation: 5,
    shadowOpacity: 0.1,
  },
  inputPassword: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 10},
    elevation: 5,
    shadowOpacity: 0.1,
  },
  password: {
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
  },
  footerText: {
    marginVertical: 10,
    alignSelf: 'center',
  },
});

export default LoginScreen;
