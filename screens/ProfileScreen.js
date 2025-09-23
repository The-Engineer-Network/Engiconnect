import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const [stealthMode, setStealthMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('dark');
  const navigation = useNavigation();

  const fadeAnim = useSharedValue(0);

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 1000 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  return (
    <LinearGradient colors={['#1F2937', '#3B2CC0']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[styles.profileHeader, animatedStyle]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>U</Text>
          </View>
          <Text style={styles.username}>@user123</Text>
          <Text style={styles.walletAddress}>0x1234...abcd</Text>
        </Animated.View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Manage ENS Name</Text>
            <Text style={styles.settingValue}>user123.eth</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Unstoppable Domain</Text>
            <Text style={styles.settingValue}>user.crypto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>NFT Avatar</Text>
            <Text style={styles.settingValue}>Set Avatar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Linked Wallets</Text>
            <Text style={styles.settingValue}>2 connected</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('Monetization')}
          >
            <Text style={styles.settingText}>Monetization Board</Text>
            <Text style={styles.settingValue}>></Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('DAODashboard')}
          >
            <Text style={styles.settingText}>DAO Dashboard</Text>
            <Text style={styles.settingValue}>></Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Stealth Mode</Text>
            <Switch
              value={stealthMode}
              onValueChange={setStealthMode}
              trackColor={{ false: '#767577', true: '#22D3EE' }}
              thumbColor={stealthMode ? '#F9FAFB' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Push Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: '#22D3EE' }}
              thumbColor={notifications ? '#F9FAFB' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>

          <TouchableOpacity
            style={[styles.settingItem, theme === 'dark' && styles.activeSetting]}
            onPress={() => setTheme('dark')}
          >
            <Text style={styles.settingText}>Dark Theme</Text>
            <Text style={styles.settingValue}>Active</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingItem, theme === 'light' && styles.activeSetting]}
            onPress={() => setTheme('light')}
          >
            <Text style={styles.settingText}>Light Theme</Text>
            <Text style={styles.settingValue}>Coming Soon</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Disconnect Wallet</Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar style="light" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#22D3EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    color: '#3B2CC0',
    fontWeight: 'bold',
  },
  username: {
    fontSize: 24,
    color: '#F9FAFB',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  walletAddress: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#22D3EE',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  activeSetting: {
    borderWidth: 1,
    borderColor: '#22D3EE',
  },
  settingText: {
    fontSize: 16,
    color: '#F9FAFB',
  },
  settingValue: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },
  logoutText: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: 'bold',
  },
});