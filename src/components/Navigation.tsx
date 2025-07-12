import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Star, MapPin, Calendar } from 'lucide-react';
import { Match, User, supabase } from '../lib/supabase';
import { ChatModal } from './ChatModal';
import toast from 'react-hot-toast';

interface MatchesListProps {
  currentUser: User | null;
}

export const MatchesList: React.FC<MatchesListProps> = ({ currentUser }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  useEffect(() => {
    if (currentUser) {
      loadMatches();
    }
  }, [currentUser]);

  const loadMatches = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          user1:users!matches_user1_id_fkey(*),
          user2:users!matches_user2_id_fkey(*),
          skill:skills(*)
        `)
        .or(`user1_id.eq.${currentUser.id},user2_id.eq.${currentUser.id}`)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMatches(data || []);
    } catch (error) {
      console.error('Error loading matches:', error);
      toast.error('Failed to load matches');
    } finally {
      setLoading(false);
    }
  };

  const getOtherUser = (match: Match): User => {
    return match.user1_id === currentUser?.id ? match.user2! : match.user1!;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return 'Today';
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">💜</div>
        <h3 className="text-2xl font-bold text-white mb-2">No matches yet</h3>
        <p className="text-purple-200">Start swiping to find your skill partners!</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {matches.map((match, index) => {
          const otherUser = getOtherUser(match);
          return (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedMatch(match)}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Profile Image */}
                  <img
                    src={otherUser.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${otherUser.name}`}
                    alt={otherUser.name}
                    className="w-16 h-16 rounded-xl border-2 border-white/30 object-cover"
                  />
                  
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white truncate">
                        {otherUser.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {otherUser.is_premium && (
                          <Star className="w-5 h-5 text-yellow-400" />
                        )}
                        <span className="text-purple-200 text-sm">
                          {formatDate(match.created_at)}
                        </span>
                      </div>
                    </div>

                    {/* Skill Match */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{match.skill?.icon}</span>
                      <span className="text-purple-100 font-medium">
                        {match.skill?.name}
                      </span>
                      <span className="text-purple-300 text-sm">
                        • {match.skill?.category}
                      </span>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-4 text-sm text-purple-200 mb-3">
                      {otherUser.age && (
                        <span>{otherUser.age} years old</span>
                      )}
                      {otherUser.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{otherUser.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Bio Preview */}
                    {otherUser.bio && (
                      <p className="text-purple-100 text-sm line-clamp-2 mb-3">
                        {otherUser.bio}
                      </p>
                    )}

                    {/* Action Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300 text-sm">
                        Click to start chatting
                      </span>
                      <div className="flex items-center gap-2 px-3 py-1 bg-purple-600/30 rounded-full group-hover:bg-purple-600/50 transition-colors duration-200">
                        <MessageCircle className="w-4 h-4 text-purple-200" />
                        <span className="text-purple-200 text-sm">Chat</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Chat Modal */}
      {selectedMatch && (
        <ChatModal
          match={selectedMatch}
          currentUser={currentUser!}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </>
  );
};
