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
} from 'react-native';

// UPDATED LIVES DATA using local assets for thumbnails
const trendingVideos = [
  {
    id: '1',
    title: 'Ariana Grande Live: Promoting New Music',
    thumbnail: require('../assets/arianaLive.jpg'),
  },
  {
    id: '2',
    title: 'Community Exclusive: Roasting Fans',
    thumbnail: require('../assets/justinLive.jpg'),
  },
  {
    id: '3',
    title: 'Tate Mcrae: Concert Live Stream',
    thumbnail: require('../assets/t8Live.jpg'),
  },
];

const friendVideos = [
  {
    id: '4',
    title: 'rocking out to britney',
    thumbnail: require('../assets/friend1.jpg'),
  },
  {
    id: '5',
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

// FEED DATA for each community
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

// COMMUNITY DETAIL SCREEN with additional UI elements
const CommunityDetailScreen = ({ community, onBack, feed }) => {
  const theme = communityThemes[community.id] || { backgroundColor: '#fff', accentColor: '#000' };

  return (
    <View style={[styles.communityDetailContainer, { backgroundColor: theme.backgroundColor }]}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={[styles.backButtonText, { color: theme.accentColor }]}>Back</Text>
      </TouchableOpacity>
      <Text style={[styles.communityTitle, { color: theme.accentColor }]}>{community.name}</Text>
      <Text style={[styles.membersText, { color: theme.accentColor }]}>{community.members} Members</Text>
      <TouchableOpacity
        style={[
          styles.inviteButton,
          { backgroundColor: theme.accentColor, shadowColor: theme.accentColor },
        ]}
      >
        <Text style={styles.inviteButtonText}>Accept Invite</Text>
      </TouchableOpacity>
      {/* Write a Post Section */}
      <TouchableOpacity style={styles.writePostButton} onPress={() => Alert.alert('Write Post', 'Compose your post')}>
        <Text style={styles.writePostText}>Write a Post...</Text>
      </TouchableOpacity>
      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {['You', 'Exclusive Content', 'Lives', 'Pictures', 'Trending'].map((filter) => (
          <TouchableOpacity key={filter} style={styles.filterButton}>
            <Text style={styles.filterButtonText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Feed */}
      <FlatList
        data={feed}
        keyExtractor={(item) => item.id}
        style={styles.feedContainer}
        renderItem={({ item }) => (
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
        )}
      />
    </View>
  );
};

const ChorialSocialScreen = () => {
  const [activeTab, setActiveTab] = useState('Communities');
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  if (selectedCommunity) {
    const feed = communityFeeds[selectedCommunity.id] || [];
    return (
      <CommunityDetailScreen
        community={selectedCommunity}
        feed={feed}
        onBack={() => setSelectedCommunity(null)}
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
                onPress={() => Alert.alert('Live Video', `Playing ${video.title}`)}
              >
                <View style={styles.videoThumbnailWrapper}>
                  <Image
                    source={typeof video.thumbnail === 'string' ? { uri: video.thumbnail } : video.thumbnail}
                    style={styles.videoThumbnail}
                  />
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
                onPress={() => Alert.alert('Live Video', `Playing ${video.title}`)}
              >
                <View style={styles.videoThumbnailWrapper}>
                  <Image
                    source={typeof video.thumbnail === 'string' ? { uri: video.thumbnail } : video.thumbnail}
                    style={styles.videoThumbnail}
                  />
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
  filterButtonText: {
    fontSize: 14,
    color: '#444',
  },
  feedContainer: {
    flex: 1,
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
