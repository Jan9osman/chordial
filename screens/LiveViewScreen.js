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
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { Video } from 'expo-av';

// ----------------------------
// LIVE OPTIONS DATA
// ----------------------------
const liveOptions = [
  {
    id: 'AG',
    title: 'Ariana Grande Live: Promoting New Music',
    video: require('../assets/AGLive.mp4'),
    thumbnail: require('../assets/arianaLive.jpg'),
  },
  {
    id: 'JB',
    title: 'Community Exclusive: Roasting Fans',
    video: require('../assets/JBLive.mp4'),
    thumbnail: require('../assets/justinLive.jpg'),
  },
  {
    id: 'TM',
    title: 'Tate McRae: Concert Live Stream',
    video: require('../assets/t8Live.mp4'),
    thumbnail: require('../assets/t8Live.jpg'),
  },
  {
    id: 'Friend1',
    title: 'rocking out to britney',
    video: require('../assets/Friend1Live.mp4'),
    thumbnail: require('../assets/friend1.jpg'),
  },
  {
    id: 'Friend2',
    title: 'guess who just got dumped...',
    video: require('../assets/Friend2Live.mp4'),
    thumbnail: require('../assets/friend2.jpg'),
  },
];

// ----------------------------
// PRESET COMMENTS PER LIVE SESSION
// ----------------------------
const liveCommentsPreset = {
  AG: [
    { id: '1', user: 'Arianator88', comment: 'OMG her vocals 😭' },
    { id: '2', user: 'SweetenerQueen', comment: 'Shes slaying this live!' },
    { id: '3', user: 'GrandeFan21', comment: 'Cant wait for the new album!' },
    { id: '4', user: 'VocalLegend', comment: 'She hit that whistle note like nothing 💅' },
    { id: '5', user: 'DangerousFan', comment: 'Ari never misses 😩💙' },
  ],
  JB: [
    { id: '1', user: 'BieberFan', comment: 'That new track is fire!' },
    { id: '2', user: 'JustInLuv', comment: 'Justin on stage is everything!' },
    { id: '3', user: 'MusicLover', comment: 'Roasting fans like a boss!' },
  ],
  TM: [
    { id: '1', user: 'TateFan', comment: 'Tates vocals are amazing!' },
    { id: '2', user: 'McRaeLover', comment: 'This concert is lit!' },
    { id: '3', user: 'LiveStreamAddict', comment: 'Best live performance ever!' },
  ],
  Friend1: [
    { id: '1', user: 'BritneyLover', comment: 'I love Britney! So much energy!' },
    { id: '2', user: 'PopFan', comment: 'Rocking out is the best therapy!' },
  ],
  Friend2: [
    { id: '1', user: 'HeartBroken', comment: 'That breakup is some serious drama.' },
    { id: '2', user: 'LonelySoul', comment: 'I feel for those poor hearts.' },
  ],
};

const LiveViewScreen = ({ route, navigation }) => {
  // Get the videoId from navigation parameters
  const initialVideoId = route.params?.videoId || null;
  const [activeVideoId] = useState(initialVideoId);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // REFS
  const videoRef = useRef(null);
  const flatListRef = useRef(null);

  // Find the active video based on the activeVideoId
  const activeVideo = activeVideoId ? liveOptions.find(video => video.id === activeVideoId) : null;

  // If no active video is found, show an error view with a back button
  if (!activeVideo) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Live video not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Load comments when active video changes
  useEffect(() => {
    setComments([]);
    const preset = liveCommentsPreset[activeVideoId] || [];
    let index = 0;
    const interval = setInterval(() => {
      if (index < preset.length) {
        setComments(prev => [...prev, preset[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [activeVideoId]);

  // Handle posting a comment
  const handlePostComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now().toString(),
      user: 'You',
      comment: newComment,
    };
    setComments(prev => [...prev, comment]);
    setNewComment('');
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // On web, use a ScrollView instead of KeyboardAvoidingView
  const isWeb = Platform.OS === 'web';
  const Container = isWeb ? ScrollView : KeyboardAvoidingView;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lives</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <Container
        style={styles.content}
        behavior={isWeb ? undefined : (Platform.OS === 'ios' ? 'padding' : undefined)}
      >
        {/* Video */}
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={activeVideo.video}
            style={styles.video}
            shouldPlay
            isLooping
            resizeMode="contain"
            useNativeControls={false}
            volume={1.0}
          />
        </View>

        {/* Comments List */}
        <View style={styles.commentsContainer}>
          <FlatList
            ref={flatListRef}
            data={comments}
            keyExtractor={(item) => item.id}
            style={styles.commentsList}
            renderItem={({ item }) => (
              <View style={styles.commentItem}>
                <Text style={styles.commentUser}>{item.user}:</Text>
                <Text style={styles.commentText}>{item.comment}</Text>
              </View>
            )}
          />
        </View>

        {/* Comment Input */}
        <View style={styles.inputContainer}>
          <TextInput
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Type a comment..."
            style={styles.input}
          />
          <TouchableOpacity onPress={handlePostComment} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#444',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2196F3',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    bottom: 10,
  },
  backButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  videoContainer: {
    width: '100%',
    height: width * 0.6, // 16:9 aspect ratio
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  commentsContainer: {
    flex: 1,
  },
  commentsList: {
    padding: 10,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#2196F3',
    marginRight: 5,
  },
  commentText: {
    flex: 1,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default LiveViewScreen;