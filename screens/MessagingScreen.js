// File: /screens/MessagingScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, Image, Modal, TextInput } from 'react-native';

const { width, height } = Dimensions.get('window');

const initialFriends = [
  { id: '1', name: 'Karen', lastMessage: "Did you hear her new album?", avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '2', name: 'Rob', lastMessage: 'That verse was 🔥🔥🔥', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
  { id: '3', name: 'Mike', lastMessage: 'Can’t believe they’re touring again!', avatar: 'https://randomuser.me/api/portraits/men/50.jpg' },
];

const initialGroups = [
  { id: '1', name: 'Indie Music Lovers', lastMessage: "New artist spotlight: Phoebe Bridgers", avatar: 'https://cdn-icons-png.flaticon.com/512/3068/3068897.png' },
  { id: '2', name: 'Hip-Hop Heads', lastMessage: "Kendrick or J. Cole? Let’s settle this!", avatar: 'https://cdn-icons-png.flaticon.com/512/1995/1995540.png' },
  { id: '3', name: 'EDM Festival Crew', lastMessage: "Who's hyped for Tomorrowland?! 🎧", avatar: 'https://cdn-icons-png.flaticon.com/512/3068/3068835.png' },
];

const MessagingScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Friends');
  const [friends, setFriends] = useState(initialFriends);
  const [groups, setGroups] = useState(initialGroups);
  const [modalVisible, setModalVisible] = useState(false);
  const [newChatName, setNewChatName] = useState('');

  const startNewChat = () => {
    if (newChatName.trim() === '') return;

    const newChat = {
      id: (friends.length + groups.length + 1).toString(),
      name: newChatName,
      lastMessage: 'New conversation started!',
      avatar: 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png',
    };

    if (selectedTab === 'Friends') {
      setFriends([...friends, newChat]); // ✅ Adds to Friends
    } else {
      setGroups([...groups, newChat]); // ✅ Adds to Groups
    }

    setModalVisible(false);
    setNewChatName('');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() => navigation.navigate('ChatScreen', { chatName: item.name, avatar: item.avatar })}
    >
      <Image source={{ uri: item.avatar }} style={styles.profileImage} />
      <View>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Tab Switcher */}
      <View style={styles.segmentContainer}>
        <TouchableOpacity
          style={[styles.segmentButton, selectedTab === 'Friends' && styles.selectedSegment]}
          onPress={() => setSelectedTab('Friends')}
        >
          <Text style={[styles.segmentText, selectedTab === 'Friends' && styles.selectedSegmentText]}>
            Friends
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segmentButton, selectedTab === 'Groups' && styles.selectedSegment]}
          onPress={() => setSelectedTab('Groups')}
        >
          <Text style={[styles.segmentText, selectedTab === 'Groups' && styles.selectedSegmentText]}>
            Groups
          </Text>
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList
        data={selectedTab === 'Friends' ? friends : groups}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* New Chat Button */}
      <TouchableOpacity style={styles.newChatButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.newChatText}>+</Text>
      </TouchableOpacity>

      {/* Modal for Creating a New Chat */}
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedTab === 'Friends' ? 'New Private Chat' : 'New Group Chat'}
            </Text>

            {/* Chat Name Input */}
            <TextInput
              style={styles.input}
              placeholder={`Enter ${selectedTab === 'Friends' ? 'friend' : 'group'} name...`}
              placeholderTextColor="#999"
              value={newChatName}
              onChangeText={setNewChatName}
            />

            {/* Create Chat Button */}
            <TouchableOpacity style={styles.createChatButton} onPress={startNewChat}>
              <Text style={styles.createChatText}>Start Chat</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: width * 0.05 },
  segmentContainer: { flexDirection: 'row', marginBottom: width * 0.05 },
  segmentButton: { flex: 1, paddingVertical: width * 0.03, alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginHorizontal: 5 },
  selectedSegment: { backgroundColor: '#007BFF', borderColor: '#007BFF' },
  segmentText: { fontSize: width * 0.04, color: '#333' },
  selectedSegmentText: { color: '#fff', fontWeight: 'bold' },
  messageItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: width * 0.04, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  chatName: { fontSize: width * 0.05, fontWeight: 'bold' },
  lastMessage: { fontSize: width * 0.04, color: '#666' },
  newChatButton: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#007BFF', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  newChatText: { color: '#fff', fontSize: 30 },

  /* Modal Fix */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { width: '100%', height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 },
  createChatButton: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5, marginTop: 10 },
  createChatText: { color: '#fff', fontWeight: 'bold' },
  cancelText: { color: '#007BFF', marginTop: 10 },
});

export default MessagingScreen;
