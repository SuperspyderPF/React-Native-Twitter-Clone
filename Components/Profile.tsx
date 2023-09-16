import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useProfile } from './ProfileContext';

export default function Profile() {
    const [name, setName] = React.useState('');
    const [nickname, setNickname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [imageUri, setImageUri] = React.useState(null);
    const [savedProfile, setSavedProfile] = React.useState({});
    const [editable, setEditable] = React.useState(true);

    const profile = useProfile();
  
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1], 
          quality: 1,
        });
      
        if (!result.cancelled && result.assets && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
        }          
      };      
  
    const saveProfile = () => {
      const profileData = {name, nickname, email, imageUri};
      profile.setName(name);
      profile.setNickname(nickname); 
      profile.setImageUri(imageUri);
      setSavedProfile(profileData);
      setEditable(false);
    };

    const editProfile = () => {
      setEditable(true);
    };
  
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.profileImage} />
            ) : (
              <Text style={styles.addIcon}>+</Text>
            )}
          </TouchableOpacity>
    
          {editable ? (
            <>
              <PaperTextInput label="Name" value={name} onChangeText={setName} style={styles.input} mode="outlined" />
              <PaperTextInput label="Nickname" value={nickname} onChangeText={setNickname} style={styles.input} mode="outlined" />
              <PaperTextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} mode="outlined" />
            </>
          ) : (
            <>
              <Text style={styles.textValue}>{name}</Text>
              <Text style={styles.textValue}>{nickname}</Text>
              <Text style={styles.textValue}>{email}</Text>
            </>
          )}
    
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={saveProfile}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
    
            <TouchableOpacity style={styles.button} onPress={editProfile}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    input: {
        marginBottom: 16,
        width: '100%',
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    addIcon: {
        fontSize: 32,
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#4CAF50', 
        paddingHorizontal: 20,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    saveText: {
        color: '#fff', 
    },
    editButton: {
        backgroundColor: '#FFA500', 
        paddingHorizontal: 20,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    editText: {
        color: '#fff',
    },
    textValue: {
        fontSize: 16,
        marginBottom: 16,
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#6495ED',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 4,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
    },
});