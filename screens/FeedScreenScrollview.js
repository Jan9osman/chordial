import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';

const songs = [
  {
    id: '1',
    title: 'Let It Happen',
    artist: 'Tame Impala',
    img_source: require('../assets/currents_cover.jpg'),
    backgroundColor: 'red',
    comments: [
      { profilePic: require('../assets/user1.jpeg'), profileName: 'Bob', text: 'This riff slaps so hard!' },
      { profilePic: require('../assets/user2.jpeg'), profileName: 'Alice', text: 'Such a vibe.' },
      { profilePic: require('../assets/user4.jpeg'), profileName: 'Tony', text: 'I love you Kevin Parker.' }
    ]
  },
  {
    id: '2',
    title: 'Ivy',
    artist: 'Frank Ocean',
    img_source: require('../assets/blond_cover.jpeg'),
    backgroundColor: 'darkgrey',
    comments: [
      { profilePic: require('../assets/user3.jpeg'), profileName: 'Charlie', text: 'Hits deep.' },
      { profilePic: require('../assets/user4.jpeg'), profileName: 'Tony', text: 'Frank never misses.' }
    ]
  }
];

const FeedScreen = () => {
  const [lyricModalVisible, setLyricModalVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedComments, setSelectedComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(true);
  const [lyrics, setLyrics] = useState(false);
  const { height, width } = useWindowDimensions();
  const sliderHeight = 40;

  const scrollViewRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);

  // Gesture Handler setup
  const onGestureEvent = (event) => {
    const { translationY } = event.nativeEvent;
    setDragDistance(translationY); // Track drag distance
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === 'END') {
      setDragging(false); // Stop dragging when the gesture ends
    }
  };

  const selectComments = (comments) => {
    setSelectedComments(comments);
    setComments(true);
    setLyrics(false);
  };

  const selectLyrics = () => {
    setComments(false);
    setLyrics(true);
  };

  const renderItem = (item) => (
    <View
      style={{
        width,
        height: height - sliderHeight,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10%',
        paddingHorizontal: '20%',
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
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>{comment.profileName}</Text>
                    <Text style={{ color: 'black' }}>{comment.text}</Text>
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
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <View style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Your Feed</Text>
        </View>
        <View style={{ position: 'absolute', top: 25, right: 20, zIndex: 1 }}>
          <TouchableOpacity>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
          <ScrollView
            contentContainerStyle={{ alignItems: 'center' }}
            style={{ flex: 1 }}
            ref={scrollViewRef}
            scrollEnabled={!dragging} // Disable default scroll while dragging
            contentOffset={{ y: dragDistance }} // Dynamically adjust content based on drag distance
          >
            {songs.map((item) => renderItem(item))}
          </ScrollView>
        </PanGestureHandler>
        
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
          }}
        >
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Ionicons name="pause-outline" size={24} color="white" />
          </TouchableOpacity>
          <Slider
            style={{ width: '90%', height: 20 }}
            tapToSeek={true}
            minimumValue={0}
            maximumValue={100}
            value={50}
            thumbTintColor="rgba(0,0,0,0)"
            minimumTrackTintColor="gray"
            maximumTrackTintColor="lightgray"
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default FeedScreen;
