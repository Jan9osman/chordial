import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  useWindowDimensions,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const SignUpScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const screenWidth = Platform.OS === 'web' ? 430 : width;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [imageUri, setImageUri] = useState('https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg');

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setErrorMessage('');
    // Pass profile image if needed
    navigation.navigate('LoginScreen');
  };

  const handleSelectImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Required', 'Please allow access to your photo library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff',
      maxWidth: 430,
      alignSelf: 'center',
      width: '100%',
    },
    scrollContent: {
      paddingTop: 60,
      paddingBottom: 60,
      paddingHorizontal: screenWidth * 0.08,
      alignItems: 'center',
    },
    profileImageContainer: {
      alignItems: 'center',
      marginBottom: 24,
    },
    profileImage: {
      width: screenWidth * 0.25,
      height: screenWidth * 0.25,
      borderRadius: screenWidth * 0.125,
      marginBottom: 10,
    },
    changeImageButton: {
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 15,
      paddingVertical: 6,
      borderRadius: 20,
    },
    changeImageText: {
      color: '#007BFF',
      fontSize: 14,
      fontWeight: '600',
    },
    title: {
      fontSize: screenWidth * 0.08,
      fontWeight: 'bold',
      color: '#007BFF',
      marginBottom: 24,
    },
    inputLabel: {
      alignSelf: 'flex-start',
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 6,
      color: '#333',
    },
    input: {
      width: '100%',
      height: 48,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      paddingHorizontal: 12,
      backgroundColor: '#f9f9f9',
      fontSize: 16,
      marginBottom: 16,
    },
    button: {
      width: '100%',
      height: 48,
      backgroundColor: '#007BFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginTop: 8,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    errorMessage: {
      color: 'red',
      fontSize: 14,
      marginBottom: 12,
      textAlign: 'center',
    },
    footerText: {
      color: '#007BFF',
      fontSize: 14,
      marginTop: 24,
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.profileImageContainer}>
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
          <TouchableOpacity onPress={handleSelectImage} style={styles.changeImageButton}>
            <Text style={styles.changeImageText}>Change Profile Picture</Text>
          </TouchableOpacity>
        </View>

        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

        <Text style={styles.inputLabel}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.inputLabel}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.footerText}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
