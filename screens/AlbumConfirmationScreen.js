import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';

const AlbumConfirmationScreen = ({ route, navigation }) => {
  const { album } = route.params;

  const openSpotify = () => {
    Linking.openURL(album.spotifyUrl);
    navigation.goBack(); // Close screen after opening Spotify
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: album.cover }} style={styles.albumCover} />
      <Text style={styles.promptText}>Open album in Spotify?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={openSpotify}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.declineButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  albumCover: { width: 150, height: 150, borderRadius: 10, marginBottom: 20 },
  promptText: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', gap: 20 },
  confirmButton: { backgroundColor: '#1DB954', padding: 12, borderRadius: 5 },
  declineButton: { backgroundColor: '#d32f2f', padding: 12, borderRadius: 5 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default AlbumConfirmationScreen;
