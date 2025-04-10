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
        lyrics: 'These are the lyrics of song one.',
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
        lyrics: `I thought that I was dreamin'
    when you said you love me
    The start of nothin'
    I had no chance to prepare, I couldn't see you comin'
    The start of nothin'
    Ooh, I could hate you now
    It's quite alright to hate me now
    When we both know that deep down
    The feeling still deep down is good`,
        backgroundColor: 'darkgrey',
        comments: [
          { profilePic: require('../assets/user3.jpeg'), profileName: 'Charlie', timestamp: null,text: 'Hits deep.' },
          { profilePic: require('../assets/user4.jpeg'), profileName: 'Tony', timestamp: null,text: 'Frank never misses.' }
        ]
      }
];

const FeedScreen = () => {
  const [lyricModalVisible, setLyricModalVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedComments, setSelectedComments] = useState([]);
  const [myComment, setMyComment] = useState();
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(true);
  const [lyrics, setLyrics] = useState(false);
  const [paused, setPaused] = useState(false);
  const [flatListHeight, setFlatListHeight] = useState(0);
  const [sound, setSound] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { height, width } = useWindowDimensions();
  const sliderHeight = 40;

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

  // Track the currently visible item in the FlatList
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    console.log('Item changed,', viewableItems);
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
            height: 170,
            marginBottom: '20%',
            marginTop: '10%',
            backgroundColor: 'white',
          }}
        >
          {comments ? (
            // Comment section
            <ScrollView style={{ marginVertical: 10, width: '90%', height: '80%', paddingLeft: 16 }}>
              {selectedComments.map((comment, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                  <Image source={comment.profilePic} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} />
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', marginRight: 10 }}>{comment.profileName}</Text>
                        {comment.timestamp && <Text style={{ color: 'blue', fontSize: 12 }}>{comment.timestamp}</Text>}
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
                    <Text style={{ color: 'black', marginTop: 2 }}>{comment.text}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          ) : (
            // Lyrics section
            <ScrollView style={{ marginHorizontal: 10, flex: 1, borderRadius: 30 }}>
               <Text style={{ fontSize: 16, paddingVertical: 3, color: 'lightgrey', marginTop: 14 }}>
                    We both know that deep down
                </Text>
                <Text style={{ fontSize: 16, paddingVertical: 3, color: 'darkgrey' }}>
                    The feeling still deep down is good
                </Text>
                <Text style={{ fontSize: 16, color: 'lightgrey' }}> </Text>
                <Text style={{ fontSize: 16, paddingVertical: 3, color: 'darkgrey' }}>
                    If I could see through walls
                </Text>
                <Text style={{ fontSize: 16, paddingVertical: 3, color: 'darkgrey' }}>
                    I could see you're faking
                </Text>
            </ScrollView>
          )}
        </View>
      )}
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
        showsVerticalScrollIndicator={true}
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
            style={{ width: '90%', height: 20 }}
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