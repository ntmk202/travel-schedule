import { Dimensions, FlatList, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { Icon, Surface } from 'react-native-paper'
import ChatInput from '../input/ChatInput'
import ChatBubble from '../card/ChatBubble'
import { chatStream, model } from '@/configs/GeminiConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ChatbotModal = ({ visible, onDismiss }: any) => {
  const [chatHistory, setChatHistory] = React.useState<
    { role: string;  text: string }[]
  >([]);
  const [userInput, setUserInput] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any|null>(null);
  const flatListRef = React.useRef<FlatList>(null);
  const CHAT_HISTORY_KEY = 'chat_history';

  useEffect(() => {
    const StartChat = async() => {
      const result = await model.generateContent(userInput)
      const response = result.response.text()
      setChatHistory([{ role: 'model', text: response }])
    }
    StartChat()
  },[])

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem(CHAT_HISTORY_KEY);
        if (storedHistory) {
          setChatHistory(JSON.parse(storedHistory));
        }
      } catch (err) {
        console.error('Failed to load chat history:', err);
      }
    };

    if (visible) {
      loadChatHistory();
    }
  }, [visible]);

  // Save chat history to AsyncStorage
  useEffect(() => {
    const saveChatHistory = async () => {
      try {
        await AsyncStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
      } catch (err) {
        console.error('Failed to save chat history:', err);
      }
    };

    if (chatHistory.length > 0) {
      saveChatHistory();
    }
  }, [chatHistory]);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [chatHistory]);


  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    const userMessage = { role: 'user', text: userInput };

    try {
      setChatHistory((prev) => [...prev, userMessage]);
      const result = await model.generateContent(userMessage.text);
      const response = result.response.text();
      const botMessage = { role: 'model', text: response };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Error fetching response:', err);
      setError('Failed to fetch response. Please try again.');
    } finally {
      setUserInput('');
      setLoading(false);
    }
  };
  

  const renderChatItem = ({ item }: { item: { role: string, text: string }}) => (
    <ChatBubble
      role={item.role}
      text={item.text} 
      time={new Date().toLocaleTimeString()}
    />
  );

  return (
    <Modal visible={visible} animationType='slide' transparent={true}>
      <KeyboardAvoidingView style={{flex:1}}>
      <View style={styles.container}>
        <Surface elevation={2} style={styles.surface}>
          <View style={[styles.row, styles.bar]}>
            <View style={[styles.row, {width: '80%'}]}>
              <Icon source='robot-outline' size={30} />
              <Text style={styles.title}>AI planner</Text>
            </View>
            <TouchableOpacity onPress={onDismiss}>
              <Icon source='close-circle-outline' size={24} />
            </TouchableOpacity>
          </View>
          <FlatList
              ref={flatListRef}
              data={chatHistory}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderChatItem}
              contentContainerStyle={{ padding: 20 }}
              style={{marginBottom: '20%'}}
            />
          <ChatInput value={userInput} onChangeText={(text:string) => setUserInput(text)} onPress={handleUserInput}/>
        </Surface>
      </View>
          </KeyboardAvoidingView>
    </Modal>
  )
}

export default ChatbotModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  surface: { 
    height : Dimensions.get('screen').height * 0.9,
    backgroundColor: '#fff', 
    borderRadius: 10
  },
  bar:{
    borderBottomWidth: 1,
    borderBottomColor: '#adadad',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontFamily: 'RC_Medium',
    
  },
})