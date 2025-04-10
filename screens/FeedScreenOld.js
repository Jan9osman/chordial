import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions, Modal, ScrollView, TouchableWithoutFeedback, 
    KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');
const sliderHeight = 40; // Adjust as needed
const feedHeight = height - sliderHeight;


const songs = [
  {
    id: '1',
    title: 'Let It Happen',
    artist: 'Tame Impala',
    img_source: require('../assets/currents_cover.jpg'),
    lyrics: 'These are the lyrics of song one.',
    backgroundColor: 'red',
    comments: [
      { profilePic: require('../assets/user1.jpeg'), profileName: 'Bob', timestamp: '6:14', text: 'This riff slaps so hard!' },
      { profilePic: require('../assets/user2.jpeg'), profileName: 'Alice', timestamp: null, text: 'Such a vibe.' },
      { profilePic: require('../assets/user4.jpeg'), profileName: 'Tony', timestamp: null,text: 'I love you Kevin Parker.' }
    ]
  },
  {
    id: '2',
    title: 'Ivy',
    artist: 'Frank Ocean',
    img_source: require('../assets/blond_cover.jpeg'),
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
  const [commentModalVisible, setCommentModalVisible] = useState(false)
  const [selectedComments, setSelectedComments] = useState([]);
  const [myComment, setMyComment] = useState();
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(true);
  const [lyrics, setLyrics] = useState(false);

  const selectComments = (comments) => {
    setSelectedComments(comments);
    setComments(true);
    setLyrics(false);
  }

  const selectLyrics = () => {
    setComments(false);
    setLyrics(true);
  }

  const openLyricModal = () => {
    setLyricModalVisible(true);
  }

  const expandComments = (comments) => {
    setSelectedComments(comments);
    setCommentModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={{ width, height: feedHeight, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: item.backgroundColor }}>
      <Image source={item.img_source} style={{ width: '100%', height: 200 }} resizeMode='contain' />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10, color: 'white', textAlign: 'center' }}>{item.title}</Text>
      <Text style={{ color: 'white', textAlign: 'center', marginBottom: 10 }}>{item.artist}</Text>
      
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
      
      {/* Icon toggle section */}
      <TouchableOpacity onPress={() => setLiked(!liked)}>
        <Ionicons name={liked ? 'heart' : 'heart-outline'} size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          selectComments(item.comments);
        }}
      >
        <Ionicons name={comments ? 'chatbubble' : 'chatbubble-outline'} size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          selectLyrics();
        }}
      >
        <Ionicons name={lyrics ? 'mic' : 'mic-outline'} size={24} color="white" />
      </TouchableOpacity>

    </View>

        
    {(comments || lyrics) && (
  <View style={{
    justifyContent: 'flex-start',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    width: '90%',
    height: 170,
    marginBottom: '20%',
    marginTop: '10%',
    backgroundColor: 'white'
  }}>
    {comments ? (
      // Comments section
      <>
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginVertical: 6,
          color: 'black',
          textAlign: 'center'
        }}>Comments</Text>
        <View style={{
          width: '33%',
          height: 4,
          borderRadius: 10,
          backgroundColor: 'darkgrey',
          alignSelf: 'center'
        }}></View>

        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 15 }}
          onPress={()=>{expandComments(item.comments)}}>
          <Ionicons name="chevron-up-outline" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView style={{ marginVertical: 10, width: '90%', height: '80%', paddingLeft: 16 }}>
          {selectedComments.map((comment, index) => (
            <View
              key={index}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}
            >
              <Image
                source={comment.profilePic}
                style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
              />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', marginRight: 10 }}>
                      {comment.profileName}
                    </Text>
                    {comment.timestamp !== null && (
                      <Text style={{ color: 'blue', fontSize: 12 }}>{comment.timestamp}</Text>
                    )}
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
      </>
    ) : (
      // Lyrics section
      <>
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginVertical: 6,
          color: 'black',
          textAlign: 'center'
        }}>Lyrics</Text>
        <View style={{
          width: '33%',
          height: 4,
          borderRadius: 10,
          backgroundColor: 'darkgrey',
          alignSelf: 'center'
        }}></View>

        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 15 }}
          onPress={()=>{
            setLyricModalVisible(true);
          }}>
          <Ionicons name="chevron-up-outline" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView style={{ backgroundColor: 'white', marginHorizontal: 10, flex: 1, borderRadius: 30 }}>
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
      </>
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
      <View style={{ position: 'absolute', top: 25, left: width-50, zIndex: 1 }}>
      <TouchableOpacity style={{alignSelf:'flex-end'}}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList 
        data={songs} 
        renderItem={renderItem} 
        keyExtractor={(item) => item.id} 
        pagingEnabled 
        horizontal={false} 
        showsVerticalScrollIndicator={false}
        snapToInterval={feedHeight}
        snapToAlignment="start"
        decelerationRate="fast"
      />

      <View style={{ position: 'absolute', bottom: 0, width: '100%', paddingHorizontal: 20, backgroundColor: 'rgba(0,0,0,0)', height: sliderHeight, flexDirection:'row', alignItems: 'center' }}>
      <TouchableOpacity style={{marginRight: 10}}>
          <Ionicons name="pause-outline" size={24} color="white" />
        </TouchableOpacity>
        
        <Slider style={{ width: '90%', height: 20 }} tapToSeek={true} minimumValue={0} maximumValue={100} value={50} thumbTintColor='rgba(0,0,0,0)' 
            minimumTrackTintColor='gray' maximumTrackTintColor='lightgray' />
      </View>
      
      {/* Comment Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={commentModalVisible}
        onRequestClose={()=>{setCommentModalVisible(false)}}
      >
        <View style={{flex:1}}>
        <TouchableWithoutFeedback onPress={()=>{setCommentModalVisible(false)}}>
          
            <View style={{flex:1, backgroundColor:'white', paddingVertical: '15%', alignItems:'center'}}>
              <Text style={{fontSize: 36, fontWeight: 'bold', color:'black'}}>Comments</Text>
              <View style={{width:'33%', height: 4, borderRadius:10, backgroundColor: 'black', alignSelf: 'center'}}></View>
              <TouchableOpacity style={{ position: 'absolute', top: 85, right: 35 }}
                onPress={()=>{setCommentModalVisible(false)}}>
                <Ionicons name="chevron-down-outline" size={24} color="black" />
            </TouchableOpacity>
          <ScrollView style={{ marginVertical: 10, width: '90%', height: '80%' }}>
      {selectedComments.map((comment, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>

          <Image 
            source={comment.profilePic} 
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} 
          />


          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
              <Text style={{ color: 'black', fontWeight: 'bold', marginRight: 10 }}>
                {comment.profileName}
              </Text>
              {comment.timestamp !== null && (
                <Text style={{ color: 'blue', fontSize: 12 }}>{comment.timestamp}</Text>
              )}
            </View>

            <Text style={{ color: 'black' }}>{comment.text}</Text>

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <TouchableOpacity style={{ marginRight: 15 }}>
                <Ionicons name="heart-outline" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="chatbubble-outline" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>

        <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  style={{flexDirection:'row', width:'80%', marginBottom: 30}}
                >
                  <TextInput
                    style={{flex:1, fontSize: 16, textDecorationLine: 'underline'}}
                    placeholder="Write a comment..."
                    placeholderTextColor="#888"
                    value={myComment}
                    onChangeText={setMyComment}
                  />
                  <TouchableOpacity>
                    <Ionicons name="send" size={24} color="black" />
                  </TouchableOpacity>
        </KeyboardAvoidingView>
            </View>
         
        </TouchableWithoutFeedback>
        
        </View>
      </Modal>

        {/* Lyric modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={lyricModalVisible}
        onRequestClose={()=>{setLyricModalVisible(false)}}
      >
        
        <View style={{flex:1}}>
            
        <TouchableWithoutFeedback onPress={()=>{setLyricModalVisible(false)}}>
          
            <View style={{flex:1, backgroundColor:'darkgrey', paddingTop: '15%', alignItems:'center'}}>
              <Text style={{fontSize: 36, fontWeight: 'bold', color:'white'}}>Lyrics</Text>
              <View style={{width:'33%', height: 4, borderRadius:10, backgroundColor: 'black', alignSelf: 'center'}}></View>
              <TouchableOpacity style={{ position: 'absolute', top: 85, right: 35 }}
                onPress={()=>{setLyricModalVisible(false)}}>
                <Ionicons name="chevron-down-outline" size={24} color="black" />
            </TouchableOpacity>
              <View style={{alignItems:"flex-start", paddingHorizontal:16, marginTop:16}}>
              <Text style={{fontSize:24, fontWeight: 'bold', color:'lightgrey'}}>{`It's quite alright to hate me now

When we both know that deep down\n`} </Text>
                <Text style={{fontSize:24, fontWeight: 'bold', color:'white'}}>{`The feeling still deep down is good

♪ ♪

If I could see through walls

I could see you're faking

If you could see my thoughts

You would see our faces

Safe in my rental like an armored truck back then

We didn't give a fuck back then

I ain't a kid no more`}</Text>
              </View>
            </View>
         
        </TouchableWithoutFeedback>
        </View>
      </Modal>

    </View>
  );
};


export default FeedScreen;
