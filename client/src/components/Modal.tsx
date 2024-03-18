import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface AddLocationModalProps {
  visible: boolean;
  onClose: () => void;
}

interface LocationItem {
  nom: string;
  designVoiture: string;
  nombreJour: number;
  tauxJournalier: number;
}

const AddLocationModal: React.FC<AddLocationModalProps> = ({
  visible,
  onClose,
}) => {
  const [nom, setNom] = useState('');
  const [designVoiture, setDesignVoiture] = useState('');
  const [nombreJour, setNombreJour] = useState('');
  const [tauxJournalier, setTauxJournalier] = useState('');

  const handleSubmit = async () => {
    const newLocation: LocationItem = {
      nom,
      designVoiture,
      nombreJour: parseInt(nombreJour),
      tauxJournalier: parseInt(tauxJournalier),
    };

    await axios
      .post('http://192.168.88.21:5000/location/', newLocation)
      .then(response => {
        console.log('Location added successfully:', response.data);
        onClose();
      })
      .catch(error => {
        console.error('Error adding location:', error);
      });

    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      style={{width: '80%'}}>
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
          <Text style={styles.buttonText}> Ajouter</Text>
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
    zIndex: 7,
    backgroundColor: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    marginBottom: 10,
    width: '90%',
  },
});

export default AddLocationModal;
