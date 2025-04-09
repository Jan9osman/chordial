import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, StyleSheet,
  Image, Modal, TextInput, ScrollView
} from 'react-native';

const groupIcons = [
  'https://cdn-icons-png.flaticon.com/512/3068/3068835.png',
  'https://cdn-icons-png.flaticon.com/512/1995/1995540.png',
  'https://cdn-icons-png.flaticon.com/512/1077/1077046.png',
  'https://cdn-icons-png.flaticon.com/512/2922/2922656.png',
];

const suggestedFriends = [
  { name: 'Jake', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' }
];

const initialFriends = [
  { id: '1', name: 'Karen', lastMessage: "Mine is Up All Night! How about you?", avatar: 'https://randomuser.me/api/portraits/women/44.jpg', hasNewMessage: true },
  { id: '2', name: 'Rob', lastMessage: 'That verse was 🔥🔥🔥', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', hasNewMessage: false },
  { id: '3', name: 'Ava', lastMessage: 'Just sent you the playlist!', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', hasNewMessage: false },
  { id: '4', name: 'Liam', lastMessage: 'We should meet before the show.', avatar: 'https://randomuser.me/api/portraits/men/34.jpg', hasNewMessage: false },
  { id: '5', name: 'Ella', lastMessage: 'You have to hear this track', avatar: 'https://randomuser.me/api/portraits/women/72.jpg', hasNewMessage: false },
];

const initialGroups = [
  { id: '1', name: 'Indie Music Lovers', lastMessage: "I still need to listen!", avatar: groupIcons[0], hasNewMessage: true },
  { id: '2', name: 'Hip-Hop Heads', lastMessage: "New convo started", avatar: groupIcons[1], hasNewMessage: false },
  { id: '3', name: 'EDM Festival Crew', lastMessage: "Who's hyped for Tomorrowland?! 🎧", avatar: groupIcons[2], hasNewMessage: false },
];

const MessagingScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Friends');
  const [friends, setFriends] = useState(initialFriends);
  const [groups, setGroups] = useState(initialGroups);
  const [modalVisible, setModalVisible] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedGroupIcon, setSelectedGroupIcon] = useState(groupIcons[0]);

  const chatHistories = useRef({
    Karen: [
      { id: '1', sender: 'Me', text: "Hey Karen, did you listen to the album yet?", time: '9:45 AM' },
      { id: '2', sender: 'Karen', text: "Yes! It's so good, I’ve had it on repeat 🔁", time: '9:47 AM' },
      { id: '3', sender: 'Me', text: "Which track is your favorite so far?", time: '9:50 AM' },
      { id: '4', sender: 'Karen', text: "Mine is Up All Night! How about you?", time: '9:53 AM' },
    ],
    'Indie Music Lovers': [
      { id: '1', sender: 'Emily', text: "Did you guys hear the new Phoebe Bridgers song?", time: '10:00 AM' },
      { id: '2', sender: 'Jake', text: "Yes! It’s got such a dreamy vibe 😍", time: '10:02 AM' },
      { id: '3', sender: 'Me', text: "Agreed! We should add it to our playlist.", time: '10:05 AM' },
      { id: '4', sender: 'Sophia', text: "Speaking of that, what's our top 10 so far?", time: '10:08 AM' },
      { id: '5', sender: 'Jake', text: "I still need to listen!", time: '10:12 AM' },
    ],
  });

  const renderItem = (list, setList) => ({ item }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() => {
        const updated = list.map(chat =>
          chat.id === item.id ? { ...chat, hasNewMessage: false } : chat
        );
        setList(updated);

        const updateLastMessage = (text, isFromMe = true) => {
          const now = new Date();
          const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const newMessage = { id: Date.now().toString(), sender: 'Me', text, time };

          const existingMessages = chatHistories.current[item.name] || [];
          chatHistories.current[item.name] = [...existingMessages, newMessage];

          const updatedList = list.map(chat =>
            chat.id === item.id
              ? { ...chat, lastMessage: text, hasNewMessage: !isFromMe }
              : chat
          );
          setList(updatedList);
        };

        navigation.navigate('ChatScreen', {
          chatName: item.name,
          avatar: item.avatar,
          messages: chatHistories.current[item.name] || [],
          onSendMessage: updateLastMessage,
        });
      }}
    >
      <Image source={{ uri: item.avatar }} style={styles.profileImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={[styles.lastMessage, item.hasNewMessage && styles.boldLastMessage]}>
          {item.lastMessage}
        </Text>
      </View>
      {item.hasNewMessage && <View style={styles.newMessageDot} />}
    </TouchableOpacity>
  );

  const handleNewChat = () => {
    if (!newChatName.trim()) return;
    if (selectedTab === 'Groups' && selectedMembers.length === 0) return;

    const suggestion = suggestedFriends.find(s => s.name.toLowerCase() === newChatName.toLowerCase());

    const newChat = {
      id: Date.now().toString(),
      name: newChatName,
      lastMessage: 'New conversation started!',
      avatar:
        selectedTab === 'Friends'
          ? suggestion?.avatar || 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png'
          : selectedGroupIcon,
      hasNewMessage: false,
      members: selectedTab === 'Groups' ? selectedMembers : [],
    };

    if (!chatHistories.current[newChatName]) {
      chatHistories.current[newChatName] = [];
    }

    if (selectedTab === 'Friends') {
      setFriends(prev => [...prev, newChat]);
    } else {
      setGroups(prev => [...prev, newChat]);
    }

    setModalVisible(false);
    setNewChatName('');
    setSuggestions([]);
    setSelectedMembers([]);
    setSelectedGroupIcon(groupIcons[0]);
  };

  return (
    <View style={styles.container}>
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

      <FlatList
        data={selectedTab === 'Friends' ? friends : groups}
        renderItem={selectedTab === 'Friends' ? renderItem(friends, setFriends) : renderItem(groups, setGroups)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity style={styles.newChatButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.newChatText}>+</Text>
      </TouchableOpacity>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedTab === 'Friends' ? 'New Private Chat' : 'New Group Chat'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder={`Enter ${selectedTab === 'Friends' ? 'friend' : 'group'} name...`}
              placeholderTextColor="#999"
              value={newChatName}
              onChangeText={(text) => {
                setNewChatName(text);
                if (selectedTab === 'Friends') {
                  const matches = suggestedFriends.filter(s =>
                    s.name.toLowerCase().startsWith(text.toLowerCase())
                  );
                  setSuggestions(matches);
                } else {
                  setSuggestions([]);
                }
              }}
            />

            {suggestions.map((s, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => {
                  setNewChatName(s.name);
                  setSuggestions([]);
                }}
              >
                <Image source={{ uri: s.avatar }} style={styles.suggestionAvatar} />
                <Text style={styles.suggestionText}>{s.name}</Text>
              </TouchableOpacity>
            ))}

            {selectedTab === 'Groups' && (
              <>
                <View style={styles.iconPickerContainer}>
                  <Text style={styles.iconPickerLabel}>Choose Group Icon:</Text>
                  <View style={styles.iconOptionsRow}>
                    {groupIcons.map((icon, idx) => (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => setSelectedGroupIcon(icon)}
                        style={[
                          styles.iconOption,
                          selectedGroupIcon === icon && styles.iconSelected,
                        ]}
                      >
                        <Image source={{ uri: icon }} style={styles.iconImage} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <ScrollView style={styles.membersList}>
                  {friends.map((f) => {
                    const isSelected = selectedMembers.includes(f.name);
                    return (
                      <TouchableOpacity
                        key={f.id}
                        style={[styles.memberItem, isSelected && styles.memberSelected]}
                        onPress={() => {
                          setSelectedMembers(prev =>
                            isSelected
                              ? prev.filter(name => name !== f.name)
                              : [...prev, f.name]
                          );
                        }}
                      >
                        <Image source={{ uri: f.avatar }} style={styles.memberAvatar} />
                        <Text style={styles.memberName}>{f.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </>
            )}

            <TouchableOpacity style={styles.createChatButton} onPress={handleNewChat}>
              <Text style={styles.createChatText}>Start Chat</Text>
            </TouchableOpacity>

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
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  segmentContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 6,
    backgroundColor: '#f2f2f2',
  },
  selectedSegment: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  segmentText: { fontSize: 14, color: '#333' },
  selectedSegmentText: { color: '#fff', fontWeight: 'bold' },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  chatName: { fontSize: 16, fontWeight: 'bold' },
  lastMessage: { fontSize: 14, color: '#666' },
  boldLastMessage: { fontWeight: 'bold', color: '#000' },
  newChatButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newChatText: { color: '#fff', fontSize: 30 },
  newMessageDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    maxHeight: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  createChatButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  createChatText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  cancelText: { color: '#007BFF', marginTop: 10, textAlign: 'center' },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    width: '100%',
  },
  suggestionAvatar: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
  suggestionText: { fontSize: 16, color: '#333' },
  iconPickerContainer: { width: '100%', marginTop: 10 },
  iconPickerLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  iconOptionsRow: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
  iconOption: { borderRadius: 8, padding: 5, marginBottom: 10 },
  iconSelected: { borderWidth: 2, borderColor: '#007BFF', backgroundColor: '#e6f0ff', borderRadius: 10 },
  iconImage: { width: 45, height: 45, borderRadius: 10 },
  membersList: { width: '100%', maxHeight: 200, marginTop: 10 },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#f2f2f2',
    marginBottom: 5,
  },
  memberSelected: { backgroundColor: '#cce5ff' },
  memberAvatar: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
  memberName: { fontSize: 16, color: '#333' },
});

export default MessagingScreen;
