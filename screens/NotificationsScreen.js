import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  Modal,
  Linking,
} from "react-native";

const { width } = Dimensions.get("window");

const notificationsData = [
  {
    id: "1",
    type: "album",
    text: 'New hit single "Blinding Lights" by The Weeknd is out!',
    cover:
      "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png",
    time: "5h ago",
    isNew: true,
    spotifyUrl:
      "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b?si=ca70d100391f4436",
  },
  {
    id: "2",
    type: "album",
    text: 'New song "Cardigan" by Taylor Swift is out!',
    cover:
      "https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Folklore.png",
    time: "8h ago",
    isNew: true,
    spotifyUrl: "https://open.spotify.com/track/4R2kfaDFhslZEMJqAFNpdd",
  },
  {
    id: "3",
    type: "album",
    text: 'New album "Short n Sweet" by Sabrina Carpenter released!',
    cover:
      "https://upload.wikimedia.org/wikipedia/en/f/fd/Short_n%27_Sweet_-_Sabrina_Carpenter.png",
    time: "12h ago",
    isNew: true,
    spotifyUrl:
      "https://open.spotify.com/album/3iPSVi54hsacKKl1xIR2eH?si=k3eBLFYaT5CBwS2qZ5Ep1Q",
  },
  {
    id: "5",
    type: "mention",
    user: "Charlie",
    text: "mentioned you in a comment",
    preview: "That song was amazing!",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    time: "1d ago",
    isNew: true,
  },
  {
    id: "6",
    type: "like",
    user: "Sophia",
    text: "liked your comment",
    preview: "I totally agree!",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    time: "2d ago",
    isNew: false,
  },
  {
    id: "7",
    type: "reply",
    user: "Daniel",
    text: "replied to your comment",
    preview: "That’s a great point!",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    time: "3d ago",
    isNew: false,
  },
];

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([...notificationsData]);
  const [selectedTab, setSelectedTab] = useState("artist");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumModalVisible, setAlbumModalVisible] = useState(false);

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, isNew: false }));
    setNotifications(updated);
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isNew: false } : n))
    );
  };

  const artistNotifications = notifications
    .filter((n) => n.type === "album")
    .sort((a, b) => b.isNew - a.isNew);

  const personalNotifications = notifications
    .filter((n) => n.type !== "album")
    .sort((a, b) => b.isNew - a.isNew);

  const renderAlbumNotification = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() => {
        markNotificationAsRead(item.id);
        setSelectedAlbum(item);
        setAlbumModalVisible(true);
      }}
    >
      <Image source={{ uri: item.cover }} style={styles.albumCoverLarge} />
      <View style={styles.textContainer}>
        <Text style={styles.notificationText}>{item.text}</Text>
        <Text style={styles.timestamp}>{item.time}</Text>
      </View>
      {item.isNew && <View style={styles.newDot} />}
    </TouchableOpacity>
  );

  const renderCommentNotification = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() => {
        markNotificationAsRead(item.id);
      }}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.notificationText}>
          <Text style={styles.bold}>{item.user} </Text>
          {item.text}
        </Text>
        {item.preview && (
          <Text style={styles.previewText}>"{item.preview}"</Text>
        )}
        <Text style={styles.timestamp}>{item.time}</Text>
      </View>
      {item.isNew && <View style={styles.newDot} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Toggle Tabs */}
      <View style={styles.segmentContainer}>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            selectedTab === "artist" && styles.selectedSegment,
          ]}
          onPress={() => setSelectedTab("artist")}
        >
          <Text
            style={[
              styles.segmentText,
              selectedTab === "artist" && styles.selectedSegmentText,
            ]}
          >
            Artist
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            selectedTab === "personal" && styles.selectedSegment,
          ]}
          onPress={() => setSelectedTab("personal")}
        >
          <Text
            style={[
              styles.segmentText,
              selectedTab === "personal" && styles.selectedSegmentText,
            ]}
          >
            Personal
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.headerRow}>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markRead}>Mark All as Read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={
          selectedTab === "artist" ? artistNotifications : personalNotifications
        }
        renderItem={
          selectedTab === "artist"
            ? renderAlbumNotification
            : renderCommentNotification
        }
        keyExtractor={(item) => item.id}
      />

      {/* Album Modal */}
      {selectedAlbum && (
        <Modal
          visible={albumModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setAlbumModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedAlbum.cover }} style={styles.albumCover} />
              <Text style={styles.promptText}>Open album in Spotify?</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => {
                    Linking.openURL(selectedAlbum.spotifyUrl);
                    setAlbumModalVisible(false);
                  }}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.declineButton}
                  onPress={() => setAlbumModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Decline</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 20 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  markRead: {
    fontSize: 14,
    color: "#0554fe",
    fontWeight: "600",
  },
  segmentContainer: {
    flexDirection: 'row',
    marginBottom: width * 0.05,
    paddingHorizontal: 20,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: width * 0.03,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedSegment: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  segmentText: {
    fontSize: width * 0.04,
    color: '#333',
  },
  selectedSegmentText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    position: "relative",
  },
  albumCoverLarge: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: { flex: 1 },
  notificationText: { fontSize: 14, color: "#333" },
  previewText: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
    fontStyle: "italic",
  },
  bold: { fontWeight: "bold" },
  timestamp: {
    fontSize: 12,
    color: "#888",
    marginTop: 3,
  },
  newDot: {
    width: 10,
    height: 10,
    backgroundColor: "#0554fe",
    borderRadius: 5,
    position: "absolute",
    right: 10,
    top: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  albumCover: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  promptText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 20,
  },
  confirmButton: {
    backgroundColor: "#1DB954",
    padding: 12,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  declineButton: {
    backgroundColor: "#d32f2f",
    padding: 12,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NotificationScreen;
