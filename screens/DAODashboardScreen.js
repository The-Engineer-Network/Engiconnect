import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function DAODashboardScreen() {
  const [apiKey, setApiKey] = useState('');
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#22D3EE" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={animatedStyle}>
          <Text style={styles.title}>DAO / Dapp API Dashboard</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Create Branded Chatrooms</Text>
            <Text style={styles.desc}>For DAOs & NFT projects</Text>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Create New Room</Text>
            </TouchableOpacity>

            <View style={styles.roomList}>
              <Text style={styles.roomItem}>DAO Governance Room</Text>
              <Text style={styles.roomItem}>NFT Holder Lounge</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>API Access for Devs</Text>
            <Text style={styles.desc}>Embed chat in your dapps</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter API Key"
              placeholderTextColor="#9CA3AF"
              value={apiKey}
              onChangeText={setApiKey}
            />

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Generate API Key</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Documentation</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Subscription & Payments</Text>

            <View style={styles.subscription}>
              <Text style={styles.subTitle}>Monthly Plan</Text>
              <Text style={styles.subPrice}>0.05 ETH</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Subscribe</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.subscription}>
              <Text style={styles.subTitle}>Annual Plan</Text>
              <Text style={styles.subPrice}>0.5 ETH</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Subscribe</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
      <StatusBar style="light" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#F9FAFB',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#22D3EE',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#22D3EE',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: '#3B2CC0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  roomList: {
    marginTop: 16,
  },
  roomItem: {
    fontSize: 16,
    color: '#F9FAFB',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 8,
    color: '#F9FAFB',
    marginBottom: 16,
  },
  subscription: {
    backgroundColor: 'rgba(108, 71, 255, 0.2)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 18,
    color: '#F9FAFB',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subPrice: {
    fontSize: 16,
    color: '#34D399',
    fontWeight: 'bold',
    marginBottom: 16,
  },
});