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
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { width } = useWindowDimensions();

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
    navigation.navigate('LoginScreen');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: width * 0.06,
      paddingBottom: width * 0.2, // enough space for safe area
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
    errorMessage: {
      color: 'red',
      marginBottom: width * 0.04,
      fontSize: width * 0.04,
      textAlign: 'center',
      width: '100%',
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
      borderRadius: 10,
      paddingHorizontal: width * 0.03,
      marginBottom: width * 0.045,
      backgroundColor: '#f9f9f9',
      fontSize: width * 0.04,
    },
    button: {
      width: '100%',
      height: width * 0.12,
      backgroundColor: '#007BFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginBottom: width * 0.05,
    },
    buttonText: {
      color: '#fff',
      fontSize: width * 0.045,
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
    loginText: {
      color: '#007BFF',
      fontSize: width * 0.04,
      marginTop: width * 0.02,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.appName}>Chordial</Text>
            <Text style={styles.title}>Create Account</Text>

            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Your name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="your.email@example.com"
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
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.loginText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignUpScreen;
