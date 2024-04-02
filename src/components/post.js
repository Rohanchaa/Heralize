import {Camera} from 'lucide-react-native';
import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Post = () => {
  return (
    <View
      style={{
        paddingHorizontal: 15,
        paddingVertical: 7,
        marginBottom: 7,
        elevation: 1,
        borderWidth: 1,
        borderColor: '#ccc',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 7,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 13}}> </Text>
          <Text style={{fontSize: 13, color: '#0064bd'}} onPress={() => {}}>
            @{'herald'} ·{' '}
          </Text>
          <Text style={{fontSize: 12, color: '#666'}}></Text>
        </View>
      </View>
      <Text style={{fontSize: 17, fontWeight: 'bold'}}>
        Attention: New Parking Guidelines 🚗
      </Text>
      <Text style={{fontSize: 13, color: '#333'}}>
        "Dear Heraldians, effective immediately, we've updated our parking
        guidelines to enhance your campus experience. Find /.your designated
        parking zones, discover time savin...
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 12,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity>
            <Icon name="arrow-upward" size={20} color="#900" />
          </TouchableOpacity>
          <Text style={{marginHorizontal: 5}}></Text>

          <TouchableOpacity>
            <Icon name="arrow-up" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity activeOpacity={0.7}>
          <Icon name="arrow-up" size={20} color="#333" />
          <Text style={{marginLeft: 3}}></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Post;
