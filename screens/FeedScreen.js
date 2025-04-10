import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation events


const songs = [
    {
        id: '1',
        title: 'Let It Happen',
        artist: 'Tame Impala',
        img_source: require('../assets/currents_cover.jpg'),
        lyrics: [
            {time: 0, text: '♪ ♪'},
            {time: 11.5, text: 'I cannot vanish'},
            {time: 13.3, text: 'You will not scare me'},
            {time: 15.2, text: 'Try to get through it'},
            {time: 17.3, text: 'Try to bounce to it'},
            {time: 19.0, text: 'You were not thinkin\''},
            {time: 20.2, text: 'That I will not do it'},
        ],
        audio_source: require('../assets/Let_it_happen_clip.mp3'),
        backgroundColor: 'red',
        comments: [
          { profilePic: require('../assets/user1.jpeg'), profileName: 'Bob', timestamp: '0:00', text: 'This riff slaps so hard!' },
          { profilePic: require('../assets/user2.jpeg'), profileName: 'Alice', timestamp: null, text: 'Such a vibe.' },
          { profilePic: require('../assets/user4.jpeg'), profileName: 'Tony', timestamp: null,text: 'I love you Kevin Parker.' }
        ]
      },
      {
        id: '2',
        title: 'Ivy',
        artist: 'Frank Ocean',
        img_source: require('../assets/blond_cover.jpeg'),
        audio_source: require('../assets/Ivy_clip.m4a'),
        lyrics: [
            {time: 0, text: 'I thought that I was dreamin\' when you said you love me' },
            {time: 7.5, text: 'The start of nothin\''},
            {time: 9, text: 'I had no chance to prepare, I couldn\'t see you coming'},
            {time: 15.8, text: 'The start of nothin\' ooh, I could hate you now'},
            {time: 21, text: 'It\'s quite alright to hate me now'},
            {time: 25.5, text: 'When we both know that deep down'},
            {time: 27.7, text: 'The feeling still deep down, is good'},
        ],
        backgroundColor: 'darkgrey',
        comments: [
          { profilePic: require('../assets/user3.jpeg'), profileName: 'Charlie', timestamp: null,text: 'Hits deep.' },
          { profilePic: require('../assets/user4.jpeg'), profileName: 'Tony', timestamp: null,text: 'Frank never misses.' }
        ]
      }
];

