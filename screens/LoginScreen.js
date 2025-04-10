import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Modal, 
  TouchableWithoutFeedback, 
  Keyboard, 
  KeyboardAvoidingView, 
  Platform, 
  TextInput,
  StatusBar,
  SafeAreaView,
  useWindowDimensions
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { width } = useWindowDimensions();

  const handleLogin = () => {
    navigation.navigate('MainApp', { screen: 'Profile', params: { isLoggedIn: true }});
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Dynamic styles based on screen width
  const dynamicStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff',
    },
    loginContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: width * 0.08,
      backgroundColor: '#fff',
    },
    appName: {
      fontSize: width * 0.12,
      fontWeight: 'bold',
      color: '#007BFF',
      marginBottom: width * 0.03,
    },
    title: {
      fontSize: width * 0.08,
      fontWeight: '700',
      marginBottom: width * 0.06,
      color: '#333',
    },
    inputLabel: {
      alignSelf: 'flex-start',
      fontSize: width * 0.04,
      fontWeight: '600',
      marginBottom: width * 0.015,
      color: '#333',
    },
    input: {
      width: '100%',
      height: width * 0.12,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      paddingHorizontal: width * 0.03,
      marginBottom: width * 0.045,
      fontSize: width * 0.04,
      backgroundColor: '#f9f9f9',
    },
    button: {
      width: '100%',
      height: width * 0.12,
      backgroundColor: '#007BFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginBottom: width * 0.06,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    spotifyButton: {
      width: '100%',
      height: width * 0.12,
      backgroundColor: '#1DB954',
      borderRadius: 10,
      marginBottom: width * 0.06,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    spotifyIcon: {
      width: width * 0.08,
      height: width * 0.08,
      marginRight: width * 0.02,
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginBottom: width * 0.06,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#ddd',
    },
    dividerText: {
      marginHorizontal: 10,
      color: '#999',
      fontSize: width * 0.035,
    },
    signUpText: {
      color: '#007BFF',
      fontSize: width * 0.035,
      fontWeight: '600',
      marginTop: width * 0.03,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    spotifyModalContent: {
      width: width * 0.85,
      backgroundColor: '#121212',
      borderRadius: 16,
      padding: width * 0.08,
      alignItems: 'center',
    },
    spotifyModalLogo: {
      width: width * 0.4,
      height: width * 0.1,
      marginBottom: width * 0.06,
    },
    spotifyModalTitle: {
      color: '#fff',
      fontSize: width * 0.06,
      fontWeight: 'bold',
      marginBottom: width * 0.06,
    },
    spotifyInputLabel: {
      alignSelf: 'flex-start',
      color: '#fff',
      fontSize: width * 0.035,
      marginBottom: width * 0.015,
    },
    spotifyInput: {
      width: '100%',
      height: width * 0.12,
      borderWidth: 1,
      borderColor: '#333',
      borderRadius: 5,
      paddingHorizontal: width * 0.03,
      marginBottom: width * 0.045,
      fontSize: width * 0.04,
      backgroundColor: '#222',
      color: '#fff',
    },
    spotifyModalButton: {
      width: '100%',
      height: width * 0.12,
      backgroundColor: '#1DB954',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: width * 0.04,
    },
    spotifyModalButtonText: {
      color: '#fff',
      fontSize: width * 0.04,
      fontWeight: 'bold',
    },
    spotifyModalCancelButton: {
      width: '100%',
      height: width * 0.12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    spotifyModalCancelText: {
      color: '#fff',
      fontSize: width * 0.04,
      fontWeight: 'bold',
    }
  });

  // Static styles (colors, text styles, etc.)
  const staticStyles = StyleSheet.create({
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    spotifyButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={dynamicStyles.loginContainer}>
            {/* App Name */}
            <Text style={dynamicStyles.appName}>Chordial</Text>

            {/* Welcome Title */}
            <Text style={dynamicStyles.title}>Welcome Back!</Text>

            {/* Email Input */}
            <Text style={dynamicStyles.inputLabel}>Email</Text>
            <TextInput
              style={dynamicStyles.input}
              placeholder="your.email@example.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Password Input */}
            <Text style={dynamicStyles.inputLabel}>Password</Text>
            <TextInput
              style={dynamicStyles.input}
              placeholder="Your password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Login Button */}
            <TouchableOpacity 
              style={dynamicStyles.button} 
              onPress={handleLogin}
            >
              <Text style={staticStyles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={dynamicStyles.dividerContainer}>
              <View style={dynamicStyles.dividerLine} />
              <Text style={dynamicStyles.dividerText}>OR</Text>
              <View style={dynamicStyles.dividerLine} />
            </View>

            {/* Spotify Login Button */}
            <TouchableOpacity 
              style={dynamicStyles.spotifyButton}
              onPress={() => setModalVisible(true)}
            >
              <Image
                source={{ uri: 'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png' }}
                style={dynamicStyles.spotifyIcon}
              />
              <Text style={staticStyles.spotifyButtonText}>Login with Spotify</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={dynamicStyles.signUpText}>Don't have an account? Sign Up</Text>
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
                <View style={dynamicStyles.modalContainer}>
                  <TouchableWithoutFeedback onPress={dismissKeyboard}>
                    <View style={dynamicStyles.spotifyModalContent}>
                      {/* Spotify Logo */}
                      <Image
                        source={{ uri: 'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png' }}
                        style={dynamicStyles.spotifyModalLogo}
                        resizeMode="contain"
                      />
                      
                      <Text style={dynamicStyles.spotifyModalTitle}>Login to Spotify</Text>
                      
                      {/* Email Input */}
                      <Text style={dynamicStyles.spotifyInputLabel}>Email or username</Text>
                      <TextInput
                        style={dynamicStyles.spotifyInput}
                        placeholder="Email or username"
                        placeholderTextColor="#8c8c8c"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                      />
                      
                      {/* Password Input */}
                      <Text style={dynamicStyles.spotifyInputLabel}>Password</Text>
                      <TextInput
                        style={dynamicStyles.spotifyInput}
                        placeholder="Password"
                        placeholderTextColor="#8c8c8c"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                      />
                      
                      {/* Login Button */}
                      <TouchableOpacity 
                        style={dynamicStyles.spotifyModalButton} 
                        onPress={() => {
                          setModalVisible(false);
                          handleLogin();
                        }}
                      >
                        <Text style={dynamicStyles.spotifyModalButtonText}>LOG IN</Text>
                      </TouchableOpacity>
                      
                      {/* Cancel Button */}
                      <TouchableOpacity 
                        style={dynamicStyles.spotifyModalCancelButton} 
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={dynamicStyles.spotifyModalCancelText}>CANCEL</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginScreen;