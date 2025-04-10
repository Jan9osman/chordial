import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Alert,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();

  const [isLoggedIn, setIsLoggedIn] = useState(route.params?.isLoggedIn || false);
  const [profileImage, setProfileImage] = useState('https://img.freepik.com/free-photo/close-up-portrait-beautiful-cat_23-2149214419.jpg');
  const [name, setName] = useState('John Doe');
  const [bio, setBio] = useState('Music Enjoyer | Cat Lover');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editBio, setEditBio] = useState(bio);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isBioFocused, setIsBioFocused] = useState(false);
  const [imageUri, setImageUri] = useState(null);

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

  useEffect(() => {
    if (!isLoggedIn && !route.params?.isLoggedIn) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    }
  }, []);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: () => navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] }),
      },
    ]);
  };

  const handleEditProfile = () => {
    setEditName(name);
    setEditBio(bio);
    setImageUri(null);
    setIsEditModalVisible(true);
  };

  const handleSaveProfile = () => {
    if (!editName.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    setName(editName);
    setBio(editBio);
    if (imageUri) setProfileImage(imageUri);
    setIsEditModalVisible(false);
    Alert.alert("Success", "Profile updated successfully");
  };

  const handleSelectImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      Alert.alert("Image Selected", "Your profile picture has been updated!");
    }
  };

  const renderAlbumItem = ({ item }) => (
    <View style={{ alignItems: 'center', marginRight: 15 }}>
      <Image source={{ uri: item.cover }} style={{ width: width * 0.4, height: width * 0.4, borderRadius: 10 }} />
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>{item.title}</Text>
      <Text style={{ fontSize: 12, color: '#666', textAlign: 'center' }}>{item.artist}</Text>
    </View>
  );

  const renderArtistItem = ({ item }) => (
    <View style={{ alignItems: 'center', marginRight: 15 }}>
      <Image source={{ uri: item.image }} style={{ width: width * 0.25, height: width * 0.25, borderRadius: width * 0.125 }} />
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
          <Image source={{ uri: profileImage }} style={{ width: width * 0.25, height: width * 0.25, borderRadius: width * 0.125 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginLeft: 20 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>15</Text>
              <Text style={{ fontSize: 14, color: '#666' }}>Playlists</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>1.2K</Text>
              <Text style={{ fontSize: 14, color: '#666' }}>Followers</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>350</Text>
              <Text style={{ fontSize: 14, color: '#666' }}>Following</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
            <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>{bio}</Text>
          </View>
          <TouchableOpacity style={{ backgroundColor: '#0554fe', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, marginLeft: 10 }} onPress={handleEditProfile}>
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Your Spotify Wrapped</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ backgroundColor: '#f0f0f0', padding: 15, borderRadius: 10, alignItems: 'center', flex: 1, marginRight: 5 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>67,235</Text>
              <Text style={{ fontSize: 14, color: '#666' }}>Minutes Listened</Text>
            </View>
            <View style={{ backgroundColor: '#f0f0f0', padding: 15, borderRadius: 10, alignItems: 'center', flex: 1, marginLeft: 5 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>567</Text>
              <Text style={{ fontSize: 14, color: '#666' }}>Tracks Played</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Top Artists</Text>
          <FlatList
            data={topArtists}
            renderItem={renderArtistItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          />
        </View>

        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Favorite Tracks</Text>
          <FlatList
            data={favoriteTracks}
            renderItem={renderAlbumItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          />
        </View>

        <TouchableOpacity style={{ backgroundColor: '#f0f0f0', margin: 20, padding: 15, borderRadius: 5, alignItems: 'center' }} onPress={handleLogout}>
          <Text style={{ color: '#0554fe', fontSize: 16, fontWeight: 'bold' }}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ backgroundColor: 'white', padding: width * 0.05, borderTopLeftRadius: 20, borderTopRightRadius: 20, minHeight: height * 0.6 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
                  <Text style={{ fontSize: 16, color: '#999' }}>Cancel</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Edit Profile</Text>
                <TouchableOpacity onPress={handleSaveProfile}>
                  <Text style={{ fontSize: 16, color: '#0554fe' }}>Save</Text>
                </TouchableOpacity>
              </View>

              <ScrollView contentContainerStyle={{ paddingVertical: 10 }} keyboardShouldPersistTaps="handled">
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                  <Image
                    source={{ uri: imageUri || profileImage }}
                    style={{ width: width * 0.25, height: width * 0.25, borderRadius: width * 0.125, marginBottom: 10 }}
                  />
                  <TouchableOpacity
                    style={{ backgroundColor: '#f0f0f0', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 }}
                    onPress={handleSelectImage}
                  >
                    <Text style={{ fontSize: 14, color: '#0554fe' }}>
                      {imageUri ? 'Change Selected Image' : 'Change Profile Picture'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Name</Text>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: isNameFocused ? '#0554fe' : '#ddd',
                      borderRadius: 10,
                      padding: 10,
                      marginBottom: 15,
                      fontSize: 14,
                    }}
                    value={editName}
                    onChangeText={setEditName}
                    placeholder="Enter your name"
                    onFocus={() => setIsNameFocused(true)}
                    onBlur={() => setIsNameFocused(false)}
                  />

                  <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Bio</Text>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: isBioFocused ? '#0554fe' : '#ddd',
                      borderRadius: 10,
                      padding: 10,
                      fontSize: 14,
                      height: 100,
                      textAlignVertical: 'top',
                    }}
                    value={editBio}
                    onChangeText={setEditBio}
                    placeholder="Tell us about yourself"
                    multiline
                    numberOfLines={4}
                    onFocus={() => setIsBioFocused(true)}
                    onBlur={() => setIsBioFocused(false)}
                  />
                </View>
              </ScrollView>

              <TouchableOpacity style={{ backgroundColor: '#0554fe', paddingVertical: 12, borderRadius: 5, alignItems: 'center' }} onPress={handleSaveProfile}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;
