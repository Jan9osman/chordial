import React, { useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, Dimensions, Image,
  TouchableOpacity, TextInput, KeyboardAvoidingView, Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = ({ route }) => {
  const navigation = useNavigation();
  const { chatName, avatar, onSendMessage, messages: initialMessages } = route.params;
  const isGroupChat = chatName.includes("Indie") || chatName.includes("Hip-Hop") || chatName.includes("EDM");

  const [messages, setMessages] = useState(initialMessages || []);
  const [newMessage, setNewMessage] = useState('');

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'Me' ? styles.myMessage : styles.theirMessage,
      ]}
    >
      {isGroupChat && item.sender !== 'Me' && (
        <Text style={styles.senderName}>{item.sender}</Text>
      )}
      <Text
        style={[
          styles.messageText,
          item.sender === 'Me' ? { color: '#fff' } : { color: '#000' },
        ]}
      >
        {item.text}
      </Text>
      <Text
        style={[
          styles.messageTime,
          item.sender === 'Me' ? { color: '#fff' } : { color: '#666' },
        ]}
      >
        {item.time}
      </Text>
    </View>
  );

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessageObj = {
        id: Date.now().toString(),
        sender: 'Me',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      const updatedMessages = [...messages, newMessageObj];
      setMessages(updatedMessages);
      if (onSendMessage) {
        onSendMessage(newMessage, true);
      }
      setNewMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Image source={{ uri: avatar }} style={styles.headerImage} />
        <Text style={styles.chatTitle}>{chatName}</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
      />

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
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: { paddingRight: 10 },
  backIcon: { fontSize: 20, fontWeight: 'bold', color: '#007BFF' },
  headerImage: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  chatTitle: { fontSize: 16, fontWeight: 'bold' },
  chatList: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  myMessage: {
    backgroundColor: '#007BFF',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
  },
  senderName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 3,
  },
  messageText: {
    fontSize: 14,
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  textInput: {
    flex: 1,
    height: 38,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#007BFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
