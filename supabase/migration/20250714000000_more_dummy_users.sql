-- 9 More Dummy Users for SwapIT Demo
-- Each user has unique name, email, location, description, trust score, and skills

-- User 2: Alice Kim
INSERT INTO users (id, fullname, email, location, description, public_profile, trust_percentage, created_at) VALUES
('22222222-2222-2222-2222-222222222222', 'Alice Kim', 'alice.kim@example.com', 'Los Angeles, CA', 'UI/UX designer and creative thinker. Love helping others learn design tools.', true, 93, now() - interval '28 days');

-- User 3: Ben Singh
INSERT INTO users (id, fullname, email, location, description, public_profile, trust_percentage, created_at) VALUES
('33333333-3333-3333-3333-333333333333', 'Ben Singh', 'ben.singh@example.com', 'Chicago, IL', 'Full-stack developer and Python enthusiast. Happy to teach coding and automation.', true, 90, now() - interval '25 days');

-- User 4: Carla Lopez
INSERT INTO users (id, fullname, email, location, description, public_profile, trust_percentage, created_at) VALUES
('44444444-4444-4444-4444-444444444444', 'Carla Lopez', 'carla.lopez@example.com', 'Miami, FL', 'Spanish teacher and language lover. Can help with Spanish and French.', true, 97, now() - interval '22 days');

-- User 5: David Brown
INSERT INTO users (id, fullname, email, location, description, public_profile, trust_percentage, created_at) VALUES
('55555555-5555-5555-5555-555555555555', 'David Brown', 'david.brown@example.com', 'Seattle, WA', 'Guitarist and music producer. I teach guitar and music theory.', true, 89, now() - interval '20 days');

-- User 6: Emma Zhang
INSERT INTO users (id, fullname, email, location, description, public_profile, trust_percentage, created_at) VALUES
('66666666-6666-6666-6666-666666666666', 'Emma Zhang', 'emma.zhang@example.com', 'Boston, MA', 'Data scientist and yoga enthusiast. Can teach data analysis and yoga basics.', true, 91, now() - interval '18 days');

-- User 7: Faisal Ahmed
INSERT INTO users (id, fullname, email, location, description, public_profile, trust_percentage, created_at) VALUES
('77777777-7777-7777-7777-777777777777', 'Faisal Ahmed', 'faisal.ahmed@example.com', 'Houston, TX', 'Digital marketer and public speaker. Happy to share marketing tips.', true, 88, now() - interval '15 days');

-- User 8: Grace Miller
INSERT INTO users (id, fullname, email, location, description, public_profile, trust_percentage, created_at) VALUES
('88888888-8888-8888-8888-888888888888', 'Grace Miller', 'grace.miller@example.com', 'Denver, CO', 'Writer and creative coach. Can help with writing and creativity.', true, 94, now() - interval '12 days');

-- User 9: Hiro Tanaka
INSERT INTO users (id, fullname, email, location, description, public_profile, trust_percentage, created_at) VALUES
('99999999-9999-9999-9999-999999999999', 'Hiro Tanaka', 'hiro.tanaka@example.com', 'San Jose, CA', 'React developer and language learner. Can teach React and Japanese basics.', true, 92, now() - interval '10 days');

-- User 10: Isabella Rossi
INSERT INTO users (id, fullname, email, location, description, public_profile, trust_percentage, created_at) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Isabella Rossi', 'isabella.rossi@example.com', 'New York, NY', 'Photographer and Italian speaker. Can teach photography and Italian.', true, 96, now() - interval '8 days');

-- User 11: John Doe (for matching variety)
INSERT INTO users (id, fullname, email, location, description, public_profile, trust_percentage, created_at) VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'John Doe', 'john.doe@example.com', 'Austin, TX', 'Beginner in programming, looking to learn Python and JavaScript.', true, 85, now() - interval '5 days');

-- Assign skills to users (offers and wants)
-- Alice Kim
INSERT INTO user_skill_offer (user_id, skill_id, proficiency_level) VALUES
('22222222-2222-2222-2222-222222222222', (SELECT id FROM skills WHERE name = 'UI/UX Design'), 'expert'),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM skills WHERE name = 'Photography'), 'intermediate');
INSERT INTO user_skill_want (user_id, skill_id, priority_level) VALUES
('22222222-2222-2222-2222-222222222222', (SELECT id FROM skills WHERE name = 'React'), 'high'),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM skills WHERE name = 'Digital Marketing'), 'medium');

-- Ben Singh
INSERT INTO user_skill_offer (user_id, skill_id, proficiency_level) VALUES
('33333333-3333-3333-3333-333333333333', (SELECT id FROM skills WHERE name = 'Python'), 'expert'),
('33333333-3333-3333-3333-333333333333', (SELECT id FROM skills WHERE name = 'Node.js'), 'advanced');
INSERT INTO user_skill_want (user_id, skill_id, priority_level) VALUES
('33333333-3333-3333-3333-333333333333', (SELECT id FROM skills WHERE name = 'UI/UX Design'), 'high'),
('33333333-3333-3333-3333-333333333333', (SELECT id FROM skills WHERE name = 'Photography'), 'medium');

-- Carla Lopez
INSERT INTO user_skill_offer (user_id, skill_id, proficiency_level) VALUES
('44444444-4444-4444-4444-444444444444', (SELECT id FROM skills WHERE name = 'Spanish'), 'native'),
('44444444-4444-4444-4444-444444444444', (SELECT id FROM skills WHERE name = 'French'), 'advanced');
INSERT INTO user_skill_want (user_id, skill_id, priority_level) VALUES
('44444444-4444-4444-4444-444444444444', (SELECT id FROM skills WHERE name = 'English'), 'high'),
('44444444-4444-4444-4444-444444444444', (SELECT id FROM skills WHERE name = 'Writing'), 'medium');

