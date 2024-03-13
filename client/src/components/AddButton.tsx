import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {};

const AddButton = ({setIsModalVisible}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnAdd}
        onPress={() => setIsModalVisible(true)}>
        <Icon name="plus" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  btnAdd: {
    backgroundColor: '#2c3e50',
    width: 45,
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});

export default AddButton;
