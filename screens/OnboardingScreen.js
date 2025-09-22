import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence } from 'react-native-reanimated';
import { useEffect, useState } from 'react';

export default function OnboardingScreen({ navigation }) {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [alias, setAlias] = useState('');
  const [stealthMode, setStealthMode] = useState(false);

  const pulseAnim = useSharedValue(1);

  useEffect(() => {
    pulseAnim.value = withRepeat(withSequence(withTiming(1.1, { duration: 1000 }), withTiming(1, { duration: 1000 })), -1, true);
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim.value }],
  }));

  const wallets = [
    { name: 'MetaMask', icon: '🦊' },
    { name: 'Coinbase Wallet', icon: '📱' },
    { name: 'Trust Wallet', icon: '🔒' },
    { name: 'Argent X (Starknet)', icon: '⚡' },
  ];

  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet);
    // Mock proof of activity
    Alert.alert('Proof of Activity', `Checking ${wallet.name} balance...`, [
      { text: 'OK', onPress: () => console.log('Balance checked') }
    ]);
  };

  const handleContinue = () => {
    if (!selectedWallet) {
      Alert.alert('Error', 'Please select a wallet');
      return;
    }
    if (!alias.trim()) {
      Alert.alert('Error', 'Please set an alias');
      return;
    }
    // Navigate to ChatList
    navigation.navigate('Main');
  };

  return (
    <LinearGradient colors={['#1F2937', '#3B2CC0']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Wallet Connection</Text>
        <Text style={styles.subtitle}>Choose your wallet to get started</Text>

        <View style={styles.walletsContainer}>
          {wallets.map((wallet, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.walletCard, selectedWallet?.name === wallet.name && styles.selectedWallet]}
              onPress={() => handleWalletSelect(wallet)}
            >
              <Text style={styles.walletIcon}>{wallet.icon}</Text>
              <Text style={styles.walletName}>{wallet.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedWallet && (
          <Animated.View style={[styles.proofContainer, pulseStyle]}>
            <Text style={styles.proofTitle}>Proof of Activity</Text>
            <Text style={styles.proofText}>ETH Balance: 0.5 ETH</Text>
            <Text style={styles.proofText}>Status: Verified ✅</Text>
          </Animated.View>
        )}

        <View style={styles.aliasContainer}>
          <Text style={styles.aliasTitle}>Set Your Alias</Text>
          <TextInput
            style={styles.aliasInput}
            placeholder="Enter your alias"
            placeholderTextColor="#9CA3AF"
            value={alias}
            onChangeText={setAlias}
          />
          <TouchableOpacity
            style={[styles.toggleButton, stealthMode && styles.toggleActive]}
            onPress={() => setStealthMode(!stealthMode)}
          >
            <Text style={styles.toggleText}>Stealth Mode: {stealthMode ? 'ON' : 'OFF'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.integrationContainer}>
          <Text style={styles.integrationTitle}>Integrations</Text>
          <TouchableOpacity style={styles.integrationButton}>
            <Text style={styles.integrationText}>Connect ENS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.integrationButton}>
            <Text style={styles.integrationText}>Connect Unstoppable</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.integrationButton}>
            <Text style={styles.integrationText}>Set NFT Avatar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueText}>Continue to ENGIConnect</Text>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#9CA3AF',
    marginBottom: 32,
    textAlign: 'center',
  },
  walletsContainer: {
    width: '100%',
    marginBottom: 32,
  },
  walletCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.3)',
  },
  selectedWallet: {
    borderColor: '#22D3EE',
    backgroundColor: 'rgba(34, 211, 238, 0.2)',
  },
  walletIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  walletName: {
    fontSize: 18,
    color: '#F9FAFB',
    fontWeight: '600',
  },
  proofContainer: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  proofTitle: {
    fontSize: 20,
    color: '#10B981',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  proofText: {
    fontSize: 16,
    color: '#F9FAFB',
    marginBottom: 4,
  },
  aliasContainer: {
    width: '100%',
    marginBottom: 32,
  },
  aliasTitle: {
    fontSize: 20,
    color: '#22D3EE',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  aliasInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#F9FAFB',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.3)',
  },
  toggleButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.3)',
  },
  toggleActive: {
    backgroundColor: 'rgba(34, 211, 238, 0.2)',
    borderColor: '#22D3EE',
  },
  toggleText: {
    fontSize: 16,
    color: '#F9FAFB',
    fontWeight: '600',
  },
  integrationContainer: {
    width: '100%',
    marginBottom: 32,
  },
  integrationTitle: {
    fontSize: 20,
    color: '#34D399',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  integrationButton: {
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#34D399',
  },
  integrationText: {
    fontSize: 16,
    color: '#F9FAFB',
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#22D3EE',
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  continueText: {
    color: '#3B2CC0',
    fontSize: 18,
    fontWeight: 'bold',
  },
});