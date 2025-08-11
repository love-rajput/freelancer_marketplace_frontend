import React, { useState, useEffect } from "react";
import socket from "../utils/socket";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const GlobalChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [senderUsername, setSenderUsername] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [receiverName, setReceiverName] = useState(null);
  const [receiverAvatar, setReceiverAvatar] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [conversations, setConversations] = useState([]); // List of freelancers
  const [selectedUser, setSelectedUser] = useState(null); // The freelancer you are chatting with
  const [chatHistories, setChatHistories] = useState({}); // { userId: [messages] }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      setCurrentUserId(user.id);
      setSenderUsername(user.username);
    }
  }, []);

  useEffect(() => {
    if (currentUserId && isOpen) {
      socket.emit("addUser", currentUserId);
      setIsConnected(true);

      socket.on("msg-receive", (data) => {
        // Add freelancer to conversations if not present
        setConversations((prev) => {
          if (prev.some((u) => u.userId === data.senderId)) return prev;
          return [
            {
              userId: data.senderId,
              username: data.senderUsername,
              avatar: data.avatar,
              isOnline: true,
            },
            ...prev,
          ];
        });

        // Add message to chatHistories
        setChatHistories((prev) => ({
          ...prev,
          [data.senderId]: [
            ...(prev[data.senderId] || []),
            { ...data, fromSelf: false },
          ],
        }));
      });

      return () => {
        socket.off("msg-receive");
        setIsConnected(false);
      };
    }
  }, [currentUserId, isOpen]);

  const sendMessage = () => {
    if (text.trim() === "" || !selectedUser) return;

    const message = {
      senderUsername,
      senderId: currentUserId,
      receiverId: selectedUser.userId,
      message: text.trim(),
    };

    socket.emit("send-msg", message);

    setChatHistories((prev) => ({
      ...prev,
      [selectedUser.userId]: [
        ...(prev[selectedUser.userId] || []),
        { ...message, fromSelf: true },
      ],
    }));

    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const toggleChat = () => {
    if (!isOpen) {
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 2000);
    }
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
    setMessages([]);
    setReceiverId(null);
    setReceiverName(null);
    setReceiverAvatar(null);
    setShowAnimation(false);
    setSelectedUser(null); // Reset selected user
  };

  // Function to start a chat with a specific user (can be called from other components)
  const startChat = (targetUserId, receiverName, receiverAvatar) => {
    setShowAnimation(true);
    setReceiverId(targetUserId);
    setReceiverName(receiverName);
    setReceiverAvatar(receiverAvatar);
    setIsOpen(true);
    setMessages([]);

    // Create or find the freelancer in conversations
    const freelancerUser = {
      userId: targetUserId,
      username: receiverName,
      avatar: receiverAvatar,
      isOnline: true,
    };

    // Add to conversations if not already present
    setConversations((prev) => {
      if (prev.some((u) => u.userId === targetUserId)) {
        return prev;
      }
      return [freelancerUser, ...prev];
    });

    // Set as selected user immediately
    setSelectedUser(freelancerUser);

    // Initialize chat history if not exists
    setChatHistories((prev) => ({
      ...prev,
      [targetUserId]: prev[targetUserId] || [],
    }));

    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    // Optionally reset unread count here
  };

  // Expose startChat function globally
  useEffect(() => {
    window.startGlobalChat = startChat;
    return () => {
      delete window.startGlobalChat;
    };
  }, []);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={toggleChat}
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center animate-pulse"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </Button>
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          </div>
        </div>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[800px] h-110 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex overflow-hidden">
          {/* Left: Conversations */}
          <div className="w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col">
            <div className="bg-green-500 text-white p-4 flex items-center justify-between">
              <h3 className="font-semibold text-sm">Chats</h3>
              <button
                onClick={closeChat}
                className="text-white hover:text-gray-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No conversations yet
                </div>
              ) : (
                conversations.map((user) => (
                  <div
                    key={user.userId}
                    onClick={() => selectUser(user)}
                    className={`p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors ${
                      selectedUser?.userId === user.userId
                        ? "bg-green-50 border-l-4 border-l-green-500"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm text-gray-800">
                          {user.username}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right: Chat Area */}
          <div className="flex-1 flex flex-col">
            {!selectedUser ? (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <p className="text-gray-500 text-sm">
                  Select a freelancer to start chatting
                </p>
              </div>
            ) : (
              <>
                <div className="bg-white border-b border-gray-200 p-3 flex items-center gap-3">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      {selectedUser.username}
                    </p>
                    <p className="text-xs text-green-500">
                      {selectedUser.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex-1 p-3 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
                  {showAnimation ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-30 h-30 mb-2">
                        <DotLottieReact
                          src="https://lottie.host/7b7c55f3-1ee2-4c0d-8b07-a16fb90b2cfd/Thaqq6vlCh.lottie"
                          loop
                          autoplay
                        />
                      </div>
                      <p className="text-green-600 text-xs font-medium">
                        Loading chat...
                      </p>
                    </div>
                  ) : chatHistories[selectedUser.userId]?.length === 0 ||
                    !chatHistories[selectedUser.userId] ? (
                    <div className="flex items-center justify-center h-full text-center">
                      <p className="text-gray-500 text-sm">
                        No messages yet. Start the conversation!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {chatHistories[selectedUser.userId]?.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${
                            msg.fromSelf ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                              msg.fromSelf
                                ? "bg-green-500 text-white rounded-br-none"
                                : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                            }`}
                          >
                            {msg.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-gray-200 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!text.trim()}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalChatWidget;
