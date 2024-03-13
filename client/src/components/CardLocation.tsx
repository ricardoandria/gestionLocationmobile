import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import EditLocationModal from './EditModal';

type Props = {};

type Item = {
  id: string;
  nom: string;
  designVoiture: string;
  nombreJour: number;
  tauxJournalier: number;
};

const LocationItem = ({
  id,
  nom,
  designVoiture,
  nombreJour,
  tauxJournalier,
  onDelete,
  onEdit,
  setIsModalVisible,
  setIdPass,
}: Item & {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIdPass: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleEdit = () => {
    onEdit(id);
    setIsModalVisible(true);
    setIdPass(id);
  };

  return (
    <View style={styles.cardContent}>
      <View>
        <View style={styles.itemTitle}>
          <Text style={styles.title}>Nom de la Location:</Text>
          <Text style={styles.content}>{nom}</Text>
        </View>
        <View style={styles.itemTitle}>
          <Text style={styles.title}>Designation de Voiture:</Text>
          <Text style={styles.content}>{designVoiture}</Text>
        </View>
        <View style={styles.itemTitle}>
          <Text style={styles.title}>Nombre de Jours:</Text>
          <Text style={styles.content}>{nombreJour}</Text>
        </View>
        <View style={styles.itemTitle}>
          <Text style={styles.title}>Taux Journalier:</Text>
          <Text style={styles.content}>{tauxJournalier}</Text>
        </View>
        <View style={styles.itemTitle}>
          <Text style={styles.title}>Loyer:</Text>
          <Text style={styles.content}>{nombreJour * tauxJournalier}</Text>
        </View>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={() => onDelete(id)}>
          <Icon name="delete" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEdit}>
          <Icon name="edit" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CardLocation = (props: Props) => {
  const [location, setLocation] = useState<Item[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idPass, setIdPass] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://192.168.123.241:5000/location/',
        );
        setLocation(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [location]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://192.168.123.241:5000/location/${id}`);
      setLocation(prevLocation => prevLocation.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (id: string) => {
    setIsModalVisible(true);
    setIdPass(id);
  };

  const renderItem = ({item}: {item: Item}) => (
    <LocationItem
      {...item}
      onDelete={handleDelete}
      onEdit={handleEdit}
      setIsModalVisible={setIsModalVisible}
      setIdPass={setIdPass}
    />
  );

  return (
    <View style={styles.container}>
      {location ? (
        <FlatList
          data={location}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text>No data available</Text>
      )}
      {/* Le modal d'édition */}
      <EditLocationModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        id={idPass}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    zIndex: 0,
    marginTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  cardContent: {
    borderColor: '#2c3e50',
    borderWidth: 1,
    padding: 10,
    gap: 5,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemTitle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
  },
  content: {
    color: 'black',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
    paddingRight: 10,
  },
});

export default CardLocation;
