import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";

// ✅ Define message type
type Message = {
  id: string;
  text: string;
  sender: "user" | "ai" | "error";
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello! I am your AI assistant 🤖", sender: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList<Message>>(null);

  // ✅ Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const aiMessage: Message = {
        id: Date.now().toString(),
        text: data.reply || "⚠️ No response from AI.",
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "⚠️ Error connecting to AI. Please try again later.",
          sender: "error",
        },
      ]);
    }

    setLoading(false);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.message,
        item.sender === "user"
          ? styles.userMessage
          : item.sender === "ai"
          ? styles.aiMessage
          : styles.errorMessage,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.sender === "user" && { color: "#fff" },
          item.sender === "error" && { color: "#fff" },
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
          <View style={styles.header}>
                <Text style={styles.headerText}>Chat with Bot</Text>
              </View>
      <FlatList<Message>
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatContainer}
      />

      {/* Typing indicator */}
      {loading && (
        <View style={styles.typingIndicator}>
          <ActivityIndicator size="small" color="#007bff" />
          <Text style={{ marginLeft: 6, color: "#666" }}>AI is typing...</Text>
        </View>
      )}

      {/* Input bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
          editable={!loading}
        />
        <TouchableOpacity
          style={[styles.sendButton, loading || !input.trim() ? { opacity: 0.5 } : {}]}
          onPress={sendMessage}
          disabled={loading || !input.trim()}
        >
          <Text style={styles.sendText}>{loading ? "..." : "Send"}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  chatContainer: { paddingVertical: 90, paddingHorizontal: 10 },
   header: {
    position: "absolute",
    top: 0,
    width: "100%",
  
    paddingVertical: 20,
    paddingHorizontal: 10,
    zIndex: 10,

  },
  headerText: {
    top:10,
    fontSize: 20,
    color: "#020202ff",
    fontWeight: "bold",
    textAlign: "center",
  },
  message: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 16,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e5ea",
  },
  errorMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ff4d4d",
  },
  messageText: { fontSize: 16 },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendText: { color: "#fff", fontWeight: "bold" },
});
