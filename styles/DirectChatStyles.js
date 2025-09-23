import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  messagesList: {
    flex: 1,
    paddingBottom: 80, // Space for input
  },
  messagesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  messageContainer: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 18,
    marginBottom: 8,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#22D3EE',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  aiMessage: {
    alignSelf: 'center',
    backgroundColor: 'rgba(34, 211, 238, 0.2)',
    borderWidth: 1,
    borderColor: '#22D3EE',
  },
  messageText: {
    fontSize: 16,
    color: '#F9FAFB',
  },
  messageTime: {
    fontSize: 12,
    color: 'rgba(249, 250, 251, 0.7)',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 4,
  },
  inputContainer: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachButton: {
    padding: 10,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    color: '#F9FAFB',
    maxHeight: 100,
  },
  emojiButton: {
    padding: 10,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#22D3EE',
    borderRadius: 20,
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  attachmentModal: {
    backgroundColor: '#1F2937',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },
  emojiModal: {
    backgroundColor: '#1F2937',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    color: '#F9FAFB',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  attachmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  attachmentItem: {
    alignItems: 'center',
    padding: 10,
    margin: 5,
  },
  attachmentText: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 5,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  emojiItem: {
    padding: 10,
    margin: 5,
  },
  emojiText: {
    fontSize: 30,
  },
  closeModal: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
  },
  closeText: {
    color: '#22D3EE',
    fontSize: 16,
  },
});