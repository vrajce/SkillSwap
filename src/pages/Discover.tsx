import React, { useState, useRef, useEffect } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { Heart, X, Star, Clock, MapPin, Flame, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  canTeach: string[];
  wantToLearn: string[];
  bio: string;
  rating: number;
  availability: string;
  badges: string[];
  avatar: string;
}

const DUMMY_PROFILES: Profile[] = [
  { 
    id: '1', 
    name: 'Alice Kim', 
    age: 28, 
    location: 'Los Angeles, CA', 
    canTeach: ['UI/UX Design', 'Photography'], 
    wantToLearn: ['React', 'Digital Marketing'], 
    bio: 'UI/UX designer and creative thinker. Love helping others learn design tools.', 
    rating: 4.8, 
    availability: 'Flexible', 
    badges: ['Active User'],
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  { 
    id: '2', 
    name: 'Ben Singh', 
    age: 32, 
    location: 'Chicago, IL', 
    canTeach: ['Python', 'Node.js'], 
    wantToLearn: ['UI/UX Design', 'Photography'], 
    bio: 'Full-stack developer and Python enthusiast. Happy to teach coding and automation.', 
    rating: 4.7, 
    availability: 'Evenings', 
    badges: ['Mentor'],
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  { 
    id: '3', 
    name: 'Carla Lopez', 
    age: 29, 
    location: 'Miami, FL', 
    canTeach: ['Spanish', 'French'], 
    wantToLearn: ['English', 'Writing'], 
    bio: 'Spanish teacher and language lover. Can help with Spanish and French.', 
    rating: 4.9, 
    availability: 'Weekends', 
    badges: ['Language Pro'],
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
  { 
    id: '4', 
    name: 'David Brown', 
    age: 35, 
    location: 'Seattle, WA', 
    canTeach: ['Guitar'], 
    wantToLearn: ['Python', 'React'], 
    bio: 'Guitarist and music producer. I teach guitar and music theory.', 
    rating: 4.6, 
    availability: 'Afternoons', 
    badges: ['Musician'],
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
  },
  { 
    id: '5', 
    name: 'Emma Zhang', 
    age: 27, 
    location: 'Boston, MA', 
    canTeach: ['Data Science', 'Yoga'], 
    wantToLearn: ['Guitar', 'Cooking'], 
    bio: 'Data scientist and yoga enthusiast. Can teach data analysis and yoga basics.', 
    rating: 4.8, 
    availability: 'Mornings', 
    badges: ['Wellness'],
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg'
  },
  { 
    id: '6', 
    name: 'Faisal Ahmed', 
    age: 31, 
    location: 'Houston, TX', 
    canTeach: ['Digital Marketing'], 
    wantToLearn: ['UI/UX Design', 'Writing'], 
    bio: 'Digital marketer and public speaker. Happy to share marketing tips.', 
    rating: 4.5, 
    availability: 'Flexible', 
    badges: ['Marketer'],
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg'
  },
  { 
    id: '7', 
    name: 'Grace Miller', 
    age: 30, 
    location: 'Denver, CO', 
    canTeach: ['Writing'], 
    wantToLearn: ['Photography', 'Yoga'], 
    bio: 'Writer and creative coach. Can help with writing and creativity.', 
    rating: 4.7, 
    availability: 'Evenings', 
    badges: ['Writer'],
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg'
  },
  { 
    id: '8', 
    name: 'Hiro Tanaka', 
    age: 26, 
    location: 'San Jose, CA', 
    canTeach: ['React'], 
    wantToLearn: ['English', 'Python'], 
    bio: 'React developer and language learner. Can teach React and Japanese basics.', 
    rating: 4.6, 
    availability: 'Weekends', 
    badges: ['Developer'],
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg'
  },
  { 
    id: '9', 
    name: 'Isabella Rossi', 
    age: 33, 
    location: 'New York, NY', 
    canTeach: ['Photography', 'Italian'], 
    wantToLearn: ['English', 'Writing'], 
    bio: 'Photographer and Italian speaker. Can teach photography and Italian.', 
    rating: 4.9, 
    availability: 'Flexible', 
    badges: ['Photographer'],
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg'
  },
  { 
    id: '10', 
    name: 'Test User', 
    age: 25, 
    location: 'Remote', 
    canTeach: ['JavaScript', 'Python'], 
    wantToLearn: ['UI/UX Design', 'Spanish'], 
    bio: 'This is a test user for demo purposes. Loves learning and sharing skills!', 
    rating: 4.8, 
    availability: 'Anytime', 
    badges: ['Tester'],
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg'
  },
];


export default function Discover() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dailySwipes, setDailySwipes] = useState(15);
  const [loading, setLoading] = useState(true);
  const [userSkills, setUserSkills] = useState({ canTeach: ['JavaScript', 'Python'], wantToLearn: ['UI/UX Design', 'Spanish'] });
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const { user } = useAuth();

  const currentProfile = profiles[currentIndex];

  // Check for super match based on skill compatibility
  const checkSuperMatch = (profile: Profile) => {
    const userCanTeach = userSkills.canTeach;
    const userWantToLearn = userSkills.wantToLearn;
    const profileCanTeach = profile.canTeach;
    const profileWantToLearn = profile.wantToLearn;

    // Check if user can teach what profile wants to learn
    const userCanHelp = userCanTeach.some(skill => profileWantToLearn.includes(skill));
    
    // Check if profile can teach what user wants to learn
    const profileCanHelp = profileCanTeach.some(skill => userWantToLearn.includes(skill));

    return userCanHelp && profileCanHelp;
  };

  const isSuperMatch = currentProfile ? checkSuperMatch(currentProfile) : false;

  // Fetch potential matches
  useEffect(() => {
    setProfiles(DUMMY_PROFILES);
    setLoading(false);
  }, []);
  const triggerMatch = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    toast.success(`🎉 It's a match with ${currentProfile.name}!`, {
      duration: 5000,
      style: {
        background: '#10B981',
        color: 'white',
      },
    });
  };

  const handleSwipe = async (direction: 'left' | 'right' | 'up' | 'down') => {
    if (isAnimating || currentIndex >= profiles.length) return;

    setIsAnimating(true);
    setDailySwipes(prev => Math.max(0, prev - 1));

    const exitX = direction === 'left' ? -1000 : direction === 'right' ? 1000 : 0;
    const exitY = direction === 'up' ? -1000 : direction === 'down' ? 1000 : 0;

    await controls.start({
      x: exitX,
      y: exitY,
      rotate: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
      opacity: 0,
      transition: { duration: 0.3 }
    });

    // Handle swipe actions (frontend only)
    if (direction === 'right' || direction === 'up') {
      // Higher chance of match for super matches
      const matchChance = isSuperMatch ? 0.8 : 0.3;
      if (Math.random() > (1 - matchChance)) {
        triggerMatch();
      }
    }

    // Show appropriate toast messages
    switch (direction) {
      case 'left':
        toast('Not interested', { icon: '❌' });
        break;
      case 'right':
        if (isSuperMatch) {
          toast('Super Match! 🎯', { icon: '🎯' });
        } else {
          toast('Interested!', { icon: '❤️' });
        }
        break;
      case 'up':
        toast('Super Swipe!', { icon: '🔥' });
        break;
      case 'down':
        toast('Saved for later', { icon: '🕓' });
        break;
    }

    setCurrentIndex(prev => prev + 1);
    
    // Reset card position
    controls.set({ x: 0, y: 0, rotate: 0, opacity: 1 });
    setIsAnimating(false);
  };

  const handlePanEnd = (event: any, info: PanInfo) => {
    const threshold = 150;
    const velocity = 0.3;

    if (Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > velocity * 1000) {
      if (info.offset.x > 0) {
        handleSwipe('right');
      } else {
        handleSwipe('left');
      }
    } else if (Math.abs(info.offset.y) > threshold || Math.abs(info.velocity.y) > velocity * 1000) {
      if (info.offset.y < 0) {
        handleSwipe('up');
      } else {
        handleSwipe('down');
      }
    } else {
      // Snap back to center
      controls.start({ x: 0, y: 0, rotate: 0 });
    }
  };

  const resetStack = () => {
    setCurrentIndex(0);
    controls.set({ x: 0, y: 0, rotate: 0, opacity: 1 });
    toast.success('New profiles loaded!');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading profiles...</p>
        </div>
      </div>
    );
  }

  if (currentIndex >= profiles.length) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No More Profiles!</h2>
          <p className="text-xl text-gray-600 mb-8">Come back later for fresh matches or try adjusting your preferences.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetStack}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Load More Profiles</span>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover</h1>
          <p className="text-gray-600">
            {dailySwipes} swipes remaining today
          </p>
        </div>

        {/* Card Stack */}
        <div className="relative h-[600px] mb-8">
          {/* Background cards */}
          {profiles.slice(currentIndex + 1, currentIndex + 3).map((profile, index) => (
            <motion.div
              key={profile.id}
              className={`absolute inset-0 bg-white rounded-2xl shadow-lg border border-gray-200 ${
                index === 0 ? 'scale-95 opacity-50' : 'scale-90 opacity-25'
              }`}
              style={{
                zIndex: profiles.length - index,
                transform: `translateY(${index * 4}px) scale(${1 - index * 0.05})`
              }}
            />
          ))}

          {/* Current card */}
          <motion.div
            ref={cardRef}
            animate={controls}
            drag={!isAnimating}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onPanEnd={handlePanEnd}
            whileDrag={{ scale: 1.05 }}
            className="absolute inset-0 bg-white rounded-2xl shadow-xl border border-gray-200 cursor-grab active:cursor-grabbing overflow-hidden"
            style={{ zIndex: profiles.length }}
          >
            {/* Profile Image */}
            <div className="relative h-2/3">
              <img
                src={currentProfile.avatar}
                alt={currentProfile.name}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Super Match Badge */}
              {isSuperMatch && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  🎯 Super Match!
                </div>
              )}
              
              {/* Badges */}
              <div className={`absolute top-4 ${isSuperMatch ? 'left-32' : 'left-4'} flex flex-wrap gap-2`}>
                {currentProfile.badges.map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Rating */}
              <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-700">{currentProfile.rating}</span>
              </div>

              {/* Basic info overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-2xl font-bold mb-1">
                  {currentProfile.name}, {currentProfile.age}
                </h2>
                <div className="flex items-center space-x-1 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{currentProfile.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{currentProfile.availability}</span>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="h-1/3 p-6 overflow-y-auto">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Can teach:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.canTeach.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 text-sm rounded-full ${
                        userSkills.wantToLearn.includes(skill)
                          ? 'bg-green-100 text-green-700 border-2 border-green-300'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {skill}
                      {userSkills.wantToLearn.includes(skill) && ' ✓'}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Wants to learn:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.wantToLearn.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 text-sm rounded-full ${
                        userSkills.canTeach.includes(skill)
                          ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {skill}
                      {userSkills.canTeach.includes(skill) && ' ✓'}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">About:</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{currentProfile.bio}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('left')}
            className="w-14 h-14 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shadow-lg hover:border-red-300 hover:bg-red-50 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('down')}
            className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shadow-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors"
          >
            <RotateCcw className="w-5 h-5 text-gray-600" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('up')}
            className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg hover:from-orange-600 hover:to-red-600 transition-colors"
          >
            <Flame className="w-5 h-5 text-white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('right')}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors ${
              isSuperMatch 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
            }`}
          >
            {isSuperMatch ? (
              <span className="text-white text-xl">🎯</span>
            ) : (
              <Heart className="w-6 h-6 text-white" />
            )}
          </motion.button>
        </div>

        {/* Swipe Instructions */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Swipe left to pass • Swipe right to like • Swipe up for super like
          {isSuperMatch && (
            <div className="mt-2 text-purple-600 font-semibold">
              🎯 Perfect skill match!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}