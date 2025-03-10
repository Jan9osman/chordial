import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, Alert } from 'react-native';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check credentials
    if (email === 'johndoe@gmail.com' && password === 'password') {
      // Navigate to the Profile screen inside MainApp
      navigation.navigate('MainApp', { screen: 'Profile' });
    } else {
      // Show an error message
      Alert.alert('Error', 'Invalid email or password.');
    }
  };

  const handleSpotifyLogin = () => {
    Alert.alert('Info', 'Login with Spotify clicked!');
  };

  return (
    <View style={styles.container}>
      {/* App Name */}
      <Text style={styles.appName}>Chordial</Text>

      {/* Welcome Title */}
      <Text style={styles.title}>Welcome Back!</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Login with Spotify Button */}
      <TouchableOpacity style={styles.spotifyButton} onPress={handleSpotifyLogin}>
        <Image
          source={{ uri: 'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png' }}
          style={styles.spotifyIcon}
        />
        <Text style={styles.spotifyButtonText}>Login with Spotify</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <TouchableOpacity>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05,
    backgroundColor: '#fff',
  },
  appName: {
    fontSize: width * 0.1,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: width * 0.03,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    marginBottom: width * 0.1,
  },
  input: {
    width: '100%',
    height: width * 0.12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: width * 0.03,
    marginBottom: width * 0.05,
  },
  button: {
    width: '100%',
    height: width * 0.12,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: width * 0.03,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: width * 0.05,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: width * 0.03,
    color: '#666',
    fontSize: width * 0.04,
  },
  spotifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: width * 0.12,
    backgroundColor: '#1DB954',
    borderRadius: 5,
    marginBottom: width * 0.03,
  },
  spotifyIcon: {
    width: width * 0.06,
    height: width * 0.06,
    marginRight: width * 0.03,
  },
  spotifyButtonText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#007BFF',
    fontSize: width * 0.04,
  },
});

export default LoginScreen;