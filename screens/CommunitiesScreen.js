import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

export default function CommunitiesScreen() {
  const fadeAnim = useSharedValue(0);

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 1000 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  const communities = [
    { id: '1', name: 'Web3 Developers', members: 1250, description: 'Building the future of the web', gated: true },
    { id: '2', name: 'NFT Collectors', members: 890, description: 'Rare digital art and collectibles', gated: true },
    { id: '3', name: 'DeFi Enthusiasts', members: 2100, description: 'Decentralized finance discussions', gated: false },
    { id: '4', name: 'Crypto Traders', members: 3400, description: 'Market analysis and trading strategies', gated: false },
  ];

  const renderCommunityItem = ({ item }) => (
    <Animated.View style={[styles.communityCard, animatedStyle]}>
      <View style={styles.communityHeader}>
        <Text style={styles.communityName}>{item.name}</Text>
        {item.gated && <Text style={styles.gatedBadge}>Token Gated</Text>}
      </View>
      <Text style={styles.communityDescription}>{item.description}</Text>
      <Text style={styles.memberCount}>{item.members} members</Text>
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinText}>{item.gated ? 'Unlock Access' : 'Join Community'}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <LinearGradient colors={['#1F2937', '#3B2CC0']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Communities</Text>
        <TouchableOpacity style={styles.exploreButton}>
          <Text style={styles.exploreText}>Explore All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={communities}
        keyExtractor={(item) => item.id}
        renderItem={renderCommunityItem}
        style={styles.communityList}
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
  exploreButton: {
    backgroundColor: '#22D3EE',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  exploreText: {
    color: '#3B2CC0',
    fontWeight: '600',
  },
  communityList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  communityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.3)',
  },
  communityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  communityName: {
    fontSize: 18,
    color: '#F9FAFB',
    fontWeight: '600',
  },
  gatedBadge: {
    backgroundColor: '#F59E0B',
    color: '#1F2937',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  communityDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  memberCount: {
    fontSize: 12,
    color: '#22D3EE',
    marginBottom: 12,
  },
  joinButton: {
    backgroundColor: '#22D3EE',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinText: {
    color: '#3B2CC0',
    fontWeight: '600',
  },
});