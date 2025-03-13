import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, FlatList } from 'react-native';

const { width } = Dimensions.get('window');

const notificationsData = [
  {
    id: "1",
    type: "album",
    text: 'New hit single "Blinding Lights" by The Weeknd is out!',
    cover:
      "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png",
    time: "5h ago",
    isNew: true,
    spotifyUrl: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b?si=ca70d100391f4436",
  },
  {
    id: "2",
    type: "album",
    text: 'New song "Cardigan" by Taylor Swift is out!',
    cover:
      "https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Folklore.png",
    time: "8h ago",
    isNew: true,
    spotifyUrl: "https://open.spotify.com/track/4R2kfaDFhslZEMJqAFNpdd",
  },
  {
    id: "3",
    type: "album",
    text: 'New album "Short n Sweet" by Sabrina Carpenter released!',
    cover:
      "https://upload.wikimedia.org/wikipedia/en/f/fd/Short_n%27_Sweet_-_Sabrina_Carpenter.png",
    time: "12h ago",
    isNew: true,
    spotifyUrl: "https://open.spotify.com/album/3iPSVi54hsacKKl1xIR2eH?si=k3eBLFYaT5CBwS2qZ5Ep1Q",
  },
  {
    id: "4",
    type: "message",
    user: "Alice",
    text: "sent you a message",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    time: "2h ago",
    isNew: true,
  },
  {
    id: "5",
    type: "mention",
    user: "Charlie",
    text: "mentioned you in a comment",
    preview: "That song was amazing!",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    time: "1d ago",
    isNew: true,
  },
  {
    id: "6",
    type: "like",
    user: "Sophia",
    text: "liked your comment",
    preview: "I totally agree!",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    time: "2d ago",
    isNew: false,
  },
  {
    id: "7",
    type: "reply",
    user: "Daniel",
    text: "replied to your comment",
    preview: "That’s a great point!",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    time: "3d ago",
    isNew: false,
  },
];

const listeningParties = [
  { id: '101', artist: 'The Weeknd', host: 'The Weeknd', partyName: 'Blinding Lights Experience', artistImage: 'https://360degreesound.com/wp-content/uploads/TheWeeknd.jpg', isLive: true },
  { id: '102', artist: 'Taylor Swift', host: 'Emma', partyName: 'Folklore Listening Party', artistImage: 'https://www.fsunews.com/gcdn/presto/2021/01/02/PFSU/b4062ac1-7164-4b69-a79a-3cc23b09c15d-10taylor-item2-jumbo.jpg?width=300&height=346&fit=crop&format=pjpg&auto=webp', isLive: true },
];


const NotificationScreen = ({ navigation }) => {
  const sortedNotifications = (type) => {
    return notificationsData
      .filter(item => item.type === type)
      .sort((a, b) => b.isNew - a.isNew);
  };

  const renderAlbumNotification = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}
      onPress={() => navigation.navigate('AlbumConfirmation', { album: item })}>
      <Image source={{ uri: item.cover }} style={ styles.albumCoverLarge } onError={(e) => console.log("Image failed to load:", e.nativeEvent.error)}/>
      <View style={styles.textContainer}>
        <Text style={styles.notificationText}>{item.text}</Text>
        <Text style={styles.timestamp}>{item.time}</Text>
      </View>
      {item.isNew && <View style={styles.newDot} />}
    </TouchableOpacity>
  );

  const renderCommentNotification = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.notificationText}>
          <Text style={styles.bold}>{item.user} </Text>
          {item.text}
        </Text>
        {item.preview && <Text style={styles.previewText}>"{item.preview}"</Text>}
        <Text style={styles.timestamp}>{item.time}</Text>
      </View>
      {item.isNew && <View style={styles.newDot} />}
      {item.type === 'message' && (
        <TouchableOpacity style={styles.replyButton}>
          <Text style={styles.replyButtonText}>Reply</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const renderListeningParty = ({ item }) => (
    <TouchableOpacity style={styles.listeningPartyItem}>
      <Image source={{ uri: item.artistImage }} style={styles.artistAvatar} />
      <View style={styles.textContainer}>
        <Text style={styles.listeningPartyName}>{item.partyName}</Text>
        <Text style={styles.listeningPartyArtist}>🎤 {item.artist}</Text>
        <Text style={styles.liveIndicator}>🔴 Live Now - Hosted by {item.host === item.artist ? 'the artist' : item.host}</Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.sectionHeader}>Live Listening Parties</Text>
      <FlatList
        horizontal
        data={listeningParties.filter(item => item.isLive)}
        renderItem={renderListeningParty}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.sectionHeader}>New Album & Song Releases</Text>
      <FlatList
        data={sortedNotifications('album')}
        renderItem={renderAlbumNotification}
        keyExtractor={(item) => item.id}
      />
      
      <Text style={styles.sectionHeader}>Comments & Mentions</Text>
      <FlatList
        data={notificationsData.filter(item => item.type !== 'album').sort((a, b) => b.isNew - a.isNew)}
        renderItem={renderCommentNotification}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
    color: '#0554fe',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  albumCoverLarge: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
  },
  previewText: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
    fontStyle: 'italic',
  },
  bold: {
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
  },
  newDot: {
    width: 10,
    height: 10,
    backgroundColor: '#0554fe',
    borderRadius: 5,
    position: 'absolute',
    right: 10,
    top: 20,
  },
  replyButton: {
    backgroundColor: '#0554fe',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10
  },
  replyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    borderRadius: 5,
  },
  listeningPartyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    elevation: 3,
  },
  artistAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  listeningPartyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  listeningPartyArtist: {
    fontSize: 14,
    color: '#555',
  },
});

export default NotificationScreen;
