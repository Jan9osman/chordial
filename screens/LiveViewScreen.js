import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const initialComments = [
  { id: '1', user: 'Arianator88', comment: 'OMG her vocals 😭' },
  { id: '2', user: 'SweetenerQueen', comment: 'She’s slaying this live!' },
  { id: '3', user: 'GrandeFan21', comment: 'Can’t wait for the new album!' },
  { id: '4', user: 'VocalLegend', comment: 'She hit that whistle note like nothing 💅' },
  { id: '5', user: 'DangerousFan', comment: 'Ari never misses 😩💙' },
];

const LiveViewScreen = () => {
  const navigation = useNavigation();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const flatListRef = useRef();
  const [sound, setSound] = useState();

  // Simulate delayed live comments
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < initialComments.length) {
        setComments((prev) => [...prev, initialComments[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Load and play audio
  useEffect(() => {
    let isMounted = true;
    let loadedSound;

    (async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        });

        const { sound } = await Audio.Sound.createAsync(
            require('../assets/IntoYou.m4a'), // or .m4a
            { shouldPlay: true }
          );          

        if (isMounted) {
          loadedSound = sound;
          setSound(sound);
          await sound.playAsync();
        }
      } catch (err) {
        console.error('🔊 Error with audio playback:', err);
      }
    })();

    return () => {
      isMounted = false;
      if (loadedSound) {
        loadedSound.unloadAsync();
      }
    };
  }, []);

  const postComment = () => {
    if (!newComment.trim()) return;
    const newEntry = {
      id: Date.now().toString(),
      user: 'You',
      comment: newComment,
    };
    setComments((prev) => [...prev, newEntry]);
    setNewComment('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      {/* Live Bar */}
      <View style={styles.topBarContainer}>
        <Text style={styles.liveTitle}>Live</Text>
      </View>

      {/* Exit Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Exit Live</Text>
        </TouchableOpacity>
      </View>

      {/* Live Stream Image */}
      <Image source={require('../assets/arianaLive.jpg')} style={styles.liveImage} />

      {/* Comments */}
      <FlatList
        ref={flatListRef}
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Text style={styles.commentUser}>{item.user}:</Text>
            <Text style={styles.commentText}>{item.comment}</Text>
          </View>
        )}
        contentContainerStyle={styles.commentList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Comment Input */}
      <View style={styles.commentInputRow}>
        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Type a comment..."
          style={styles.input}
        />
        <TouchableOpacity onPress={postComment} style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  topBarContainer: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  liveTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  backText: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
  },
  liveImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  commentList: { padding: 10 },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  commentUser: {
    fontWeight: 'bold',
    marginRight: 6,
    color: '#2196F3',
  },
  commentText: { flex: 1, color: '#333' },
  commentInputRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#eee',
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LiveViewScreen;
