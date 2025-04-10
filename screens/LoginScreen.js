import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Modal,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const screenWidth = Platform.OS === 'web' ? 430 : width;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = () => {
    navigation.navigate('MainApp', {
      screen: 'Profile',
      params: { isLoggedIn: true },
    });
  };

  const dismissKeyboard = () => Keyboard.dismiss();

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff',
      maxWidth: 430,
      alignSelf: 'center',
      width: '100%',
    },
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: screenWidth * 0.08,
    },
    appName: {
      fontSize: screenWidth * 0.12,
      fontWeight: 'bold',
      color: '#007BFF',
      marginBottom: screenWidth * 0.03,
      textAlign: 'center',
    },
    title: {
      fontSize: screenWidth * 0.08,
      fontWeight: '700',
      marginBottom: screenWidth * 0.06,
      color: '#333',
      textAlign: 'center',
    },
    inputLabel: {
      fontSize: screenWidth * 0.04,
      fontWeight: '600',
      marginBottom: screenWidth * 0.015,
      color: '#333',
    },
    input: {
      width: '100%',
      height: screenWidth * 0.12,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      paddingHorizontal: screenWidth * 0.03,
      marginBottom: screenWidth * 0.045,
      fontSize: screenWidth * 0.04,
      backgroundColor: '#f9f9f9',
    },
    button: {
      width: '100%',
      height: screenWidth * 0.12,
      backgroundColor: '#007BFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginTop: screenWidth * 0.04,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginVertical: screenWidth * 0.05,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#ddd',
    },
    dividerText: {
      marginHorizontal: 10,
      color: '#999',
      fontSize: screenWidth * 0.035,
    },
    spotifyButton: {
      width: '100%',
      height: screenWidth * 0.12,
      backgroundColor: '#1DB954',
      borderRadius: 10,
      marginBottom: screenWidth * 0.06,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    spotifyIcon: {
      width: screenWidth * 0.08,
      height: screenWidth * 0.08,
      marginRight: screenWidth * 0.02,
    },
    spotifyButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    signUpText: {
      color: '#007BFF',
      fontSize: screenWidth * 0.035,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: screenWidth * 0.05,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modalContent: {
      width: screenWidth * 0.85,
      backgroundColor: '#121212',
      borderRadius: 16,
      padding: screenWidth * 0.08,
      alignItems: 'center',
    },
    modalLogo: {
      width: screenWidth * 0.4,
      height: screenWidth * 0.1,
      marginBottom: screenWidth * 0.06,
    },
    modalTitle: {
      color: '#fff',
      fontSize: screenWidth * 0.06,
      fontWeight: 'bold',
      marginBottom: screenWidth * 0.06,
    },
    modalLabel: {
      alignSelf: 'flex-start',
      color: '#fff',
      fontSize: screenWidth * 0.035,
      marginBottom: screenWidth * 0.015,
    },
    modalInput: {
      width: '100%',
      height: screenWidth * 0.12,
      borderWidth: 1,
      borderColor: '#333',
      borderRadius: 5,
      paddingHorizontal: screenWidth * 0.03,
      marginBottom: screenWidth * 0.045,
      fontSize: screenWidth * 0.04,
      backgroundColor: '#222',
      color: '#fff',
    },
    modalLoginButton: {
      width: '100%',
      height: screenWidth * 0.12,
      backgroundColor: '#1DB954',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: screenWidth * 0.04,
    },
    modalLoginText: {
      color: '#fff',
      fontSize: screenWidth * 0.04,
      fontWeight: 'bold',
    },
    modalCancel: {
      width: '100%',
      height: screenWidth * 0.12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalCancelText: {
      color: '#fff',
      fontSize: screenWidth * 0.04,
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.appName}>Chordial</Text>
          <Text style={styles.title}>Welcome Back!</Text>

          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="your.email@example.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Your password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.spotifyButton}
            onPress={() => setModalVisible(true)}
          >
            <Image
              source={{
                uri: 'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png',
              }}
              style={styles.spotifyIcon}
            />
            <Text style={styles.spotifyButtonText}>Login with Spotify</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Spotify Login Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <Image
                  source={{
                    uri: 'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png',
                  }}
                  style={styles.modalLogo}
                  resizeMode="contain"
                />
                <Text style={styles.modalTitle}>Login to Spotify</Text>

                <Text style={styles.modalLabel}>Email or username</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Email or username"
                  placeholderTextColor="#888"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />

                <Text style={styles.modalLabel}>Password</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Password"
                  placeholderTextColor="#888"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />

                <TouchableOpacity
                  style={styles.modalLoginButton}
                  onPress={() => {
                    setModalVisible(false);
                    handleLogin();
                  }}
                >
                  <Text style={styles.modalLoginText}>LOG IN</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalCancel}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalCancelText}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default LoginScreen;
