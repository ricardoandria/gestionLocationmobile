import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AddButton from '../components/AddButton';
import CardTotal from '../components/cardTotal';
import CardLocation from '../components/CardLocation';
import AddLocationModal from '../components/Modal';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {};

const LocationScreens = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        Location
        <Text style={styles.dot}>
          <Icon name="car" />
        </Text>
      </Text>
      <CardTotal />
      <CardLocation />
      <AddButton setIsModalVisible={setIsModalVisible} />
      <AddLocationModal visible={isModalVisible} onClose={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    position: 'relative',
    height: '100%',
  },
  logo: {
    fontSize: 24,
  },
  dot: {
    fontSize: 55,
    color: '#F9AA33',
  },
});

export default LocationScreens;
