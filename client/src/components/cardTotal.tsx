import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type LocationItem = {
  nombreJour: number;
  tauxJournalier: number;
};

const CardTotal = () => {
  const [location, setLocation] = useState<LocationItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.88.21:5000/location/');
        setLocation(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Function to calculate total rent
  const calculateTotalRent = () => {
    let totalRent = 0;
    location.forEach(item => {
      totalRent += item.nombreJour * item.tauxJournalier;
    });
    return totalRent;
  };

  // Function to calculate minimal rent
  const calculateMinimalRent = () => {
    if (location.length === 0) return 0;
    let minimalRent = location[0].nombreJour * location[0].tauxJournalier;
    location.forEach(item => {
      const rent = item.nombreJour * item.tauxJournalier;
      if (rent < minimalRent) minimalRent = rent;
    });
    return minimalRent;
  };

  // Function to calculate maximal rent
  const calculateMaximalRent = () => {
    if (location.length === 0) return 0;
    let maximalRent = location[0].nombreJour * location[0].tauxJournalier;
    location.forEach(item => {
      const rent = item.nombreJour * item.tauxJournalier;
      if (rent > maximalRent) maximalRent = rent;
    });
    return maximalRent;
  };

  return (
    <View style={styles.container}>
      <View style={styles.totalItems}>
        <Text style={styles.title}>Loyer Total:</Text>
        <Text style={styles.value}>{calculateTotalRent()} Ar</Text>
      </View>
      <View style={styles.totalItems}>
        <Text style={styles.title}>Loyer Minimal:</Text>
        <Text style={styles.value}>{calculateMinimalRent()} Ar</Text>
      </View>
      <View style={styles.totalItems}>
        <Text style={styles.title}>Loyer Maximal:</Text>
        <Text style={styles.value}>{calculateMaximalRent()} Ar</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#2c3e50',
    borderWidth: 1,
    padding: 5,
    gap: 5,
    borderRadius: 5,
  },
  totalItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
  },
});

export default CardTotal;
