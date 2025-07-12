import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Trophy, Target, Zap, Users, Heart, BookOpen } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export default function BadgeSystem() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [filter, setFilter] = useState<'all' | 'earned' | 'available'>('all');

  // Mock badges data
  const mockBadges: Badge[] = [
    {
      id: '1',
      name: 'First Match',
      description: 'Got your first skill swap match',
      icon: '🎯',
      earned: true,
      earnedAt: '2024-07-10T12:00:00Z',
      rarity: 'common'
    },
    {
      id: '2',
      name: 'Social Butterfly',
      description: 'Matched with 10 different users',
      icon: '🦋',
      earned: false,
      progress: 3,
      maxProgress: 10,
      rarity: 'rare'
    },
    {
      id: '3',
      name: 'Teaching Master',
      description: 'Completed 5 teaching sessions',
      icon: '👨‍🏫',
      earned: true,
      earnedAt: '2024-07-08T15:30:00Z',
      rarity: 'epic'
    },
    {
      id: '4',
      name: 'Quick Learner',
      description: 'Completed 5 learning sessions',
      icon: '⚡',
      earned: false,
      progress: 2,
      maxProgress: 5,
      rarity: 'common'
    },
    {
      id: '5',
      name: 'Streak Champion',
      description: 'Maintained a 7-day activity streak',
      icon: '🔥',
      earned: false,
      progress: 4,
      maxProgress: 7,
      rarity: 'epic'
    },
    {
      id: '6',
      name: 'Skill Collector',
      description: 'Added 10 skills to your profile',
      icon: '🎓',
      earned: true,
      earnedAt: '2024-07-05T09:15:00Z',
      rarity: 'rare'
    },
    {
      id: '7',
      name: 'Super Swiper',
      description: 'Used 10 super swipes',
      icon: '💫',
      earned: false,
      progress: 6,
      maxProgress: 10,
      rarity: 'rare'
    },
    {
      id: '8',
      name: 'Community Helper',
      description: 'Received 50 positive ratings',
      icon: '🤝',
      earned: false,
      progress: 23,
      maxProgress: 50,
      rarity: 'legendary'
    }
  ];

  useEffect(() => {
    setBadges(mockBadges);
  }, []);

  const filteredBadges = badges.filter(badge => {
    if (filter === 'earned') return badge.earned;
    if (filter === 'available') return !badge.earned;
    return true;
  });

  const earnedCount = badges.filter(b => b.earned).length;
  const totalCount = badges.length;

  const getRarityColor = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'from-gray-400 to-gray-600';
      case 'rare':
        return 'from-blue-400 to-blue-600';
      case 'epic':
        return 'from-purple-400 to-purple-600';
      case 'legendary':
        return 'from-yellow-400 to-orange-500';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-300';
      case 'rare':
        return 'border-blue-300';
      case 'epic':
        return 'border-purple-300';
      case 'legendary':
        return 'border-yellow-300';
      default:
        return 'border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Award className="w-6 h-6 mr-2 text-orange-600" />
            Achievements
          </h2>
          <p className="text-gray-600 mt-1">
            {earnedCount} of {totalCount} badges earned
          </p>
        </div>

        {/* Progress Ring */}
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${(earnedCount / totalCount) * 175.93} 175.93`}
              className="text-orange-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-gray-900">
              {Math.round((earnedCount / totalCount) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { key: 'all', label: 'All Badges' },
          { key: 'earned', label: 'Earned' },
          { key: 'available', label: 'Available' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
              badge.earned
                ? `${getRarityBorder(badge.rarity)} bg-gradient-to-br ${getRarityColor(badge.rarity)} bg-opacity-10 hover:shadow-lg`
                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
            }`}
          >
            {/* Rarity Indicator */}
            <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
              badge.earned
                ? `bg-gradient-to-r ${getRarityColor(badge.rarity)} text-white`
                : 'bg-gray-200 text-gray-600'
            }`}>
              {badge.rarity}
            </div>

            {/* Badge Icon */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto ${
              badge.earned
                ? `bg-gradient-to-br ${getRarityColor(badge.rarity)} text-white shadow-lg`
                : 'bg-gray-200 text-gray-400'
            }`}>
              {badge.icon}
            </div>

            {/* Badge Info */}
            <div className="text-center">
              <h3 className={`font-bold mb-2 ${
                badge.earned ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {badge.name}
              </h3>
              <p className={`text-sm mb-4 ${
                badge.earned ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {badge.description}
              </p>

              {/* Progress Bar (for unearned badges) */}
              {!badge.earned && badge.progress !== undefined && badge.maxProgress && (
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    {badge.progress} / {badge.maxProgress}
                  </p>
                </div>
              )}

              {/* Earned Date */}
              {badge.earned && badge.earnedAt && (
                <p className="text-xs text-gray-500">
                  Earned {new Date(badge.earnedAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Earned Overlay */}
            {badge.earned && (
              <div className="absolute top-4 left-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white fill-current" />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{earnedCount}</div>
          <div className="text-sm text-gray-600">Badges Earned</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {badges.filter(b => b.rarity === 'rare' && b.earned).length}
          </div>
          <div className="text-sm text-gray-600">Rare Badges</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {badges.filter(b => b.rarity === 'epic' && b.earned).length}
          </div>
          <div className="text-sm text-gray-600">Epic Badges</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {badges.filter(b => b.rarity === 'legendary' && b.earned).length}
          </div>
          <div className="text-sm text-gray-600">Legendary</div>
        </div>
      </div>
    </div>
  );
}