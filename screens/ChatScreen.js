// File: /screens/ChatScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const groupMessages = [
  { id: '1', sender: 'Emily', text: "Did you guys hear the new Phoebe Bridgers song?", time: '10:00 AM' },
  { id: '2', sender: 'Jake', text: "Yes! It’s got such a dreamy vibe 😍", time: '10:02 AM' },
  { id: '3', sender: 'Me', text: "Agreed! We should add it to our playlist.", time: '10:05 AM' },
  { id: '4', sender: 'Sophia', text: "Speaking of that, what's our top 10 so far?", time: '10:08 AM' },
  { id: '5', sender: 'Jake', text: "I’ll send a Spotify link with what we have! 🎧", time: '10:12 AM' },
];

const oneOnOneMessages = [
  { id: '1', sender: 'Me', text: "Yo! Did you hear that new track?", time: '10:00 AM' },
  { id: '2', sender: 'Them', text: "YES!! 🔥🔥🔥 It's on repeat!", time: '10:02 AM' },
  { id: '3', sender: 'Me', text: "That guitar solo is INSANE!", time: '10:05 AM' },
  { id: '4', sender: 'Them', text: "Bro, this is why music is life 🎸", time: '10:06 AM' },
  { id: '5', sender: 'Me', text: "We need to make a playlist of bangers!", time: '10:08 AM' },
];

const ChatScreen = ({ route }) => {
  const navigation = useNavigation();
  const { chatName, avatar } = route.params;
  const isGroupChat = chatName.includes("Indie") || chatName.includes("Hip-Hop") || chatName.includes("EDM");
  const [messages, setMessages] = useState(isGroupChat ? groupMessages : oneOnOneMessages);
  const [newMessage, setNewMessage] = useState('');

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'Me' ? styles.myMessage : styles.theirMessage]}>
      {isGroupChat && item.sender !== 'Me' && (
        <Text style={styles.senderName}>{item.sender}</Text>
      )}
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessageObj = {
        id: messages.length + 1 + '',
        sender: 'Me',
        text: newMessage,
        time: 'Now',
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Custom Header */}
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Image source={{ uri: avatar }} style={styles.headerImage} />
        <Text style={styles.chatTitle}>{chatName}</Text>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
      />

      {/* Message Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  /* Custom Header */
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: { paddingRight: 10 },
  backIcon: { fontSize: 24, fontWeight: 'bold', color: '#007BFF' },
  headerImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  chatTitle: { fontSize: 18, fontWeight: 'bold' },

  /* Messages */
  chatList: { paddingBottom: width * 0.05 },
  messageContainer: { marginBottom: width * 0.04, padding: width * 0.03, borderRadius: 10, maxWidth: '70%' },
  myMessage: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  theirMessage: { backgroundColor: '#eee', alignSelf: 'flex-start' },
  senderName: { fontSize: width * 0.035, fontWeight: 'bold', color: '#007BFF', marginBottom: 3 },
  messageText: { fontSize: width * 0.04 },
  messageTime: { fontSize: width * 0.03, color: '#666', marginTop: 5, textAlign: 'right' },

  /* Input Bar */
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
