import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, FlatList, Alert } from 'react-native';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ route, navigation }) => {
  // Get the login state from route params if available
  const [isLoggedIn, setIsLoggedIn] = useState(route.params?.isLoggedIn || false);
  
  const profileImage = 'https://img.freepik.com/free-photo/close-up-portrait-beautiful-cat_23-2149214419.jpg';

  const favoriteTracks = [
    { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', cover: 'https://m.media-amazon.com/images/I/61VWSXTDFfL._UF1000,1000_QL80_.jpg' },
    { id: '2', title: 'Shape of You', artist: 'Ed Sheeran', cover: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png' },
    { id: '3', title: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png' },
    { id: '4', title: 'Stairway to Heaven', artist: 'Led Zeppelin', cover: 'https://www.ultimate-guitar.com/static/article/news/1/69761_ver1516630290.jpg' },
    { id: '5', title: 'Rolling in the Deep', artist: 'Adele', cover: 'https://upload.wikimedia.org/wikipedia/en/7/74/Adele_-_Rolling_in_the_Deep.png' },
  ];

  const topArtists = [
    { id: '1', name: 'The Weeknd', image: 'https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae' },
    { id: '2', name: 'Ed Sheeran', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ed_Sheeran-6886_%28cropped%29.jpg/800px-Ed_Sheeran-6886_%28cropped%29.jpg' },
    { id: '3', name: 'Adele', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Adele_2016.jpg' },
    { id: '4', name: 'Dua Lipa', image: 'https://m.media-amazon.com/images/I/71AyfVKzxLL._UF1000,1000_QL80_.jpg' },
    { id: '5', name: 'Justin Bieber', image: 'https://cdn.britannica.com/68/226968-050-C2FF98B9/Canadian-singer-Justin-Bieber-2021.jpg' },
  ];

  const handleLogout = () => {
    // Confirm logout
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Yes", 
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            });
          }
        }
      ]
    );
  };

  // Check login status on mount
  useEffect(() => {
    if (!isLoggedIn && !route.params?.isLoggedIn) {
      // Reset the navigation state and navigate to LoginScreen
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    }
  }, []);

  const renderAlbumItem = ({ item }) => (
    <View style={styles.albumContainer}>
      <Image source={{ uri: item.cover }} style={styles.albumCover} />
      <Text style={styles.albumTitle}>{item.title}</Text>
      <Text style={styles.albumArtist}>{item.artist}</Text>
    </View>
  );

  const renderArtistItem = ({ item }) => (
    <View style={styles.artistContainer}>
      <Image source={{ uri: item.image }} style={styles.artistImage} />
      <Text style={styles.artistName}>{item.name}</Text>
    </View>
  );

  // Show profile information if logged in
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Playlists</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.2K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>350</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      {/* Bio Section */}
      <View style={styles.bioContainer}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.bio}>Music Enjoyer | Cat Lover </Text>
      </View>

      {/* Spotify Wrapped Stats Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Spotify Wrapped</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumberLarge}>67,235</Text>
            <Text style={styles.statLabelLarge}>Minutes Listened</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumberLarge}>567</Text>
            <Text style={styles.statLabelLarge}>Tracks Played</Text>
          </View>
        </View>
      </View>

      {/* Top Artists Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Artists</Text>
        <FlatList
          data={topArtists}
          renderItem={renderArtistItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>

      {/* Favorite Tracks Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorite Tracks</Text>
        <FlatList
          data={favoriteTracks}
          renderItem={renderAlbumItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButtonFull} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  bioContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statNumberLarge: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabelLarge: {
    fontSize: 14,
    color: '#666',
  },
  albumContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  albumCover: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  albumTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  albumArtist: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  artistContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  artistName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  horizontalList: {
    paddingRight: 20,
  },
  logoutButtonText: {
    color: '#0554fe',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButtonFull: {
    backgroundColor: '#f0f0f0',
    margin: 20,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default ProfileScreen;