-- David Brown
INSERT INTO user_skill_offer (user_id, skill_id, proficiency_level) VALUES
('55555555-5555-5555-5555-555555555555', (SELECT id FROM skills WHERE name = 'Guitar'), 'expert'),
('55555555-5555-5555-5555-555555555555', (SELECT id FROM skills WHERE name = 'Music'), 'advanced');
INSERT INTO user_skill_want (user_id, skill_id, priority_level) VALUES
('55555555-5555-5555-5555-555555555555', (SELECT id FROM skills WHERE name = 'Python'), 'high'),
('55555555-5555-5555-5555-555555555555', (SELECT id FROM skills WHERE name = 'React'), 'medium');

-- Emma Zhang
INSERT INTO user_skill_offer (user_id, skill_id, proficiency_level) VALUES
('66666666-6666-6666-6666-666666666666', (SELECT id FROM skills WHERE name = 'Data Science'), 'expert'),
('66666666-6666-6666-6666-666666666666', (SELECT id FROM skills WHERE name = 'Yoga'), 'intermediate');
INSERT INTO user_skill_want (user_id, skill_id, priority_level) VALUES
('66666666-6666-6666-6666-666666666666', (SELECT id FROM skills WHERE name = 'Guitar'), 'high'),
('66666666-6666-6666-6666-666666666666', (SELECT id FROM skills WHERE name = 'Cooking'), 'medium');

-- Faisal Ahmed
INSERT INTO user_skill_offer (user_id, skill_id, proficiency_level) VALUES
('77777777-7777-7777-7777-777777777777', (SELECT id FROM skills WHERE name = 'Digital Marketing'), 'expert'),
('77777777-7777-7777-7777-777777777777', (SELECT id FROM skills WHERE name = 'Public Speaking'), 'advanced');
INSERT INTO user_skill_want (user_id, skill_id, priority_level) VALUES
('77777777-7777-7777-7777-777777777777', (SELECT id FROM skills WHERE name = 'UI/UX Design'), 'high'),
('77777777-7777-7777-7777-777777777777', (SELECT id FROM skills WHERE name = 'Writing'), 'medium');

-- Grace Miller
INSERT INTO user_skill_offer (user_id, skill_id, proficiency_level) VALUES
('88888888-8888-8888-8888-888888888888', (SELECT id FROM skills WHERE name = 'Writing'), 'expert'),
('88888888-8888-8888-8888-888888888888', (SELECT id FROM skills WHERE name = 'Creative'), 'advanced');
INSERT INTO user_skill_want (user_id, skill_id, priority_level) VALUES
('88888888-8888-8888-8888-888888888888', (SELECT id FROM skills WHERE name = 'Photography'), 'high'),
('88888888-8888-8888-8888-888888888888', (SELECT id FROM skills WHERE name = 'Yoga'), 'medium');

-- Hiro Tanaka
INSERT INTO user_skill_offer (user_id, skill_id, proficiency_level) VALUES
('99999999-9999-9999-9999-999999999999', (SELECT id FROM skills WHERE name = 'React'), 'expert'),
('99999999-9999-9999-9999-999999999999', (SELECT id FROM skills WHERE name = 'Japanese'), 'intermediate');
INSERT INTO user_skill_want (user_id, skill_id, priority_level) VALUES
('99999999-9999-9999-9999-999999999999', (SELECT id FROM skills WHERE name = 'English'), 'high'),
('99999999-9999-9999-9999-999999999999', (SELECT id FROM skills WHERE name = 'Python'), 'medium');

-- Isabella Rossi
INSERT INTO user_skill_offer (user_id, skill_id, proficiency_level) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', (SELECT id FROM skills WHERE name = 'Photography'), 'expert'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', (SELECT id FROM skills WHERE name = 'Italian'), 'native');
INSERT INTO user_skill_want (user_id, skill_id, priority_level) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', (SELECT id FROM skills WHERE name = 'English'), 'high'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', (SELECT id FROM skills WHERE name = 'Writing'), 'medium');

-- John Doe
INSERT INTO user_skill_offer (user_id, skill_id, proficiency_level) VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', (SELECT id FROM skills WHERE name = 'English'), 'beginner');
INSERT INTO user_skill_want (user_id, skill_id, priority_level) VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', (SELECT id FROM skills WHERE name = 'Python'), 'high'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', (SELECT id FROM skills WHERE name = 'JavaScript'), 'medium');

-- Update the test user profile (after signup)
UPDATE users SET
  fullname = 'Test User',
  location = 'Remote',
  description = 'This is a test user for demo purposes. Loves learning and sharing skills!',
  public_profile = true,
  trust_percentage = 90,
  created_at = now() - interval '30 days'
WHERE email = 'test.user1@example.com';

-- Assign skills to the test user (after signup)
INSERT INTO user_skill_offer (user_id, skill_id, proficiency_level) VALUES
((SELECT id FROM users WHERE email = 'test.user1@example.com'), (SELECT id FROM skills WHERE name = 'JavaScript'), 'advanced'),
((SELECT id FROM users WHERE email = 'test.user1@example.com'), (SELECT id FROM skills WHERE name = 'Python'), 'intermediate');
INSERT INTO user_skill_want (user_id, skill_id, priority_level) VALUES
((SELECT id FROM users WHERE email = 'test.user1@example.com'), (SELECT id FROM skills WHERE name = 'UI/UX Design'), 'high'),
((SELECT id FROM users WHERE email = 'test.user1@example.com'), (SELECT id FROM skills WHERE name = 'Spanish'), 'medium'); 