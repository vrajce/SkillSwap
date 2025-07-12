# Dummy Data Setup Guide

This guide will help you set up 3 dummy user profiles in your Supabase database for testing the SwapIT application.

## Dummy Users Created

### 1. Sarah Johnson - Web Developer
- **Location**: San Francisco, CA
- **Skills Teaching**: JavaScript (expert), React (expert), Node.js (advanced), Python (intermediate)
- **Skills Learning**: UI/UX Design (high priority), Spanish (medium), Photography (low)
- **Trust Score**: 95%

### 2. Alex Chen - UI/UX Designer
- **Location**: New York, NY
- **Skills Teaching**: UI/UX Design (expert), Photography (advanced), Writing (intermediate)
- **Skills Learning**: JavaScript (high), React (high), Digital Marketing (medium)
- **Trust Score**: 92%

### 3. Maria Rodriguez - Data Scientist
- **Location**: Austin, TX
- **Skills Teaching**: Python (expert), Data Science (expert), Spanish (native)
- **Skills Learning**: Guitar (high), Cooking (medium), Yoga (low)
- **Trust Score**: 88%

## How to Set Up

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor** in the left sidebar
4. Create a new query
5. Copy and paste the contents of `supabase/migrations/20250713000000_dummy_data.sql`
6. Click **Run** to execute the SQL

### Option 2: Using Supabase CLI

If you have Supabase CLI installed:

```bash
# Navigate to your project directory
cd SWAPIT_demo

# Run the migration
supabase db push
```

## What Gets Created

- **3 complete user profiles** with realistic data
- **Skill offerings and wants** for each user
- **Matches between users** (all 3 users are matched with each other)
- **Sample chat messages** between matched users
- **Scheduled and completed sessions**
- **Notifications** for various events
- **Badges** awarded to users

## Testing the App

After running the dummy data:

1. Start your development server: `npm run dev`
2. Open the app in your browser
3. You can now see:
   - Users in the Discover page (swipe interface)
   - Matches in the Dashboard
   - Chat conversations in the Chat page
   - Sessions in the Schedule page
   - Notifications in the header
   - Badges in the Profile page

## Notes

- The dummy users have fixed UUIDs for consistency
- Profile pictures use Pexels stock photos
- All data is interconnected and realistic
- You can modify the data in the SQL file to customize the dummy profiles

## Troubleshooting

If you encounter errors:

1. Make sure you've run the initial migration first (`20250712080256_broken_lodge.sql`)
2. Check that your Supabase project has the correct tables created
3. Verify that the skills table has the required skills inserted
4. Ensure you have proper permissions to insert data

## Customization

You can modify the dummy data by editing the SQL file:
- Change user details (names, locations, descriptions)
- Add or remove skills
- Modify match relationships
- Adjust trust scores and other metrics 

**Automated script created!**

### How to Use

1. **Install dependencies** (if not already):
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Set your environment variables** (in your shell or a `.env` file):
   ```
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtb3Ztcm5ieGJ5Y2NmbXFrb3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMDE1ODgsImV4cCI6MjA2Nzg3NzU4OH0.ZVqJIGAX2YZTtY3aNm1tNQcHjAR7lkMVjhp-ZohDlxQ
   VITE_SUPABASE_URL=https://cmovmrnbxbyccfmqkozk.supabase.co
   ```

3. **Run the script**:
   ```bash
   node scripts/generate_dummy_users.js
   ```

---

**What this does:**
- Creates 10 users in Supabase Auth (with known emails/passwords).
- Inserts/updates their profiles in the `users` table.
- Assigns skills (offers/wants) to each user.
- All users will appear in your frontend and backend, and you can log in as any of them.

**Test login:**
- Email: `test.user1@example.com`
- Password: `TestUser123!`

---

If you want to add matches, messages, or more, let me know!  
If you run into any errors, paste them here and I’ll help debug. 