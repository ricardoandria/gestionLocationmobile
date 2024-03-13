import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import axios from 'axios';

interface EditLocationModalProps {
  visible: boolean;
  onClose: () => void;
  id: string;
}

const EditLocationModal: React.FC<EditLocationModalProps> = ({
  visible,
  onClose,
  id,
}) => {
  const [nom, setNom] = useState('');
  const [designVoiture, setDesignVoiture] = useState('');
  const [nombreJour, setNombreJour] = useState('');
  const [tauxJournalier, setTauxJournalier] = useState('');

  useEffect(() => {
    // Fetch location details based on ID when modal becomes visible
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.123.241:5000/location/${id}`,
        );
        const locationData = response.data;
        setNom(locationData.nom);
        setDesignVoiture(locationData.designVoiture);
        setNombreJour(locationData.nombreJour.toString());
        setTauxJournalier(locationData.tauxJournalier.toString());
      } catch (error) {
        console.error('Error fetching location details:', error);
      }
    };

    if (visible && id) {
      fetchData();
    }
  }, [visible, id]);

  const handleSubmit = async () => {
    const updatedLocation = {
      nom,
      designVoiture,
      nombreJour: parseInt(nombreJour),
      tauxJournalier: parseInt(tauxJournalier),
    };

    try {
      await axios.put(
        `http://192.168.123.241:5000/location/${id}`,
        updatedLocation,
      );
      onClose();
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContent}>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={nom}
          onChangeText={setNom}
        />
        <TextInput
          style={styles.input}
          placeholder="Designation de Voiture"
          value={designVoiture}
          onChangeText={setDesignVoiture}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre de Jour"
          value={nombreJour}
          onChangeText={setNombreJour}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Taux Journalier"
          value={tauxJournalier}
          onChangeText={setTauxJournalier}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Modifier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}> Annuler</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: '90%',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '90%',
  },
});

export default EditLocationModal;
