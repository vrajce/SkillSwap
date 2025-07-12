-- Migration: Ensure all user and skill IDs and foreign keys are uuid

-- USERS TABLE
ALTER TABLE users ALTER COLUMN id TYPE uuid USING id::uuid;

-- SKILLS TABLE
ALTER TABLE skills ALTER COLUMN id TYPE uuid USING id::uuid;

-- USER_SKILL_OFFER TABLE
ALTER TABLE user_skill_offer ALTER COLUMN id TYPE uuid USING id::uuid;
ALTER TABLE user_skill_offer ALTER COLUMN user_id TYPE uuid USING user_id::uuid;
ALTER TABLE user_skill_offer ALTER COLUMN skill_id TYPE uuid USING skill_id::uuid;

-- USER_SKILL_WANT TABLE
ALTER TABLE user_skill_want ALTER COLUMN id TYPE uuid USING id::uuid;
ALTER TABLE user_skill_want ALTER COLUMN user_id TYPE uuid USING user_id::uuid;
ALTER TABLE user_skill_want ALTER COLUMN skill_id TYPE uuid USING skill_id::uuid;

-- SWAP_REQUESTS TABLE
ALTER TABLE swap_requests ALTER COLUMN id TYPE uuid USING id::uuid;
ALTER TABLE swap_requests ALTER COLUMN from_user_id TYPE uuid USING from_user_id::uuid;
ALTER TABLE swap_requests ALTER COLUMN to_user_id TYPE uuid USING to_user_id::uuid;

-- SWAP_SESSIONS TABLE
ALTER TABLE swap_sessions ALTER COLUMN id TYPE uuid USING id::uuid;
ALTER TABLE swap_sessions ALTER COLUMN swap_request_id TYPE uuid USING swap_request_id::uuid;

-- NOTIFICATIONS TABLE
ALTER TABLE notifications ALTER COLUMN id TYPE uuid USING id::uuid;
ALTER TABLE notifications ALTER COLUMN user_id TYPE uuid USING user_id::uuid;

-- BADGES TABLE
ALTER TABLE badges ALTER COLUMN id TYPE uuid USING id::uuid;

-- USER_BADGE TABLE
ALTER TABLE user_badge ALTER COLUMN id TYPE uuid USING id::uuid;
ALTER TABLE user_badge ALTER COLUMN user_id TYPE uuid USING user_id::uuid;
ALTER TABLE user_badge ALTER COLUMN badge_id TYPE uuid USING badge_id::uuid;

-- MESSAGES TABLE (if exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'messages' AND column_name = 'id') THEN
    ALTER TABLE messages ALTER COLUMN id TYPE uuid USING id::uuid;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'messages' AND column_name = 'sender_id') THEN
    ALTER TABLE messages ALTER COLUMN sender_id TYPE uuid USING sender_id::uuid;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'messages' AND column_name = 'receiver_id') THEN
    ALTER TABLE messages ALTER COLUMN receiver_id TYPE uuid USING receiver_id::uuid;
  END IF;
END $$;

-- Recreate foreign key constraints if needed (optional, only if you get errors)
-- You may need to drop and re-add constraints if types were previously mismatched. 