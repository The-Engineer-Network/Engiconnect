import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function MonetizationScreen() {
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
          <Text style={styles.title}>Monetization Board</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Free vs Premium</Text>

            <View style={styles.planContainer}>
              <View style={styles.plan}>
                <Text style={styles.planTitle}>Free</Text>
                <Text style={styles.planDesc}>Basic features</Text>
                <Text style={styles.planPrice}>$0</Text>
              </View>

              <View style={[styles.plan, styles.premiumPlan]}>
                <Text style={styles.planTitle}>Premium</Text>
                <Text style={styles.planDesc}>Advanced features</Text>
                <Text style={styles.planPrice}>0.01 ETH</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Options</Text>

            <TouchableOpacity style={styles.paymentOption}>
              <Text style={styles.paymentText}>Pay with ETH</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentOption}>
              <Text style={styles.paymentText}>Pay with USDC</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentOption}>
              <Text style={styles.paymentText}>NFT Pass</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Premium Perks</Text>

            <View style={styles.perk}>
              <Text style={styles.perkText}>Encrypted Groups</Text>
            </View>

            <View style={styles.perk}>
              <Text style={styles.perkText}>Voice/Video Calls</Text>
            </View>

            <View style={styles.perk}>
              <Text style={styles.perkText}>Cross-Chain Inbox</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tip Jar</Text>
            <Text style={styles.desc}>Send crypto tips in chats</Text>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Open Tip Jar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sponsored Rooms</Text>
            <Text style={styles.desc}>Web3-native ads</Text>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Create Sponsored Room</Text>
            </TouchableOpacity>
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
    marginBottom: 16,
  },
  planContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  plan: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  premiumPlan: {
    borderWidth: 1,
    borderColor: '#22D3EE',
  },
  planTitle: {
    fontSize: 20,
    color: '#F9FAFB',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  planDesc: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 16,
    color: '#34D399',
    fontWeight: 'bold',
  },
  paymentOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
    color: '#F9FAFB',
  },
  perk: {
    backgroundColor: 'rgba(108, 71, 255, 0.2)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  perkText: {
    fontSize: 16,
    color: '#F9FAFB',
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
  },
  buttonText: {
    color: '#3B2CC0',
    fontSize: 16,
    fontWeight: 'bold',
  },
});