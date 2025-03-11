import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Modal, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, TextInput } from 'react-native';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = () => {
    // Simulate login (no validation for now)
    // In a real app, you would authenticate and then navigate
    navigation.navigate('MainApp', { screen: 'Profile', params: { isLoggedIn: true }});
  };

  // Function to dismiss keyboard
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.loginContainer}>
          {/* App Name */}
          <Text style={styles.appName}>Chordial</Text>

          {/* Welcome Title */}
          <Text style={styles.title}>Welcome Back!</Text>

          {/* Email Input */}
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="your.email@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password Input */}
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Your password"
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
          <TouchableOpacity style={styles.spotifyButton} onPress={() => setModalVisible(true)}>
            <Image
              source={{ uri: 'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png' }}
              style={styles.spotifyIcon}
            />
            <Text style={styles.spotifyButtonText}>Login with Spotify</Text>
          </TouchableOpacity>

          {/* Spotify Login Modal */}
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            animationType="fade"
          >
            <TouchableWithoutFeedback onPress={() => {
              dismissKeyboard();
              setModalVisible(false);
            }}>
              <View style={styles.modalContainer}>
                <TouchableWithoutFeedback onPress={dismissKeyboard}>
                  <View style={styles.spotifyModalContent}>
                    {/* Spotify Logo */}
                    <Image
                      source={{ uri: 'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png' }}
                      style={styles.spotifyModalLogo}
                      resizeMode="contain"
                    />
                    
                    <Text style={styles.spotifyModalTitle}>Login to Spotify</Text>
                    
                    {/* Email Input */}
                    <Text style={styles.spotifyInputLabel}>Email or username</Text>
                    <TextInput
                      style={styles.spotifyInput}
                      placeholder="Email or username"
                      placeholderTextColor="#8c8c8c"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                    
                    {/* Password Input */}
                    <Text style={styles.spotifyInputLabel}>Password</Text>
                    <TextInput
                      style={styles.spotifyInput}
                      placeholder="Password"
                      placeholderTextColor="#8c8c8c"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />
                    
                    {/* Login Button */}
                    <TouchableOpacity style={styles.spotifyModalButton} onPress={() => {
                      setModalVisible(false);
                      handleLogin();
                    }}>
                      <Text style={styles.spotifyModalButtonText}>LOG IN</Text>
                    </TouchableOpacity>
                    
                    {/* Cancel Button */}
                    <TouchableOpacity 
                      style={styles.spotifyModalCancelButton} 
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.spotifyModalCancelText}>CANCEL</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          {/* Sign Up Link */}
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginContainer: {
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
    marginBottom: width * 0.05,
  },
  inputLabel: {
    alignSelf: 'flex-start',
    fontSize: width * 0.04,
    fontWeight: '600',
    marginBottom: width * 0.01,
    color: '#333',
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
  
  // Spotify-themed Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  spotifyModalContent: {
    width: '85%',
    backgroundColor: '#121212', // Spotify's dark background
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  spotifyModalLogo: {
    width: width * 0.4,
    height: width * 0.1,
    marginBottom: width * 0.05,
  },
  spotifyModalTitle: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: width * 0.05,
    textAlign: 'center',
  },
  spotifyInputLabel: {
    alignSelf: 'flex-start',
    fontSize: width * 0.035,
    fontWeight: '500',
    marginBottom: width * 0.01,
    color: '#FFFFFF',
  },
  spotifyInput: {
    width: '100%',
    height: width * 0.12,
    backgroundColor: '#282828', // Spotify's input background
    borderWidth: 0,
    borderRadius: 4,
    paddingHorizontal: width * 0.03,
    marginBottom: width * 0.05,
    color: '#FFFFFF',
    fontSize: width * 0.04,
  },
  spotifyModalButton: {
    width: '100%',
    height: width * 0.12,
    backgroundColor: '#1DB954', // Spotify green
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50, // Rounded button
    marginBottom: width * 0.03,
  },
  spotifyModalButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  spotifyModalCancelButton: {
    width: '100%',
    height: width * 0.12,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  spotifyModalCancelText: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
});

export default LoginScreen;