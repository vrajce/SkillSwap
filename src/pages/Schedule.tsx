import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Video, MapPin, Star, Check, X, Plus } from 'lucide-react';
import { format, addDays, startOfDay, addHours } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Session {
  id: string;
  swap_request_id: string;
  scheduled_time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  feedback_given: boolean;
  meet_link: string | null;
  created_at: string;
  swap_request: {
    from_user: {
      id: string;
      fullname: string;
      profile_pic: string | null;
    };
    to_user: {
      id: string;
      fullname: string;
      profile_pic: string | null;
    };
  };
}

interface Match {
  id: string;
  user: {
    id: string;
    fullname: string;
    skills: string[];
  };
  matchedAt: string;
}

export default function Schedule() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scheduling, setScheduling] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 1));
  const [selectedTime, setSelectedTime] = useState<string>('10:00');
  const [duration, setDuration] = useState<number>(60);
  const { user } = useAuth();

  const DUMMY_SESSIONS: Session[] = [
    { id: '1', swap_request_id: '1', scheduled_time: '2024-07-12T15:00:00Z', duration: 60, status: 'scheduled', feedback_given: false, meet_link: 'https://meet.jit.si/swapit-demo-1', created_at: '2024-07-10T12:00:00Z', swap_request: { from_user: { id: '1', fullname: 'Test User', profile_pic: null }, to_user: { id: '2', fullname: 'Alice Kim', profile_pic: null } } },
    { id: '2', swap_request_id: '2', scheduled_time: '2024-07-09T10:00:00Z', duration: 90, status: 'completed', feedback_given: true, meet_link: 'https://meet.jit.si/swapit-demo-2', created_at: '2024-07-08T09:00:00Z', swap_request: { from_user: { id: '3', fullname: 'Ben Singh', profile_pic: null }, to_user: { id: '1', fullname: 'Test User', profile_pic: null } } },
  ];
  const DUMMY_MATCHES: Match[] = [
    { id: '1', user: { id: '2', fullname: 'Alice Kim', skills: ['UI/UX Design', 'Photography'] }, matchedAt: '2024-07-10' },
    { id: '2', user: { id: '3', fullname: 'Ben Singh', skills: ['Python', 'Node.js'] }, matchedAt: '2024-07-09' },
  ];

  useEffect(() => {
    setSessions(DUMMY_SESSIONS);
    setMatches(DUMMY_MATCHES);
    setLoading(false);
  }, []);

  // Remove all Supabase fetch functions - using dummy data only

  const handleScheduleSession = async () => {
    if (!selectedMatch || !user) return;

    setScheduling(true);
    try {
      const scheduledDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      scheduledDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      // Generate meet link (using Jitsi for demo)
      const meetLink = `https://meet.jit.si/swapit-${Date.now()}`;

      // Simulate session creation for demo
      const newSession: Session = {
        id: Date.now().toString(),
        swap_request_id: selectedMatch.id,
        scheduled_time: scheduledDateTime.toISOString(),
        duration: duration,
        status: 'scheduled',
        feedback_given: false,
        meet_link: meetLink,
        created_at: new Date().toISOString(),
        swap_request: {
          from_user: { id: user.id, fullname: 'Test User', profile_pic: null },
          to_user: { id: selectedMatch.user.id, fullname: selectedMatch.user.fullname, profile_pic: null }
        }
      };

      setSessions(prev => [...prev, newSession]);
      toast.success('Session scheduled successfully!');
      setShowScheduleModal(false);
      setSelectedMatch(null);
    } catch (error) {
      console.error('Error scheduling session:', error);
      toast.error('Failed to schedule session');
    } finally {
      setScheduling(false);
    }
  };

  const handleCancelSession = async (sessionId: string) => {
    try {
      setSessions(prev => prev.map(s => 
        s.id === sessionId ? { ...s, status: 'cancelled' as const } : s
      ));
      toast.success('Session cancelled');
    } catch (error) {
      console.error('Error cancelling session:', error);
      toast.error('Failed to cancel session');
    }
  };

  const handleCompleteSession = async (sessionId: string) => {
    try {
      setSessions(prev => prev.map(s => 
        s.id === sessionId ? { ...s, status: 'completed' as const } : s
      ));
      toast.success('Session marked as completed');
    } catch (error) {
      console.error('Error completing session:', error);
      toast.error('Failed to complete session');
    }
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Schedule Sessions</h1>
          <p className="text-xl text-gray-600">Plan your skill swap sessions with your matches</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-3xl font-bold text-orange-600">{sessions.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-3xl font-bold text-blue-600">
                  {sessions.filter(s => s.status === 'scheduled' && new Date(s.scheduled_time) > new Date()).length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600">
                  {sessions.filter(s => s.status === 'completed').length}
                </p>
              </div>
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Matches</p>
                <p className="text-3xl font-bold text-purple-600">{matches.length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Matches */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Users className="w-6 h-6 mr-2 text-purple-600" />
                Available Matches
              </h2>
            </div>
            
            {matches.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No matches available</p>
                <p className="text-sm">Start swiping to find skill partners!</p>
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
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{match.user.fullname}</h3>
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
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedMatch(match);
                        setShowScheduleModal(true);
                      }}
                      className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Schedule Session</span>
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Scheduled Sessions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-orange-600" />
              Your Sessions
            </h2>
            
            {sessions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No sessions scheduled</p>
                <p className="text-sm">Schedule your first skill swap session!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sessions.map((session) => {
                  const otherUser = session.swap_request.from_user.id === user?.id 
                    ? session.swap_request.to_user 
                    : session.swap_request.from_user;
                  
                  return (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all"
                    >
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{otherUser.fullname}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{format(new Date(session.scheduled_time), 'MMM dd, yyyy')}</span>
                            <Clock className="w-4 h-4" />
                            <span>{format(new Date(session.scheduled_time), 'HH:mm')}</span>
                            <span>• {session.duration} min</span>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          session.status === 'scheduled' 
                            ? 'bg-blue-100 text-blue-700'
                            : session.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        {session.status === 'scheduled' && (
                          <>
                            {session.meet_link && (
                              <motion.a
                                href={session.meet_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                              >
                                <Video className="w-4 h-4" />
                                <span>Join Call</span>
                              </motion.a>
                            )}
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleCompleteSession(session.id)}
                              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                            >
                              <Check className="w-4 h-4" />
                              <span>Complete</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleCancelSession(session.id)}
                              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                            >
                              <X className="w-4 h-4" />
                              <span>Cancel</span>
                            </motion.button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Schedule Modal */}
        {showScheduleModal && selectedMatch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Schedule Session</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={format(selectedDate, 'yyyy-MM-dd')}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1.5 hours</option>
                    <option value={120}>2 hours</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowScheduleModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleScheduleSession}
                    disabled={scheduling}
                    className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                  >
                    {scheduling ? 'Scheduling...' : 'Schedule'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}