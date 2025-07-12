import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Image, Calendar, MoreVertical, Search, User } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  image_url: string | null;
  sent_at: string;
  is_read: boolean;
}

interface ChatUser {
  id: string;
  fullname: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  avatar: string;
}

export default function Chat() {
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<ChatUser[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced dummy data with realistic images
  const DUMMY_CHAT_USERS: ChatUser[] = [
    { 
      id: '2', 
      fullname: 'Alice Kim', 
      lastMessage: 'See you at 5pm!', 
      lastMessageTime: '2024-07-10T17:00:00Z', 
      unreadCount: 1,
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    { 
      id: '3', 
      fullname: 'Ben Singh', 
      lastMessage: 'Thanks for the help!', 
      lastMessageTime: '2024-07-09T14:30:00Z', 
      unreadCount: 0,
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    { 
      id: '4', 
      fullname: 'Carla Lopez', 
      lastMessage: 'Can we schedule a session?', 
      lastMessageTime: '2024-07-08T10:15:00Z', 
      unreadCount: 2,
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
    },
  ];

  const DUMMY_PENDING_REQUESTS: ChatUser[] = [
    { 
      id: '5', 
      fullname: 'David Brown', 
      lastMessage: 'Hi! Can we connect?', 
      lastMessageTime: '2024-07-11T10:00:00Z', 
      unreadCount: 0,
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
    },
    { 
      id: '6', 
      fullname: 'Emma Zhang', 
      lastMessage: 'Would love to learn from you!', 
      lastMessageTime: '2024-07-11T09:30:00Z', 
      unreadCount: 0,
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg'
    },
  ];

  const DUMMY_MESSAGES: { [key: string]: Message[] } = {
    '2': [
      { id: '1', sender_id: '1', receiver_id: '2', content: 'Hi Alice!', image_url: null, sent_at: '2024-07-10T16:00:00Z', is_read: true },
      { id: '2', sender_id: '2', receiver_id: '1', content: 'Hi there! How are you?', image_url: null, sent_at: '2024-07-10T16:05:00Z', is_read: true },
      { id: '3', sender_id: '1', receiver_id: '2', content: 'Great! Ready for our session?', image_url: null, sent_at: '2024-07-10T16:10:00Z', is_read: true },
      { id: '4', sender_id: '2', receiver_id: '1', content: 'See you at 5pm!', image_url: null, sent_at: '2024-07-10T17:00:00Z', is_read: false },
    ],
    '3': [
      { id: '5', sender_id: '3', receiver_id: '1', content: 'Thanks for the help!', image_url: null, sent_at: '2024-07-09T14:30:00Z', is_read: true },
    ],
    '4': [
      { id: '6', sender_id: '4', receiver_id: '1', content: 'Can we schedule a session?', image_url: null, sent_at: '2024-07-08T10:15:00Z', is_read: false },
    ]
  };

  useEffect(() => {
    setChatUsers(DUMMY_CHAT_USERS);
    setPendingRequests(DUMMY_PENDING_REQUESTS);
    setSelectedUser(DUMMY_CHAT_USERS[0]);
    setMessages(DUMMY_MESSAGES['2'] || []);
    setLoading(false);
  }, []);

  // Simulate notification for new message
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender_id !== user?.id) {
      toast.success('New message received!');
    }
  }, [messages, user]);

  // Accept/Reject handlers for pending requests
  const handleAcceptRequest = (chatUser: ChatUser) => {
    setChatUsers(prev => [...prev, chatUser]);
    setPendingRequests(prev => prev.filter(u => u.id !== chatUser.id));
    toast.success(`Accepted chat request from ${chatUser.fullname}`);
    
    // Add initial message for new chat
    const initialMessage: Message = {
      id: Date.now().toString(),
      sender_id: chatUser.id,
      receiver_id: user?.id || '1',
      content: `Hi! Thanks for accepting my request. I'm excited to learn from you!`,
      image_url: null,
      sent_at: new Date().toISOString(),
      is_read: false
    };
    
    setMessages([initialMessage]);
  };

  const handleRejectRequest = (chatUser: ChatUser) => {
    setPendingRequests(prev => prev.filter(u => u.id !== chatUser.id));
    toast('Rejected chat request', { icon: '❌' });
  };

  const fetchMessages = async (otherUserId: string) => {
    try {
      const userMessages = DUMMY_MESSAGES[otherUserId] || [];
      setMessages(userMessages);
      
      // Mark messages as read
      setMessages(prev => prev.map(msg => 
        msg.sender_id === otherUserId ? { ...msg, is_read: true } : msg
      ));

      // Update unread count
      setChatUsers(prev => prev.map(chatUser => 
        chatUser.id === otherUserId 
          ? { ...chatUser, unreadCount: 0 }
          : chatUser
      ));
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    }
  };

  const handleUserSelect = (chatUser: ChatUser) => {
    setSelectedUser(chatUser);
    fetchMessages(chatUser.id);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser || !user) return;

    setSending(true);
    try {
      const newMsg: Message = {
        id: Date.now().toString(),
        sender_id: user.id,
        receiver_id: selectedUser.id,
        content: newMessage.trim(),
        image_url: null,
        sent_at: new Date().toISOString(),
        is_read: false
      };

      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
      
      // Update last message in chat users
      setChatUsers(prev => prev.map(chatUser => 
        chatUser.id === selectedUser.id 
          ? { 
              ...chatUser, 
              lastMessage: newMessage.trim(),
              lastMessageTime: new Date().toISOString()
            }
          : chatUser
      ));

      // Simulate reply after 2 seconds
      setTimeout(() => {
        const replyMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender_id: selectedUser.id,
          receiver_id: user.id,
          content: getRandomReply(),
          image_url: null,
          sent_at: new Date().toISOString(),
          is_read: false
        };
        setMessages(prev => [...prev, replyMsg]);
        
        // Update unread count
        setChatUsers(prev => prev.map(chatUser => 
          chatUser.id === selectedUser.id 
            ? { ...chatUser, unreadCount: chatUser.unreadCount + 1 }
            : chatUser
        ));
      }, 2000);

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const getRandomReply = () => {
    const replies = [
      "That sounds great!",
      "Thanks for sharing!",
      "I'd love to learn more about that.",
      "Perfect timing!",
      "That's really helpful.",
      "Looking forward to our session!",
      "Thanks for the quick response!",
      "That works for me!",
      "I'm excited to learn from you!",
      "Great idea!"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading chats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-[700px] flex">
          
          {/* Chat List */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Pending Requests */}
            {pendingRequests.length > 0 && (
              <div className="border-b border-gray-200 bg-orange-50 p-4">
                <h2 className="text-sm font-semibold text-orange-600 mb-2">Pending Requests</h2>
                {pendingRequests.map((req) => (
                  <div key={req.id} className="flex items-center space-x-3 mb-3">
                    <img
                      src={req.avatar}
                      alt={req.fullname}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">{req.fullname}</h3>
                      <p className="text-xs text-gray-500 truncate">{req.lastMessage}</p>
                    </div>
                    <button
                      onClick={() => handleAcceptRequest(req)}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs mr-1"
                    >Accept</button>
                    <button
                      onClick={() => handleRejectRequest(req)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                    >Reject</button>
                  </div>
                ))}
              </div>
            )}

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {chatUsers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No matches yet</p>
                  <p className="text-sm">Start swiping to find chat partners!</p>
                </div>
              ) : (
                chatUsers.map((chatUser) => (
                  <motion.div
                    key={chatUser.id}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                    onClick={() => handleUserSelect(chatUser)}
                    className={`p-4 cursor-pointer border-b border-gray-100 ${
                      selectedUser?.id === chatUser.id ? 'bg-orange-50 border-orange-200' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={chatUser.avatar}
                          alt={chatUser.fullname}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {chatUser.unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                            {chatUser.unreadCount}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {chatUser.fullname}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {format(new Date(chatUser.lastMessageTime), 'HH:mm')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{chatUser.lastMessage}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedUser.avatar}
                      alt={selectedUser.fullname}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{selectedUser.fullname}</h2>
                      <p className="text-sm text-gray-500">Matched</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                      <Calendar className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender_id === user?.id
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender_id === user?.id ? 'text-orange-100' : 'text-gray-500'
                        }`}>
                          {format(new Date(message.sent_at), 'HH:mm')}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                      <Image className="w-5 h-5" />
                    </motion.button>
                    <div className="flex-1">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        rows={1}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || sending}
                      className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}