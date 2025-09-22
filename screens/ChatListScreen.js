import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, FlatList, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useEffect, useState } from 'react';

export default function ChatListScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('All');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const tabIndicatorAnim = useSharedValue(0);

  useEffect(() => {
    const tabIndex = ['All', 'Requests', 'Groups'].indexOf(activeTab);
    tabIndicatorAnim.value = withTiming(tabIndex * 100, { duration: 300 });
  }, [activeTab]);

  const tabIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tabIndicatorAnim.value }],
  }));

  const chats = [
    { id: '1', name: 'Alice Johnson', lastMessage: 'Hey, check out this new project!', time: '2m', type: 'dm', unread: 2 },
    { id: '2', name: 'Web3 Developers', lastMessage: 'New DAO proposal discussion', time: '5m', type: 'group', unread: 0 },
    { id: '3', name: 'Bob Smith', lastMessage: 'Thanks for the tip!', time: '1h', type: 'dm', unread: 1 },
    { id: '4', name: 'NFT Collectors', lastMessage: 'Rare drop incoming!', time: '3h', type: 'group', unread: 3 },
  ];

  const requests = [
    { id: '5', name: 'Charlie Brown', message: 'Hi, I\'d like to connect', time: '1d' },
    { id: '6', name: 'DeFi Enthusiasts', message: 'Join our community', time: '2d' },
  ];

  const getFilteredChats = () => {
    switch (activeTab) {
      case 'Requests':
        return requests;
      case 'Groups':
        return chats.filter(chat => chat.type === 'group');
      default:
        return chats;
    }
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.chatContent}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage} numberOfLines={1}>
          {item.lastMessage || item.message}
        </Text>
      </View>
      <View style={styles.chatMeta}>
        <Text style={styles.chatTime}>{item.time}</Text>
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderRequestItem = ({ item }) => (
    <View style={styles.requestItem}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.requestContent}>
        <Text style={styles.requestName}>{item.name}</Text>
        <Text style={styles.requestMessage}>{item.message}</Text>
        <View style={styles.requestActions}>
          <TouchableOpacity style={[styles.requestButton, styles.acceptButton]}>
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.requestButton, styles.declineButton]}>
            <Text style={styles.declineText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.requestTime}>{item.time}</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#1F2937', '#3B2CC0']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ENGIConnect</Text>
        <View style={styles.notificationToggle}>
          <Text style={styles.toggleLabel}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#767577', true: '#22D3EE' }}
            thumbColor={notificationsEnabled ? '#F9FAFB' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <View style={styles.tabs}>
          {['All', 'Requests', 'Groups'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={styles.tab}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Animated.View style={[styles.tabIndicator, tabIndicatorStyle]} />
      </View>

      <FlatList
        data={getFilteredChats()}
        keyExtractor={(item) => item.id}
        renderItem={activeTab === 'Requests' ? renderRequestItem : renderChatItem}
        style={styles.chatList}
        showsVerticalScrollIndicator={false}
      />

      <StatusBar style="light" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  notificationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginRight: 8,
  },
  tabsContainer: {
    position: 'relative',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 21,
  },
  tabText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#F9FAFB',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    width: 100,
    height: 34,
    backgroundColor: '#22D3EE',
    borderRadius: 21,
  },
  chatList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#22D3EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    color: '#3B2CC0',
    fontWeight: 'bold',
  },
  chatContent: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    color: '#F9FAFB',
    fontWeight: '600',
    marginBottom: 4,
  },
  chatMessage: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  chatMeta: {
    alignItems: 'flex-end',
  },
  chatTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    fontSize: 12,
    color: '#F9FAFB',
    fontWeight: 'bold',
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  requestContent: {
    flex: 1,
    marginLeft: 12,
  },
  requestName: {
    fontSize: 16,
    color: '#F9FAFB',
    fontWeight: '600',
    marginBottom: 4,
  },
  requestMessage: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  requestActions: {
    flexDirection: 'row',
  },
  requestButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  acceptButton: {
    backgroundColor: '#10B981',
  },
  declineButton: {
    backgroundColor: '#EF4444',
  },
  acceptText: {
    color: '#F9FAFB',
    fontWeight: '600',
  },
  declineText: {
    color: '#F9FAFB',
    fontWeight: '600',
  },
  requestTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});