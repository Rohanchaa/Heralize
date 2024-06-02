import {useState} from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import {register} from '../../../services/auth_service';

const themeColor = '#74C042';

const SignUpInput = () => {
  const navigation = useNavigation();
  const btnactin = () => {
    navigation.navigate('Login');
  };
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [confirmpassword, setconfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    contact_number: '',
    password: '',
    confirm_password: '',
    gender: '',
  });
  const [admin, setAdmin] = useState(false);
  const [gender, setGender] = useState('male');

  const onRegisterPress = () => {
    setLoading(true);

    setErrors({});

    register({
      name,
      email,
      contact_number: contactNumber,
      password,
      confirm_password: confirmpassword,
      gender,
      type: admin ? 'admin' : 'user',
    })
      .then(res => {
        setLoading(false);
        const {success} = res.data;

        if (success) {
          Alert.alert('Success', 'You have been registered');
          navigation.goBack();
        }
      })
      .catch(err => {
        setLoading(false);

        console.log(err?.response?.data);

        const {errors} = err?.response?.data;

        if (errors) {
          setErrors(errors);
        }
      });
  };

  return (
    <ScrollView contentContainerStyle={Styles.container}>
      <Text style={Styles.toptext}>Full Name</Text>
      <TextInput
        placeholder="Name"
        style={Styles.inputEmail}
        onChangeText={setname}
        value={name}
      />
      {errors.name && <Text style={Styles.error}>{errors.name}</Text>}
      <Text style={Styles.toptext}>Email</Text>
      <TextInput
        placeholder="Email"
        style={Styles.inputEmail}
        onChangeText={setEmail}
        value={email}
      />
      {errors.email && <Text style={Styles.error}>{errors.email}</Text>}

      <Text style={Styles.toptext}>Contact number</Text>
      <TextInput
        placeholder="Contact number"
        style={Styles.inputEmail}
        onChangeText={setContactNumber}
        value={contactNumber}
      />
      {errors.contact_number && (
        <Text style={Styles.error}>{errors.contact_number}</Text>
      )}

      <View style={Styles.pass}>
        <Text style={Styles.toptext}>Password</Text>
        <TextInput
          placeholder="Password"
          style={Styles.inputPassword}
          onChangeText={setPassword}
          value={password}
        />
        {errors.password && <Text style={Styles.error}>{errors.password}</Text>}

        <Text style={Styles.toptext}>Confirm Password</Text>
        <TextInput
          placeholder="Password"
          style={Styles.inputPassword}
          onChangeText={setconfirmPassword}
          value={confirmpassword}
        />
        {errors.confirm_password && (
          <Text style={Styles.error}>{errors.confirm_password}</Text>
        )}
      </View>
      <View style={Styles.genderView}>
        <View style={Styles.section}>
          <CheckBox
            value={gender === 'male'}
            onChange={() => setGender('male')}
          />
          <Text style={Styles.text}>Male</Text>
        </View>
        <View style={Styles.section}>
          <CheckBox
            value={gender === 'female'}
            onChange={() => setGender('female')}
          />
          <Text style={Styles.text}>Female</Text>
        </View>
      </View>
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Switch value={admin} onChange={() => setAdmin(!admin)} />
        <Text style={{paddingHorizontal: 10}}>Register as admin</Text>
      </View> */}

      <View style={Styles.button}>
        <Button
          title="SignUp"
          color={themeColor}
          onPress={onRegisterPress}
          disabled={loading}
        />
      </View>

      <View style={Styles.loginbutton}>
        <TouchableOpacity onPress={btnactin}>
          <Text style={Styles.signupText}>Already Have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 3,
    padding: 20,
  },
  toptext: {
    marginTop: 10,
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
  button: {
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
  },
  signupText: {
    alignItems: 'center',
    fontSize: 13,
    color: '#74C042',
    textDecorationLine: 'underline',
  },
  pass: {},
  loginbutton: {
    alignItems: 'center',
  },
  error: {
    fontSize: 12,
    color: 'tomato',
    marginVertical: 10,
  },
  genderView: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    paddingHorizontal: 10,
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SignUpInput;
