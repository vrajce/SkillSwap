import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Users, MessageCircle, Calendar, Star, Check, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Match {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    skills: string[];
  };
  matchedAt: string;
  status: string;
}

interface PendingRequest {
  id: string;
  fromUser: {
    id: string;
    name: string;
    avatar: string;
    skills: string[];
  };
  swipeType: string;
  createdAt: string;
}

export default function Dashboard() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMatches: 0,
    pendingRequests: 0,
    activeChats: 0,
    sessions: 0
  });
  const { user } = useAuth();

  const DUMMY_MATCHES: Match[] = [
    { id: '1', user: { id: '2', name: 'Alice Kim', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', skills: ['UI/UX Design', 'Photography'] }, matchedAt: '2024-07-10', status: 'matched' },
    { id: '2', user: { id: '3', name: 'Ben Singh', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', skills: ['Python', 'Node.js'] }, matchedAt: '2024-07-09', status: 'matched' },
  ];
  const DUMMY_PENDING: PendingRequest[] = [
    { id: '3', fromUser: { id: '4', name: 'Carla Lopez', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', skills: ['Spanish', 'French'] }, swipeType: 'super', createdAt: '2024-07-08' },
    { id: '4', fromUser: { id: '5', name: 'David Brown', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', skills: ['Guitar', 'Music'] }, swipeType: 'normal', createdAt: '2024-07-07' },
  ];

  useEffect(() => {
    setMatches(DUMMY_MATCHES);
    setPendingRequests(DUMMY_PENDING);
    updateStats();
    setLoading(false);
  }, []);

  const updateStats = () => {
    setStats({
      totalMatches: matches.length,
      pendingRequests: pendingRequests.length,
      activeChats: matches.length, // Assuming all matches have active chats
      sessions: 2 // Dummy session count
    });
  };

  // Update stats when data changes
  useEffect(() => {
    updateStats();
  }, [matches, pendingRequests]);

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const request = pendingRequests.find(r => r.id === requestId);
      if (request) {
        // Move from pending to matches
        setPendingRequests(prev => prev.filter(r => r.id !== requestId));
        const newMatch: Match = {
          id: requestId,
          user: request.fromUser,
          matchedAt: new Date().toISOString(),
          status: 'matched'
        };
        setMatches(prev => [...prev, newMatch]);
        
        toast.success('Request accepted! 🎉');
        
        // Update stats
        updateStats();
      }
    } catch (error) {
      console.error('Error accepting request:', error);
      toast.error('Failed to accept request');
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      setPendingRequests(prev => prev.filter(r => r.id !== requestId));
      toast.success('Request rejected');
      
      // Update stats
      updateStats();
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast.error('Failed to reject request');
    }
  };

  // Simulate new pending request (for demo purposes)
  const addNewPendingRequest = () => {
    const newRequest: PendingRequest = {
      id: Date.now().toString(),
      fromUser: {
        id: '6',
        name: 'Emma Zhang',
        avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
        skills: ['Data Science', 'Yoga']
      },
      swipeType: 'super',
      createdAt: new Date().toISOString()
    };
    setPendingRequests(prev => [newRequest, ...prev]);
    toast.success('New pending request received!');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-xl text-gray-600">Manage your matches and skill swap requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Matches</p>
                <p className="text-3xl font-bold text-orange-600">{stats.totalMatches}</p>
              </div>
              <Heart className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                <p className="text-3xl font-bold text-blue-600">{stats.pendingRequests}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Chats</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeChats}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sessions</p>
                <p className="text-3xl font-bold text-purple-600">{stats.sessions}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Demo Button for Testing */}
        <div className="mb-8 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addNewPendingRequest}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Simulate New Request (Demo)
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Requests */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-blue-600" />
              Pending Requests ({pendingRequests.length})
            </h2>
            
            {pendingRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No pending requests</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <img
                        src={request.fromUser.avatar}
                        alt={request.fromUser.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{request.fromUser.name}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {request.fromUser.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.swipeType === 'super' 
                          ? 'bg-orange-100 text-orange-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {request.swipeType === 'super' ? 'Super Swipe' : 'Regular'}
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAcceptRequest(request.id)}
                        className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Accept</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRejectRequest(request.id)}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Reject</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Current Matches */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-orange-600" />
              Your Matches ({matches.length})
            </h2>
            
            {matches.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Heart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No matches yet</p>
                <p className="text-sm">Start swiping to find your skill partners!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {matches.map((match) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <img
                        src={match.user.avatar}
                        alt={match.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{match.user.name}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {match.user.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">Match</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Schedule</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}