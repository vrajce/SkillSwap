import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Menu, X, Bell, User, LogOut, Settings, Heart, 
  MessageCircle, Calendar, Trophy, Shield 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationsContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const publicNavItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
    { path: '/leaderboard', label: 'Leaderboard' }
  ];

  const privateNavItems = [
    { path: '/discover', label: 'Discover', icon: Heart },
    { path: '/dashboard', label: 'Dashboard', icon: Trophy },
    { path: '/chat', label: 'Chat', icon: MessageCircle },
    { path: '/schedule', label: 'Schedule', icon: Calendar },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
              SwapIT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {user ? (
              // Authenticated navigation
              privateNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-orange-100 text-orange-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })
            ) : (
              // Public navigation
              publicNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-orange-100 text-orange-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="relative p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </motion.button>

                  {/* Notifications Dropdown */}
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-sm text-orange-600 hover:text-orange-700"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-gray-500">
                            No notifications yet
                          </div>
                        ) : (
                          notifications.slice(0, 5).map((notification) => (
                            <div
                              key={notification.id}
                              onClick={() => markAsRead(notification.id)}
                              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                                !notification.read ? 'bg-orange-50' : ''
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`w-2 h-2 rounded-full mt-2 ${
                                  !notification.read ? 'bg-orange-500' : 'bg-gray-300'
                                }`} />
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900">{notification.title}</h4>
                                  <p className="text-sm text-gray-600">{notification.message}</p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {new Date(notification.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={user.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="hidden sm:block text-gray-700">{user.name}</span>
                  </motion.button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to="/admin"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Shield className="w-4 h-4" />
                          <span>Admin</span>
                        </Link>
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            handleLogout();
                          }}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Not authenticated
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Login
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <nav className="space-y-2">
              {user ? (
                privateNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-orange-100 text-orange-600'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })
              ) : (
                publicNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-orange-100 text-orange-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))
              )}
              
              {!user && (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(isProfileOpen || isNotificationsOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileOpen(false);
            setIsNotificationsOpen(false);
          }}
        />
      )}
    </header>
  );
}