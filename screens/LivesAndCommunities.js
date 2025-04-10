import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';

// UPDATED LIVES DATA using local assets for thumbnails with new IDs
const trendingVideos = [
  {
    id: 'AG',
    title: 'Ariana Grande Live: Promoting New Music',
    thumbnail: require('../assets/arianaLive.jpg'),
  },
  {
    id: 'JB',
    title: 'Community Exclusive: Roasting Fans',
    thumbnail: require('../assets/justinLive.jpg'),
  },
  {
    id: 'TM',
    title: 'Tate Mcrae: Concert Live Stream',
    thumbnail: require('../assets/t8Live.jpg'),
  },
];

const friendVideos = [
  {
    id: 'Friend1',
    title: 'rocking out to britney',
    thumbnail: require('../assets/friend1.jpg'),
  },
  {
    id: 'Friend2',
    title: 'guess who just got dumped...',
    thumbnail: require('../assets/friend2.jpg'),
  },
];

// COMMUNITIES DATA with updated local images and member counts
const communities = [
  {
    id: 'a',
    name: 'BARBZ NATION',
    avatar: require('../assets/nickiPP.png'), // Nicki Minaj’s avatar
    members: 5000,
  },
  {
    id: 'b',
    name: 'Belieb That',
    avatar: require('../assets/justinPP.png'), // Justin Bieber’s avatar
    members: 12000,
  },
  {
    id: 'c',
    name: 'OvO',
    avatar: require('../assets/drake.png'), // Drake’s avatar
    members: 8000,
  },
];

// THEMES for each community (celebrity communities keep their colors)
const communityThemes = {
  a: {
    backgroundColor: '#ffeaf7',
    accentColor: '#ff1493',
  },
  b: {
    backgroundColor: '#f2ecff',
    accentColor: '#8a2be2',
  },
  c: {
    backgroundColor: '#f3f3f3',
    accentColor: '#000000',
  },
};

// FEED DATA for each community (base feed)
const communityFeeds = {
  a: [
    {
      id: 'nicki-post-1',
      userName: 'NickiMinajOfficial',
      verified: true,
      userAvatar: require('../assets/nickiPP.png'),
      time: 'Just now',
      contentText: `Hey Barbz! I’ve got a surprise for y’all this weekend... #PinkFriday2`,
      contentImage: require('../assets/vinyl.jpg'),
    },
    {
      id: 'barb-1',
      userName: 'PinkPrint44',
      verified: false,
      userAvatar: 'https://i.pravatar.cc/80?img=16',
      time: '3h',
      contentText: `Nicki’s new flow is insane. The queen never disappoints! Who's streaming on repeat?`,
      contentImage: require('../assets/lyrics.jpg'),
    },
    {
      id: 'barb-2',
      userName: 'MonsterVerse',
      verified: false,
      userAvatar: 'https://i.pravatar.cc/80?img=32',
      time: '1h',
      contentText: `Barbz, streaming party tonight at 8 PM! Let’s get Nicki to #1 again!`,
      contentImage: null,
    },
    {
      id: 'barb-3',
      userName: 'QueenBarbie',
      verified: false,
      userAvatar: 'https://i.pravatar.cc/80?img=42',
      time: '10m',
      contentText: `Just received my Pink Friday merch. Look how cute it is!`,
      contentImage: null,
    },
  ],
  b: [
    {
      id: 'justin-post-1',
      userName: 'JustinBieber',
      verified: true,
      userAvatar: require('../assets/justinPP.png'),
      time: '5m',
      contentText: `Love seeing all the support on my new song. You guys are amazing. #Beliebers`,
      contentImage: 'https://via.placeholder.com/300x200/87CEFA/000000?text=New+Song',
    },
    {
      id: 'belieber-1',
      userName: 'BiebzFan123',
      verified: false,
      userAvatar: 'https://i.pravatar.cc/80?img=12',
      time: '2h',
      contentText: `Listening to ‘Peaches’ on repeat. This album is a whole vibe!`,
      contentImage: 'https://via.placeholder.com/300x200/FFDAB9/000000?text=Peaches',
    },
    {
      id: 'belieber-2',
      userName: 'MistyB',
      verified: false,
      userAvatar: 'https://i.pravatar.cc/80?img=5',
      time: '45m',
      contentText: `Just grabbed tickets for the tour next month. I’m so excited for the concert!`,
      contentImage: 'https://via.placeholder.com/300x200/0000FF/FFFFFF?text=Concert',
    },
  ],
  c: [
    {
      id: 'drake-post-1',
      userName: 'Drake',
      verified: true,
      userAvatar: require('../assets/drake.png'),
      time: '1h',
      contentText: `Working on new vibes. Who’s ready for the next OVO fest? #6God`,
      contentImage: 'https://via.placeholder.com/300x200/808080/FFFFFF?text=OVO+Fest',
    },
    {
      id: 'ovo-fan-1',
      userName: 'ChampagneLover',
      verified: false,
      userAvatar: 'https://i.pravatar.cc/80?img=9',
      time: '4h',
      contentText: `Take Care still hits different after all these years. Timeless classic.`,
      contentImage: 'https://via.placeholder.com/300x200/000000/FFFFFF?text=Timeless',
    },
    {
      id: 'ovo-fan-2',
      userName: 'Torontooo',
      verified: false,
      userAvatar: 'https://i.pravatar.cc/80?img=30',
      time: '2h',
      contentText: `Drake teased something on his Insta story. #CantWait #OVO`,
      contentImage: 'https://via.placeholder.com/300x200/CCCCCC/333333?text=Teaser',
    },
    {
      id: 'ovo-fan-3',
      userName: '6GodFan',
      verified: false,
      userAvatar: 'https://i.pravatar.cc/80?img=45',
      time: '25m',
      contentText: `Anyone going to OVO Fest in Toronto? Let's connect!`,
      contentImage: 'https://via.placeholder.com/300x200/708090/FFFFFF?text=6ix',
    },
  ],
};

