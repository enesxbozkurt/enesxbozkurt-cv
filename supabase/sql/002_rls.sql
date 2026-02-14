-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
-- Public can read public profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (is_public = true);

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Experiences policies
-- Public can read experiences of public profiles
CREATE POLICY "Public experiences are viewable"
  ON experiences FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = experiences.user_id
      AND profiles.is_public = true
    )
  );

-- Users can view their own experiences
CREATE POLICY "Users can view own experiences"
  ON experiences FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own experiences
CREATE POLICY "Users can insert own experiences"
  ON experiences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own experiences
CREATE POLICY "Users can update own experiences"
  ON experiences FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own experiences
CREATE POLICY "Users can delete own experiences"
  ON experiences FOR DELETE
  USING (auth.uid() = user_id);

-- Projects policies
CREATE POLICY "Public projects are viewable"
  ON projects FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = projects.user_id
      AND profiles.is_public = true
    )
  );

CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON projects FOR DELETE
  USING (auth.uid() = user_id);

-- Education policies
CREATE POLICY "Public education is viewable"
  ON education FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = education.user_id
      AND profiles.is_public = true
    )
  );

CREATE POLICY "Users can view own education"
  ON education FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own education"
  ON education FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own education"
  ON education FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own education"
  ON education FOR DELETE
  USING (auth.uid() = user_id);

-- Skills policies
CREATE POLICY "Public skills are viewable"
  ON skills FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = skills.user_id
      AND profiles.is_public = true
    )
  );

CREATE POLICY "Users can view own skills"
  ON skills FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skills"
  ON skills FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skills"
  ON skills FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own skills"
  ON skills FOR DELETE
  USING (auth.uid() = user_id);

-- Certifications policies
CREATE POLICY "Public certifications are viewable"
  ON certifications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = certifications.user_id
      AND profiles.is_public = true
    )
  );

CREATE POLICY "Users can view own certifications"
  ON certifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own certifications"
  ON certifications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own certifications"
  ON certifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own certifications"
  ON certifications FOR DELETE
  USING (auth.uid() = user_id);

-- Storage policies for avatars bucket
-- Create bucket if it doesn't exist (run this in Supabase dashboard)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Allow public read access to avatars
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Allow authenticated users to upload their own avatar
CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to update their own avatar
CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to delete their own avatar
CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
