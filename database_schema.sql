-- USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  location VARCHAR(100),
  description TEXT,
  profile_pic VARCHAR(255),
  public_profile BOOLEAN DEFAULT TRUE,
  trust_percentage DECIMAL(5,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- SKILLS
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  category VARCHAR(100)
);

-- BADGES
CREATE TABLE badges (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(255)
);

-- USER_SKILL_OFFER
CREATE TABLE user_skill_offer (
  user_id INT REFERENCES users(id),
  skill_id INT REFERENCES skills(id),
  PRIMARY KEY (user_id, skill_id)
);

-- USER_SKILL_WANT
CREATE TABLE user_skill_want (
  user_id INT REFERENCES users(id),
  skill_id INT REFERENCES skills(id),
  PRIMARY KEY (user_id, skill_id)
);

-- USER_BADGE
CREATE TABLE user_badge (
  user_id INT REFERENCES users(id),
  badge_id INT REFERENCES badges(id),
  awarded_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

-- SWAP_REQUESTS
CREATE TABLE swap_requests (
  id SERIAL PRIMARY KEY,
  from_user_id INT REFERENCES users(id),
  to_user_id INT REFERENCES users(id),
  skill_offered_id INT REFERENCES skills(id),
  skill_requested_id INT REFERENCES skills(id),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- SWAP_SESSIONS
CREATE TABLE swap_sessions (
  id SERIAL PRIMARY KEY,
  swap_request_id INT REFERENCES swap_requests(id),
  scheduled_time TIMESTAMP,
  duration INT,
  status VARCHAR(20) DEFAULT 'scheduled',
  feedback_given BOOLEAN DEFAULT FALSE,
  meet_link VARCHAR(255)
);

-- FEEDBACK
CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  from_user_id INT REFERENCES users(id),
  to_user_id INT REFERENCES users(id),
  swap_session_id INT REFERENCES swap_sessions(id),
  rating INT,
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- NOTIFICATIONS
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- MESSAGES
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INT REFERENCES users(id),
  receiver_id INT REFERENCES users(id),
  content TEXT,
  image_url VARCHAR(255),
  sent_at TIMESTAMP DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE
);