// COMMUNITY DETAIL SCREEN with additional UI elements and filter functionality
const CommunityDetailScreen = ({ community, onBack, feed, navigation }) => {
  // New states for toggles
  const [inviteAccepted, setInviteAccepted] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('You');
  const [isWritingPost, setIsWritingPost] = useState(false);
  const [postText, setPostText] = useState('');
  const [userPosts, setUserPosts] = useState([]);

  const theme = communityThemes[community.id] || { backgroundColor: '#fff', accentColor: '#000' };

  // Helper function to return a muted version of the accent color by averaging with white
  const getMutedColor = (hex) => {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    r = Math.floor((r + 255) / 2);
    g = Math.floor((g + 255) / 2);
    b = Math.floor((b + 255) / 2);
    const hr = r.toString(16).padStart(2, '0');
    const hg = g.toString(16).padStart(2, '0');
    const hb = b.toString(16).padStart(2, '0');
    return `#${hr}${hg}${hb}`;
  };

  // Generate exclusive posts based on community theme and vibe
  const generateExclusivePosts = (community) => {
    if (community.id === 'a') {
      return [
        {
          id: 'exclusive-a-1',
          userName: 'NickiMinajOfficial',
          verified: true,
          userAvatar: require('../assets/nickiPP.png'),
          time: '1h',
          contentText: "Exclusive behind the scenes: new tracks dropping soon! #VIP",
          contentImage: require('../assets/vinyl.jpg'),
        },
        {
          id: 'exclusive-a-2',
          userName: 'BarbzVIP',
          verified: false,
          userAvatar: 'https://i.pravatar.cc/80?img=50',
          time: '2h',
          contentText: "VIP access granted! Sneak peek of the upcoming project.",
          contentImage: null,
        },
      ];
    } else if (community.id === 'b') {
      return [
        {
          id: 'exclusive-b-1',
          userName: 'JustinBieber',
          verified: true,
          userAvatar: require('../assets/justinPP.png'),
          time: '30m',
          contentText: "Exclusive acoustic version live now! #Beliebers",
          contentImage: 'https://via.placeholder.com/300x200/000?text=Acoustic',
        },
        {
          id: 'exclusive-b-2',
          userName: 'BelieberInsider',
          verified: false,
          userAvatar: 'https://i.pravatar.cc/80?img=51',
          time: '1h',
          contentText: "Behind the scenes with Justin – you won't believe what happens next!",
          contentImage: null,
        },
      ];
    } else if (community.id === 'c') {
      return [
        {
          id: 'exclusive-c-1',
          userName: 'Drake',
          verified: true,
          userAvatar: require('../assets/drake.png'),
          time: '45m',
          contentText: "Exclusive clip: New beat dropping soon! #OVOExclusive",
          contentImage: 'https://via.placeholder.com/300x200/222?text=New+Beat',
        },
        {
          id: 'exclusive-c-2',
          userName: 'OVOExclusive',
          verified: false,
          userAvatar: 'https://i.pravatar.cc/80?img=52',
          time: '1h',
          contentText: "Drake reveals secret studio session. Top secret!",
          contentImage: null,
        },
      ];
    }
    return [];
  };

  // Generate trending posts for the community
  const generateTrendingPosts = (community) => {
    if (community.id === 'a') {
      return [
        {
          id: 'trending-a-1',
          userName: 'BarbzTrending',
          verified: false,
          userAvatar: 'https://i.pravatar.cc/80?img=53',
          time: '10m',
          contentText: "Trending now: Nicki's new hit is on repeat!",
          contentImage: require('../assets/vinyl.jpg'),
        },
      ];
    } else if (community.id === 'b') {
      return [
        {
          id: 'trending-b-1',
          userName: 'BelieberBuzz',
          verified: false,
          userAvatar: 'https://i.pravatar.cc/80?img=54',
          time: '15m',
          contentText: "Trending: Justin's live remix is blowing up!",
          contentImage: 'https://via.placeholder.com/300x200/FFD700/000?text=Live+Remix',
        },
      ];
    } else if (community.id === 'c') {
      return [
        {
          id: 'trending-c-1',
          userName: 'OVOTrend',
          verified: true,
          userAvatar: require('../assets/drake.png'),
          time: '5m',
          contentText: "Trending now: Drake's hottest drop of the season!",
          contentImage: 'https://via.placeholder.com/300x200/808080/FFF?text=Hot+Drop',
        },
      ];
    }
    return [];
  };

  // Determine feed to display based on the selected filter
  let filteredFeed = [];
  if (selectedFilter === 'You') {
    filteredFeed = userPosts;
  } else if (selectedFilter === 'Exclusive Content') {
    filteredFeed = generateExclusivePosts(community);
  } else if (selectedFilter === 'Trending') {
    filteredFeed = generateTrendingPosts(community);
  } else if (selectedFilter === 'Pictures') {
    filteredFeed = feed.filter(post => post.contentImage != null);
    filteredFeed = filteredFeed.concat(userPosts.filter(post => post.contentImage != null));
  } else if (selectedFilter === 'Lives') {
    // For Justin's community, show a custom live item; for others, leave the feed empty
    if (community.id === 'b') {
      filteredFeed = [{
        id: 'JB-live',
        videoId: 'JB',
        title: "Community Exclusive: Roasting Fans",
        thumbnail: require('../assets/justinLive.jpg'),
        live: true,
      }];
    } else {
      filteredFeed = [];
    }
  } else {
    filteredFeed = feed;
  }

  return (
    <View style={[styles.communityDetailContainer, { backgroundColor: theme.backgroundColor }]}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={[styles.backButtonText, { color: theme.accentColor }]}>Back</Text>
      </TouchableOpacity>
      <Text style={[styles.communityTitle, { color: theme.accentColor }]}>{community.name}</Text>
      <Text style={[styles.membersText, { color: theme.accentColor }]}>{community.members} Members</Text>
      <TouchableOpacity
        onPress={() => setInviteAccepted(true)}
        style={[
          styles.inviteButton,
          {
            backgroundColor: inviteAccepted
              ? getMutedColor(theme.accentColor)
              : theme.accentColor,
            shadowColor: theme.accentColor,
          },
        ]}
      >
        <Text style={styles.inviteButtonText}>
          {inviteAccepted ? 'Invite Accepted' : 'Accept Invite'}
        </Text>
      </TouchableOpacity>
      {/* Write a Post Section */}
      <TouchableOpacity style={styles.writePostButton} onPress={() => setIsWritingPost(!isWritingPost)}>
        <Text style={styles.writePostText}>Write a Post...</Text>
      </TouchableOpacity>
      {isWritingPost && (
        <View style={styles.writePostContainer}>
          <TextInput
            style={styles.writePostInput}
            placeholder="Compose your post..."
            value={postText}
            onChangeText={setPostText}
          />
          <TouchableOpacity
            style={styles.submitPostButton}
            onPress={() => {
              if (postText.trim()) {
                const newPost = {
                  id: Date.now().toString(),
                  userName: 'You',
                  verified: false,
                  userAvatar: 'https://i.pravatar.cc/80?img=100',
                  time: 'Just now',
                  contentText: postText,
                  contentImage: null,
                };
                setUserPosts(prev => [newPost, ...prev]);
                setPostText('');
                setIsWritingPost(false);
              }
            }}
          >
            <Text style={styles.submitPostButtonText}>Submit Post</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {['You', 'Exclusive Content', 'Lives', 'Pictures', 'Trending'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonSelected,
            ]}
            onPress={() => {
              if (filter === 'Lives') {
                // For Nicki's (a) and Drake's (c) communities, show an alert when Lives is tapped
                if (community.id === 'a' || community.id === 'c') {
                  Alert.alert("No Lives", "There are currently no live streams in this community.");
                } else {
                  setSelectedFilter('Lives');
                }
              } else {
                setSelectedFilter(filter);
              }
            }}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilter === filter && styles.filterButtonTextSelected,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Feed */}
      {selectedFilter === 'Lives' && filteredFeed.length === 0 ? (
        <View style={styles.noLivesContainer}>
          <Text style={styles.noLivesText}>No live streams currently.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredFeed}
          keyExtractor={(item) => item.id}
          style={styles.feedContainer}
          renderItem={({ item }) =>
            item.live ? (
              // Render the custom live item for Justin's community
              <TouchableOpacity
                style={styles.liveItem}
                onPress={() => navigation.navigate('LiveViewScreen', { videoId: item.videoId })}
              >
                <Image source={item.thumbnail} style={styles.liveThumbnail} />
                <Text style={styles.liveTitle}>{item.title}</Text>
              </TouchableOpacity>
            ) : (
              // Render a normal post item
              <View style={styles.post}>
                <View style={styles.postHeader}>
                  <Image
                    source={typeof item.userAvatar === 'string' ? { uri: item.userAvatar } : item.userAvatar}
                    style={styles.avatar}
                  />
                  <View style={styles.postHeaderText}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.userName}>{item.userName}</Text>
                      {item.verified && (
                        <Image
                          source={{ uri: 'https://img.icons8.com/color/20/null/verified-badge.png' }}
                          style={styles.verifiedIcon}
                        />
                      )}
                    </View>
                    <Text style={styles.postTime}>{item.time}</Text>
                  </View>
                </View>
                <Text style={styles.postContent}>{item.contentText}</Text>
                {item.contentImage && (
                  <Image
                    source={typeof item.contentImage === 'string' ? { uri: item.contentImage } : item.contentImage}
                    style={styles.postImage}
                  />
                )}
                <View style={styles.postFooter}>
                  <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerButtonText}>Like</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerButtonText}>Comment</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerButtonText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
        />
      )}
    </View>
  );
};

const ChorialSocialScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Communities');
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  if (selectedCommunity) {
    const feed = communityFeeds[selectedCommunity.id] || [];
    return (
      <CommunityDetailScreen
        community={selectedCommunity}
        feed={feed}
        onBack={() => setSelectedCommunity(null)}
        navigation={navigation}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Tab Header with white/blue theme */}
      <View style={styles.tabHeader}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Communities' && styles.activeTab]}
          onPress={() => setActiveTab('Communities')}
        >
          <Text style={[styles.tabText, activeTab === 'Communities' && styles.activeTabText]}>
            Communities
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Lives' && styles.activeTab]}
          onPress={() => setActiveTab('Lives')}
        >
          <Text style={[styles.tabText, activeTab === 'Lives' && styles.activeTabText]}>
            Lives
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'Lives' ? (
        <ScrollView style={styles.livesContainer}>
          <Text style={styles.sectionHeader}>🔥 Trending Lives</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {trendingVideos.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={styles.videoCard}
                onPress={() => navigation.navigate('LiveViewScreen', { videoId: video.id })}
              >
                <View style={styles.videoThumbnailWrapper}>
                  <Image source={video.thumbnail} style={styles.videoThumbnail} />
                  <Image
                    source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/play--v1.png' }}
                    style={styles.playIcon}
                  />
                </View>
                <Text style={styles.videoTitle}>{video.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.sectionHeader}>Friends</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {friendVideos.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={styles.videoCard}
                onPress={() => navigation.navigate('LiveViewScreen', { videoId: video.id })}
              >
                <View style={styles.videoThumbnailWrapper}>
                  <Image source={video.thumbnail} style={styles.videoThumbnail} />
                  <Image
                    source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/play--v1.png' }}
                    style={styles.playIcon}
                  />
                </View>
                <Text style={styles.videoTitle}>{video.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ScrollView>
      ) : (
        <View style={styles.communitiesTab}>
          <Text style={styles.communitiesHeader}>Your Music Communities</Text>
          <FlatList
            data={communities}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.communityCard}
                onPress={() => setSelectedCommunity(item)}
              >
                <Image source={item.avatar} style={styles.communityAvatar} />
                <Text style={styles.communityCardText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // White main background
  },
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#2196F3', // Blue header
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#ffffff', // Active tab gets white background
  },
  tabText: {
    fontSize: 16,
    color: '#ffffff',
  },
  activeTabText: {
    color: '#2196F3',
  },
  livesContainer: {
    padding: 10,
    flex: 1,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center',
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  videoCard: {
    marginRight: 10,
    width: 150,
  },
  videoThumbnailWrapper: {
    position: 'relative',
    width: '100%',
    height: 100,
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#ccc',
    resizeMode: 'cover',
  },
  playIcon: {
    position: 'absolute',
    top: '35%',
    left: '35%',
    width: 30,
    height: 30,
    opacity: 0.8,
  },
  videoTitle: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  communitiesTab: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  communitiesHeader: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
    color: '#2196F3',
  },
  communityCard: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  communityCardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    textAlign: 'center',
    marginTop: 8,
  },
  communityAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  communityDetailContainer: {
    flex: 1,
    padding: 15,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
  },
  communityTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5,
    textAlign: 'center',
  },
  membersText: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  inviteButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 28,
    marginBottom: 10,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  inviteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  writePostButton: {
    marginVertical: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  writePostText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  writePostContainer: {
    marginVertical: 10,
  },
  writePostInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 5,
  },
  submitPostButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitPostButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  filterButtonSelected: {
    backgroundColor: '#2196F3',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#444',
  },
  filterButtonTextSelected: {
    color: '#fff',
  },
  feedContainer: {
    flex: 1,
  },
  noLivesContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noLivesText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  liveItem: {
    marginVertical: 10,
    alignItems: 'center',
  },
  liveThumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  liveTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  post: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  postHeaderText: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 5,
  },
  verifiedIcon: {
    width: 20,
    height: 20,
    marginLeft: 4,
    resizeMode: 'contain',
  },
  postTime: {
    fontSize: 12,
    color: '#777',
  },
  postContent: {
    fontSize: 15,
    marginBottom: 10,
    lineHeight: 20,
    color: '#333',
  },
  postImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#db38ef',
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default ChorialSocialScreen;