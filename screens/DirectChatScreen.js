import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, Modal, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import EmojiPicker, { emojiData } from '@hiraku-ai/react-native-emoji-picker';
import styles from '../styles/DirectChatStyles';

export default function DirectChatScreen({ navigation, route }) {
  const { chatId, chatName } = route.params || { chatId: '1', chatName: 'Alice Johnson' };
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hey, check out this new project!', sender: 'other', time: '2m' },
    { id: '2', text: 'Looks interesting! Tell me more.', sender: 'me', time: '1m' },
  ]);
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prev => prev.map(msg => {
        if (msg.selfDestruct && msg.selfDestructTime && Date.now() > msg.selfDestructTime) {
          return { ...msg, text: 'Message self-destructed 💥', selfDestruct: false };
        }
        return msg;
      }));
    }, 1000);

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      clearInterval(interval);
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'me',
        time: 'now',
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newMessage = {
        id: Date.now().toString(),
        image: result.assets[0].uri,
        sender: 'me',
        time: 'now',
      };
      setMessages(prev => [...prev, newMessage]);
      setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'me' ? styles.myMessage : item.sender === 'ai' ? styles.aiMessage : styles.otherMessage]}>
      {item.text && <Text style={styles.messageText}>{item.text}</Text>}
      {item.image && <Image source={{ uri: item.image }} style={styles.messageImage} />}
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#1F2937', '#3B2CC0']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F9FAFB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{chatName}</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="#F9FAFB" />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={[styles.inputContainer, { bottom: keyboardHeight }]}
      >
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.attachButton} onPress={() => setShowAttachmentModal(true)}>
            <Ionicons name="add" size={24} color="#22D3EE" />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor="#9CA3AF"
            multiline
          />
          <TouchableOpacity style={styles.emojiButton} onPress={() => setShowEmojiPicker(true)}>
            <Ionicons name="happy" size={24} color="#22D3EE" />
          </TouchableOpacity>
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={20} color="#F9FAFB" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal visible={showAttachmentModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.attachmentModal}>
            <Text style={styles.modalTitle}>Attachments</Text>
            <View style={styles.attachmentGrid}>
              <TouchableOpacity style={styles.attachmentItem} onPress={() => { pickImage(); setShowAttachmentModal(false); }}>
                <Ionicons name="camera" size={32} color="#22D3EE" />
                <Text style={styles.attachmentText}>Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentItem} onPress={() => {
                const newMessage = { id: Date.now().toString(), text: 'Sent 0.1 ETH 💰', sender: 'me', time: 'now' };
                setMessages(prev => [...prev, newMessage]); setShowAttachmentModal(false);
                setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
              }}>
                <Ionicons name="cash" size={32} color="#22D3EE" />
                <Text style={styles.attachmentText}>Token</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentItem} onPress={() => {
                const newMessage = { id: Date.now().toString(), text: 'Shared NFT: Cool Art 🖼️', sender: 'me', time: 'now' };
                setMessages(prev => [...prev, newMessage]); setShowAttachmentModal(false);
                setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
              }}>
                <Ionicons name="image" size={32} color="#22D3EE" />
                <Text style={styles.attachmentText}>NFT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentItem} onPress={() => {
                const newMessage = { id: Date.now().toString(), text: 'DAO Proposal Vote: Approved ✅', sender: 'me', time: 'now' };
                setMessages(prev => [...prev, newMessage]); setShowAttachmentModal(false);
                setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
              }}>
                <Ionicons name="checkmark-circle" size={32} color="#22D3EE" />
                <Text style={styles.attachmentText}>DAO</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentItem} onPress={() => {
                const newMessage = { id: Date.now().toString(), text: inputText || 'Secret message', sender: 'me', time: 'now', selfDestruct: true, selfDestructTime: Date.now() + 5000 };
                setMessages(prev => [...prev, newMessage]); setInputText(''); setShowAttachmentModal(false);
                setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
              }}>
                <Ionicons name="nuclear" size={32} color="#22D3EE" />
                <Text style={styles.attachmentText}>Self-Destruct</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentItem} onPress={() => {
                const aiMessage = { id: Date.now().toString(), text: 'AI Assistant: Message scanned - no scams detected. Wallet summary: 1.5 ETH, 2 NFTs 🤖', sender: 'ai', time: 'now' };
                setMessages(prev => [...prev, aiMessage]); setShowAttachmentModal(false);
                setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
              }}>
                <Ionicons name="hardware-chip" size={32} color="#22D3EE" />
                <Text style={styles.attachmentText}>AI</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.closeModal} onPress={() => setShowAttachmentModal(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <EmojiPicker
        onEmojiSelect={(emoji) => {
          setInputText(prev => prev + emoji);
          // Keep picker open for multiple selections
        }}
        emojis={emojiData}
        visible={showEmojiPicker}
        onClose={() => setShowEmojiPicker(false)}
        showHistoryTab={true}
        showSearchBar={true}
      />

      <StatusBar style="light" />
    </LinearGradient>
  );
}

