# Java-Journey-Learn

**Java-Journey-Learn** is an interactive web application designed to make learning Java engaging and effective. This platform provides a structured learning path, allowing users to track their progress, authenticate securely, and reinforce their knowledge through interactive exercises like variable scramble games. Built with a modern frontend and a robust backend, Java-Journey-Learn aims to provide a seamless and personalized learning experience for aspiring Java developers.

## Features

*   **Interactive Learning Paths**: Structured lessons to guide users through Java concepts.
*   **User Authentication**: Secure sign-up and login functionality powered by Supabase Auth.
*   **Progress Tracking**: Users can track their learning progress, which is securely stored and synced with Supabase.
*   **Interactive Games**: Engage with learning through games like "Variable Scramble" to reinforce understanding.
*   **Syntax Highlighting**: Clear and readable code examples with integrated syntax highlighting.
*   **Responsive Design**: Accessible and functional across various devices.

## Tech Stack

**Frontend:**
*   **React**: A JavaScript library for building user interfaces.
*   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
*   **Vite**: A fast build tool that provides a lightning-fast development experience.
*   **ESLint**: For maintaining code quality and consistency.
*   **React Router DOM**: For declarative routing in React applications.

**Backend/Database:**
*   **Supabase**: An open-source Firebase alternative providing PostgreSQL database, Authentication, and Realtime capabilities.
    *   **PostgreSQL**: The relational database used by Supabase.
    *   **Supabase Auth**: For user authentication and management.
    *   **Row Level Security (RLS)**: For fine-grained access control to data.

**Deployment (Planned):**
*   **Vercel**: For seamless frontend deployment.

**Other Tools:**
*   **localStorage**: For client-side data persistence and fallback storage.

## Setup and Installation

Follow these steps to get Java-Journey-Learn up and running on your local machine.

### Prerequisites

*   Node.js (v18 or higher)
*   npm or pnpm (recommended)
*   Git

### 1. Clone the Repository

```bash
git clone https://github.com/anassdakdaki/Java-Journey-Learning.git
cd Java-Journey-Learning
```

### 2. Install Dependencies

Using pnpm:
```bash
pnpm install
```
Or using npm:
```bash
npm install
```

### 3. Supabase Setup

Java-Journey-Learn uses Supabase for its backend. You'll need to set up a new Supabase project.

1.  **Create a New Supabase Project**:
    *   Go to [Supabase](https://supabase.com/) and create a new project.
    *   Note down your **Project URL** and **Anon Key** from your project settings (API section).

2.  **Configure Environment Variables**:
    *   Create a `.env.local` file in the root of your project (if it doesn't already exist).
    *   Add your Supabase credentials to this file:

    ```
    VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```
    *Replace `YOUR_SUPABASE_PROJECT_URL` and `YOUR_SUPABASE_ANON_KEY` with your actual Supabase project details.*

3.  **Database Schema (Progress Table)**:
    *   In your Supabase project, navigate to the "SQL Editor".
    *   Run the following SQL to create the `progress` table and set up Row Level Security (RLS):

    ```sql
    -- Create the progress table
    CREATE TABLE progress (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      lesson_slug TEXT NOT NULL,
      completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE (user_id, lesson_slug)
    );

    -- Enable Row Level Security (RLS)
    ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

    -- Policy for users to view their own progress
    CREATE POLICY "Users can view their own progress" ON progress
      FOR SELECT USING (auth.uid() = user_id);

    -- Policy for users to insert their own progress
    CREATE POLICY "Users can insert their own progress" ON progress
      FOR INSERT WITH CHECK (auth.uid() = user_id);

    -- Policy for users to update their own progress (if needed, e.g., for re-attempts)
    CREATE POLICY "Users can update their own progress" ON progress
      FOR UPDATE USING (auth.uid() = user_id);
    ```

### 4. Run the Development Server

```bash
pnpm dev
```
Or using npm:
```bash
npm run dev
```

The application should now be running at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

Once the application is running, you can:

1.  **Sign Up / Log In**: Create a new account or log in with existing credentials to access personalized features and track your progress.
2.  **Explore Lessons**: Navigate through the structured Java lessons. Your progress will be automatically saved.
3.  **Play Games**: Engage with interactive games like "Variable Scramble" to test your knowledge and reinforce learning.
4.  **Track Progress**: View your completed lessons and overall learning journey on your dashboard.

## Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please open an issue or submit a pull request.

### How to Contribute

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