const FeedScreen = () => {
  const [profileImage, setProfileImage] = useState('https://img.freepik.com/free-photo/close-up-portrait-beautiful-cat_23-2149214419.jpg');
  const [lyricModalVisible, setLyricModalVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedComments, setSelectedComments] = useState([]);
  const [commented, setCommented] = useState(0); // have i sent my comment?
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(true);
  const [lyrics, setLyrics] = useState(false);
  const [paused, setPaused] = useState(false);
  const [flatListHeight, setFlatListHeight] = useState(0);
  const [sound, setSound] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [currentSongPosition, setCurrentSongPosition] = useState(0);  
  const { height, width } = useWindowDimensions();
  const sliderHeight = 40;

  const [commentText, setCommentText] = useState('');

  const handleSendComment = () => {
    if (commentText.trim() === '') return;

    // Add logic to send the comment
    console.log('Send comment:', commentText);
    const myComment = {
        profilePic: { uri: profileImage },
        profileName: 'John Doe', // Placeholder, you can change this based on logged-in user
        timestamp: null,
        text: commentText,
      };

      setSelectedComments([myComment, ...selectedComments]);
      setCommented(1);

      setCommentText('');
  };

  const selectComments = (comments) => {
    console.log('comments selected');

    setSelectedComments(comments);
    setComments(true);
    setLyrics(false);
  };

  const selectLyrics = () => {
    setComments(false);
    setLyrics(true);
  };

  const expandComments = (comments) => {
    setSelectedComments(comments);
    setCommentModalVisible(true);
  };
 // Load and play audio
 const loadAndPlayAudio = async (songIndex) => {
    console.log('load and play audio, ', songIndex)
    if (sound) {
      await sound.stopAsync();  // Stop the previous audio
      await sound.unloadAsync(); // Unload the previous audio
    }

    try {
      const { sound } = await Audio.Sound.createAsync(
        songs[songIndex].audio_source, // Load the audio file of the current song
        { isLooping: true, shouldPlay: true }
      );
      setSound(sound);
      // Update the slider value based on the audio position
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isPlaying) {
            setSliderValue(status.positionMillis / status.durationMillis * 100);
            setCurrentSongPosition(status.positionMillis);
            
            for (let i = songs[currentSongIndex].lyrics.length - 1; i >= 0; i--) {

                if (status.positionMillis/1000 > songs[currentSongIndex].lyrics[i].time) {
                  setCurrentLyricIndex(i);
                  console.log('SET INDEX TO: ', i)
                  break;
                }
            }
        }
    });
    } catch (error) {
      console.error('Error loading audio', error);
    }
  };

  useEffect(() => {
    // Load the audio for the first song when the component mounts
    loadAndPlayAudio(currentSongIndex);

    // Cleanup function to stop audio when the component is unmounted
    return () => {
      if (sound) {
        sound.stopAsync();
        sound.unloadAsync();
      }
    };
  }, [currentSongIndex]);  // Dependency array is the current song index

  // Called when a new song is scrolled to
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    console.log('Item changed,', viewableItems);
    setPaused(false)
    if (viewableItems.length > 0) {
       setCurrentSongIndex(0);
       setSelectedComments(songs[0].comments);
    }else{
        setCurrentSongIndex(1);
       setSelectedComments(songs[1].comments);

    }
  }).current;

  const navigation = useNavigation();

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      if (sound) {
        sound.playAsync(); // Play audio when screen is focused
        setPaused(false)
      }
    });

    const blurListener = navigation.addListener('blur', () => {
      if (sound) {
        sound.stopAsync(); // Stop audio when screen is blurred
      }
    });

    return () => {
      focusListener();
      blurListener();
    };
  }, [navigation, sound]); // Listens for screen focus and blur

  const updateSongPosition = async (sound, value) => {
    if (sound) {
        // Get the current status of the sound
        const status = await sound.getStatusAsync();

        // Calculate the new position based on the slider value
        const newPositionMillis = (value / 100) * status.durationMillis;

        console.log('Updating position to:', newPositionMillis);

        // Set the position of the sound
        await sound.setPositionAsync(newPositionMillis.toFixed(2));
        
    }
};

  const renderItem = ({ item }) => (
    <View
      style={{
        width,
        height: flatListHeight,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10%',
        paddingHorizontal: '10%',
        backgroundColor: item.backgroundColor,
      }}
    >
      <Image source={item.img_source} style={{ width: '100%', height: 200 }} resizeMode="contain" />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10, color: 'white', textAlign: 'center' }}>{item.title}</Text>
      <Text style={{ color: 'white', textAlign: 'center', marginBottom: 10 }}>{item.artist}</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selectComments(item.comments)}>
          <Ionicons name={comments ? 'chatbubble' : 'chatbubble-outline'} size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selectLyrics()}>
          <Ionicons name={lyrics ? 'mic' : 'mic-outline'} size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=> {
            const status = await sound.getStatusAsync();
            console.log('current timestamp:', status.positionMillis)
            setCurrentSongPosition(status.positionMillis)
            if (paused){
                await sound.playAsync();
            } else {
                await sound.pauseAsync();
            }
            setPaused(!paused)
        }}
            style={{ marginRight: 10 }}>
          <Ionicons name={paused?"play": "pause"} size={24} color="white" />
        </TouchableOpacity>

      </View>

      {(comments || lyrics) && (
       <View
       style={{
         justifyContent: 'flex-start',
         borderRadius: 30,
         borderWidth: 1,
         borderColor: 'black',
         width: '90%',
         maxWidth: 500, // ✅ Limits width on large screens
         alignSelf: 'center', // ✅ Horizontally centers the container
         height: '40%',
         marginBottom: '10%',
         marginTop: '5%',
         backgroundColor: 'white',
       }}>
         <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginVertical: 6,
            color: 'black',
            textAlign: 'center'
        }}>{comments? "Comments" : "Lyrics"}</Text>
        <View style={{
            width: '33%',
            height: 4,
            borderRadius: 10,
            backgroundColor: 'darkgrey',
            alignSelf: 'center'
        }}></View>

        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 15 }}
            onPress={()=>{
                comments ? setCommentModalVisible(true) : setLyricModalVisible(true)
            }}>
            <Ionicons name="chevron-up-outline" size={24} color="black" />
        </TouchableOpacity>

          {comments ? (
            // Comment section
            <ScrollView style={{ marginVertical: 10, width: '90%', height: '80%', paddingLeft: 16 }}>
              {selectedComments.map((comment, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                  <Image source={comment.profilePic} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', marginRight: 10, fontSize: 16 }}>{comment.profileName}</Text>
                        {comment.timestamp && <Text style={{ color: 'blue', fontSize: 13 }}>{comment.timestamp}</Text>}
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ marginRight: 10 }}>
                          <Ionicons name="heart-outline" size={20} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Ionicons name="chatbubble-outline" size={20} color="black" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Text style={{ color: 'black', marginTop: 2, fontSize: 14 }}>{comment.text}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          ) : (
            // Lyrics section
            <ScrollView style={{ marginHorizontal: 10, flex: 1, borderRadius: 30 }}>
            {songs[currentSongIndex].lyrics.map((line, index) => (
                <TouchableOpacity
                key={index}
                onPress={async () => {
                  if (sound && line.time != null) {
                    try {
                      await sound.setPositionAsync(line.time * 1000); // time in seconds → ms
                    } catch (e) {
                      console.warn('Failed to seek audio:', e);
                    }
                  }
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    paddingVertical: 6,
                    color: index <= currentLyricIndex ? 'black' : 'gray',
                    fontWeight: index <= currentLyricIndex ? 'normal' : 'lighter',
                    textAlign: 'center',
                  }}
                >
                  {line.text}
                </Text>
              </TouchableOpacity>
            ))}
            </ScrollView>
          )}
        </View>
      )}
    {/*Comment Modal */}
    <Modal
        visible={commentModalVisible}
        animationType="slide"
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 50 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Comments</Text>
          <View style={{
            width: '33%',
            height: 4,
            borderRadius: 10,
            backgroundColor: 'darkgrey',
            alignSelf: 'center'
        }}></View>
          <ScrollView style={{ paddingHorizontal: 20 }}>
            {selectedComments.map((comment, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                <Image source={comment.profilePic} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ color: 'black', fontWeight: 'bold', marginRight: 10, fontSize: 16 }}>{comment.profileName}</Text>
                      {comment.timestamp && <Text style={{ color: 'blue', fontSize: 13 }}>{comment.timestamp}</Text>}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity style={{ marginRight: 10 }}>
                        <Ionicons name="heart-outline" size={20} color="black" />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Ionicons name="chatbubble-outline" size={20} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={{ color: 'black', marginTop: 2, fontSize: 14 }}>{comment.text}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={{ position: 'absolute', top: 40, right: 20 }}
            onPress={() => setCommentModalVisible(false)}
          >
            <Ionicons name="chevron-down-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#f9f9f9',
      }}
    >
      <TextInput
        style={{
          flex: 1,
          height: 38,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 20,
          paddingHorizontal: 12,
          fontSize: 14,
          backgroundColor: '#fff',
        }}
        placeholder="Write a comment..."
        placeholderTextColor="#999"
        value={commentText}
        onChangeText={setCommentText}
      />
      <TouchableOpacity
        style={{
          marginLeft: 8,
          backgroundColor: '#007BFF',
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 18,
        }}
        onPress={handleSendComment}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            fontWeight: 'bold',
          }}
        >
          Send
        </Text>
      </TouchableOpacity>
    </View>
      </Modal>

      {/* Lyric Modal */}
      <Modal visible={lyricModalVisible} animationType="slide" onRequestClose={() => setLyricModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 40,
              marginBottom: 10,
            }}
          >
            {songs[currentSongIndex].title} - Lyrics
          </Text>
          <View style={{
            width: '33%',
            height: 4,
            borderRadius: 10,
            backgroundColor: 'darkgrey',
            alignSelf: 'center'
        }}></View>

          <ScrollView contentContainerStyle={{ padding: 20 }}>
            {songs[currentSongIndex].lyrics.map((line, index) => (
              <TouchableOpacity
                key={index}
                onPress={async () => {
                  if (sound && line.time != null) {
                    try {
                      await sound.setPositionAsync(line.time * 1000); // time in seconds → ms
                    } catch (e) {
                      console.warn('Failed to seek audio:', e);
                    }
                  }
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    color: index <= currentLyricIndex ? 'black' : 'gray',
                    fontWeight: index <= currentLyricIndex ? 'normal' : 'lighter',
                    textAlign: 'center',
                    paddingVertical: 10,
                  }}
                >
                  {line.text}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={{ position: 'absolute', top: 30, right: 20 }}
            onPress={() => setLyricModalVisible(false)}
          >
            <Ionicons name="chevron-down-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Your Feed</Text>
      </View>
      <View style={{ position: 'absolute', top: 25, right: 20, zIndex: 1 }}>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setFlatListHeight(height);
            console.log('FlatList height:', height);
        }}
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'center' }}
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled={true}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        snapToInterval={flatListHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          paddingHorizontal: 20,
          backgroundColor: 'rgba(0,0,0,0)',
          height: sliderHeight,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        
        <Slider
            style={{ width: '100%', height: 20 }}
            tapToSeek={true}
            minimumValue={0}
            maximumValue={100}
            value={sliderValue} // Sync slider with audio position
            // thumbTintColor="rgba(0,0,0,0)"
            thumbTintColor='white'
            minimumTrackTintColor="gray"
            maximumTrackTintColor="lightgray"
            onValueChange={(value) => {
                updateSongPosition(sound, value)
            }}/>
      </View>
    </View>
  );
};

export default FeedScreen;