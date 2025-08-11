import React, { useState, useEffect } from "react";
import socket from "../utils/socket";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import API from "../utils/api";

const FreelancerChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [input, setInput] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [chatHistories, setChatHistories] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?._id && user?.role === "freelancer") {
      setCurrentUserId(user._id);
    }
  }, []);

  useEffect(() => {
    if (currentUserId && isOpen) {
   
      socket.emit("addUser", currentUserId);
      setIsConnected(true);

      socket.on("msg-receive", async (data) => {
        if (data.senderId === currentUserId) return;
        const newMessage = {
          senderId: data.senderId,
          message: data.message,
          timestamp: new Date(),
          fromSelf: false,
          isOnline: true,
        };
        selectedClient.isOnline = true;

        setChatHistories((prev) => ({
          ...prev,
          [data.senderId]: [...(prev[data.senderId] || []), newMessage],
        }));

        // Reset unread count for other conversations
        if (selectedClient?.userId !== data.senderId) {
          setUnreadCounts((prev) => ({ ...prev, [data.senderId]: 0 }));
        }

        // Add or update client in conversations list
        setConversations((prev) => {
          const existingClientIndex = prev.findIndex(
            (client) => client.userId === data.senderId
          );

          if (existingClientIndex >= 0) {
            // Update existing client's last message and set isOnline to true
            const updated = [...prev];
            updated[existingClientIndex] = {
              ...updated[existingClientIndex],
              lastMessage: data.message,
              isOnline: true, // <-- Always set online when message received
            };
            return updated;
          } else {
            // Add new client to conversations
            const newClient = {
              userId: data.senderId,
              username: data.senderUsername,
              avatar:
                data.avatar ||
                "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg",
              lastMessage: data.message,
              isOnline: true, // <-- Always set online when message received
            };
            // Add new client to the database
            API.post("/chat/conversations/add-client", {
              userId: newClient.userId,
              username: newClient.username,
              avatar: newClient.avatar,
            });
            return [newClient, ...prev];
          }
        });
      });

      return () => {
        socket.off("msg-receive");
        setIsConnected(false);
      };
    }
  }, [currentUserId, isOpen, selectedClient]);

  useEffect(() => {
    if (isOpen) {
      // Fetch clients from backend when chat is opened
      API.get("/chat/conversations/clients")
        .then((res) => {
          setConversations(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch clients:", err);
        });
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (input.trim() === "" || !selectedClient) return;

    // Get freelancer details from backend
    const freelancerId = JSON.parse(localStorage.getItem("user"));
    const freelancer = await API.get(`/freelancers/`);

    const avatar = freelancer?.data?.avatar;

    const newMessage = {
      senderUsername: freelancer?.data?.username,
      senderId: currentUserId,
      receiverId: selectedClient.userId,
      message: input.trim(),
      avatar: avatar,
      fromSelf: true, // <-- Add this
    };

    // Send via socket (use correct properties)
    socket.emit("send-msg", {
      senderUsername: freelancer?.data?.username, // <-- fix here
      avatar: freelancer?.data?.avatar, // <-- fix here
      senderId: currentUserId,
      receiverId: selectedClient.userId,
      message: input.trim(),
    });

    setChatHistories((prev) => ({
      ...prev,
      [selectedClient.userId]: [
        ...(prev[selectedClient.userId] || []),
        newMessage,
      ],
    }));

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const selectClient = async (client) => {
    setSelectedClient(client);
    setUnreadCounts((prev) => ({
      ...prev,
      [client.userId]: 0,
    }));
    setShowAnimation(true);
    // Reset chat history for this client to empty (no messages)
    setChatHistories((prev) => ({
      ...prev,
      [client.userId]: [],
    }));
    setTimeout(() => setShowAnimation(false), 2000);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
    setSelectedClient(null);
    setChatHistories({});
  };

  const getTotalUnreadCount = () => {
    return Object.values(unreadCounts).reduce((sum, count) => sum + count, 0);
  };

  useEffect(() => {
    window.startGlobalChat = toggleChat;
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
            className="w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center animate-pulse"
          >
            <svg
              className="w-7 h-7"
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
          {/* Unread Badge */}
          {getTotalUnreadCount() > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {getTotalUnreadCount() > 99 ? "99+" : getTotalUnreadCount()}
              </span>
            </div>
          )}
        </div>
      )}

      {/* WhatsApp-like Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[800px] h-110 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex overflow-hidden">
          {/* Left Panel: Client List */}
          <div className="w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">Giglyy</h3>
                {isConnected && (
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                )}
              </div>
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

            {/* Client List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No conversations yet
                </div>
              ) : (
                conversations.map((client) => (
                  <div
                    key={client.userId}
                    onClick={() => selectClient(client)}
                    className={`p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors ${
                      selectedClient?.userId === client.userId
                        ? "bg-blue-50 border-l-4 border-l-blue-500"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={client.avatar}
                          alt={client.username}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {client.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-800 truncate">
                          {client.username}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {client.lastMessage}
                        </p>
                      </div>
                      {unreadCounts[client.userId] > 0 && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {unreadCounts[client.userId]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Panel: Chat Area */}
          <div className="flex-1 flex flex-col">
            {!selectedClient ? (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg
                      className="w-8 h-8 text-gray-400"
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
                  </div>
                  <p className="text-gray-500 text-sm">
                    Select a client to start chatting
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Chat Header */}
                <div className="bg-white border-b border-gray-200 p-3 flex items-center gap-3">
                  <img
                    src={selectedClient.avatar}
                    alt={selectedClient.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      {selectedClient.username}
                    </p>
                    <p className="text-xs text-green-500">
                      {selectedClient.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>

                {/* Messages Area */}
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
                      <p className="text-blue-600 text-xs font-medium">
                        Loading chat...
                      </p>
                    </div>
                  ) : chatHistories[selectedClient.userId].length === 0 ? (
                    <div className="flex items-center justify-center h-full text-center">
                      <p className="text-gray-500 text-sm">
                        No messages yet. Start the conversation!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {chatHistories[selectedClient.userId].map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${
                            msg.fromSelf ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                              msg.fromSelf
                                ? "bg-blue-500 text-white rounded-br-none"
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

                {/* Input Area */}
                <div className="p-3 border-t border-gray-200 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
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

export default FreelancerChat;
