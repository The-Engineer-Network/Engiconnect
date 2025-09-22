import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence, withDelay } from 'react-native-reanimated';
import { useEffect } from 'react';

export default function LandingScreen({ navigation }) {
  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(1);
  const floatAnim1 = useSharedValue(0);
  const floatAnim2 = useSharedValue(0);
  const floatAnim3 = useSharedValue(0);

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 2000 });
    scaleAnim.value = withRepeat(withSequence(withTiming(1.05, { duration: 2000 }), withTiming(1, { duration: 2000 })), -1, true);
    floatAnim1.value = withRepeat(withSequence(withTiming(10, { duration: 3000 }), withTiming(-10, { duration: 3000 })), -1, true);
    floatAnim2.value = withDelay(1000, withRepeat(withSequence(withTiming(-15, { duration: 4000 }), withTiming(15, { duration: 4000 })), -1, true));
    floatAnim3.value = withDelay(2000, withRepeat(withSequence(withTiming(20, { duration: 5000 }), withTiming(-20, { duration: 5000 })), -1, true));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ scale: scaleAnim.value }],
  }));

  const floatStyle1 = useAnimatedStyle(() => ({
    transform: [{ translateY: floatAnim1.value }],
  }));

  const floatStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateY: floatAnim2.value }],
  }));

  const floatStyle3 = useAnimatedStyle(() => ({
    transform: [{ translateY: floatAnim3.value }],
  }));

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#3B2CC0', '#6C47FF']} style={styles.gradient}>
        {/* Floating background elements */}
        <Animated.View style={[styles.floatingCircle, floatStyle1, { backgroundColor: 'rgba(34, 211, 238, 0.2)' }]} />
        <Animated.View style={[styles.floatingCircle, floatStyle2, { backgroundColor: 'rgba(52, 211, 153, 0.2)', width: 64, height: 64 }]} />
        <Animated.View style={[styles.floatingCircle, floatStyle3, { backgroundColor: 'rgba(16, 185, 129, 0.2)', width: 96, height: 96 }]} />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animated.View style={[styles.content, animatedStyle]}>
            <Text style={styles.title}>ENGIConnect</Text>
            <Text style={styles.tagline}>Connect. Build. Grow.</Text>
            <Text style={styles.description}>
              Web3-powered community hub for engineers and tech creatives. Connect & chat, explore token-gated communities, showcase NFTs & projects.
            </Text>

            <View style={styles.featuresContainer}>
              <Text style={styles.featuresTitle}>Features Preview</Text>
              <Animated.View style={[styles.featureCard, floatStyle1]}>
                <Text style={styles.featureText}>🔐 Secure wallet-only login</Text>
              </Animated.View>
              <Animated.View style={[styles.featureCard, floatStyle2]}>
                <Text style={styles.featureText}>🏛️ Token-gated communities</Text>
              </Animated.View>
              <Animated.View style={[styles.featureCard, floatStyle3]}>
                <Text style={styles.featureText}>💰 Monetize via tips and premium tiers</Text>
              </Animated.View>
            </View>

            <TouchableOpacity style={styles.connectButton} onPress={() => navigation.navigate('Onboarding')}>
              <Text style={styles.connectButtonText}>Connect Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.waitlistButton}>
              <Text style={styles.waitlistButtonText}>Join Waitlist / Get NFT Pass</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    position: 'relative',
  },
  floatingCircle: {
    position: 'absolute',
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 30,
    color: '#22D3EE',
    marginBottom: 8,
    fontWeight: '600',
  },
  description: {
    fontSize: 18,
    color: '#F9FAFB',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 32,
    width: '100%',
    maxWidth: 400,
  },
  featuresTitle: {
    fontSize: 20,
    color: '#22D3EE',
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.3)',
  },
  featureText: {
    color: '#F9FAFB',
    fontSize: 16,
  },
  connectButton: {
    backgroundColor: '#22D3EE',
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  connectButtonText: {
    color: '#3B2CC0',
    fontSize: 20,
    fontWeight: 'bold',
  },
  waitlistButton: {
    borderWidth: 2,
    borderColor: '#22D3EE',
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  waitlistButtonText: {
    color: '#22D3EE',
    fontSize: 18,
    fontWeight: '600',
  },
});
