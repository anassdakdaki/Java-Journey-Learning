
import { supabase } from './src/supabaseClient';
import { saveProgress, loadProgress } from './src/services/progressService';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { COURSE_CONTENT } from './constants';
import LessonView from './components/LessonView';
import ProgressBar from './components/ProgressBar';
import { Section, Lesson, Step, User } from './types';
import DashboardView from './components/DashboardView';
import ThemeToggle from './components/ThemeToggle';
import AIDevAssistantModal from './components/AIDevAssistantModal';
import GamesView from './components/GamesView';
import ProjectsView from './components/ProjectsView';
import ResourcesView from './components/ResourcesView';
import AuthView from './components/AuthView';
import ProfileView from './components/ProfileView';
import BottomNavBar from './components/BottomNavBar';
import { PROJECTS, Project } from './constants/projectsData';
import ProjectWorkspace from './components/ProjectWorkspace';

type MainView = 'course' | 'games' | 'projects' | 'resources' | 'profile' | 'auth';
type View = 'dashboard' | 'lesson';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [mainView, setMainView] = useState<MainView>('course');
  const [view, setView] = useState<View>('dashboard');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set<string>());
  const [theme, setTheme] = useState<Theme>('light');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantContext, setAssistantContext] = useState('');
  const [user, setUser] = useState<User | null>(null); // Supabase user
  const location = useLocation();
  const navigate = useNavigate();

  // Supabase Auth Listener
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          // User is logged in
          const supabaseUser: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || '',
            avatar: session.user.user_metadata?.avatar || '',
          };
          setUser(supabaseUser);
          try {
            localStorage.setItem('javaJourneyUser', JSON.stringify(supabaseUser));
          } catch (err) {
            console.error('Failed to persist user locally', err);
          }
          // Load progress from Supabase for this user
          const userProgress = await loadProgress(session.user.id);
          if (userProgress) {
            setCompletedSteps(new Set(userProgress.map(p => p.step_id)));
          }
        } else {
          // User is logged out
          setUser(null);
          setCompletedSteps(new Set()); // Clear progress on logout
          try {
            localStorage.removeItem('javaJourneyUser');
          } catch (err) {
            console.error('Failed to clear cached user', err);
          }
        }
      }
    );

    // Cleanup the listener on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const slugify = useCallback((s: string) => s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-'), []);
  const getStableSlug = useCallback((prefix: string, id: string, title: string) => {
    try {
      const key = `jj.slug.${prefix}:${id}`;
      const existing = localStorage.getItem(key);
      if (existing) return existing;
      const computed = slugify(title);
      localStorage.setItem(key, computed);
      return computed;
    } catch {
      return slugify(title);
    }
  }, [slugify]);
  const sectionSlugs = useMemo(() => COURSE_CONTENT.map(sec => getStableSlug('section', sec.id, sec.title)), [getStableSlug]);
  const lessonSlugsBySection = useMemo(
    () => COURSE_CONTENT.map(sec => sec.lessons.map(lesson => getStableSlug('lesson', lesson.id, lesson.title))),
    [getStableSlug]
  );
  const projectSlugs = useMemo(
    () => PROJECTS.reduce<Record<string, string>>((acc, p) => {
      acc[p.id] = getStableSlug('project', p.id, p.title);
      return acc;
    }, {}),
    [getStableSlug]
  );
  const findProjectBySlug = (slug: string): Project | null => {
    for (const p of PROJECTS) {
      if (projectSlugs[p.id] === slug) return p;
    }
    return null;
  };
  const findSectionIndexBySlug = useCallback((slug: string) => {
    const idx = sectionSlugs.findIndex(s => s === slug);
    return idx >= 0 ? idx : 0;
  }, [sectionSlugs]);
  const findLessonIndexBySlug = (sectionIndex: number, slug: string) => {
    const arr = lessonSlugsBySection[sectionIndex] || [];
    const idx = arr.findIndex(s => s === slug);
    return idx >= 0 ? idx : 0;
  };
  // Load progress and theme from localStorage/Supabase on initial render
  useEffect(() => {
    try {
      // Load theme
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme) {
        setTheme(savedTheme);
      } else if (prefersDark) {
        setTheme('dark');
      }
      
      // Load user from localStorage (if any, for initial render before Supabase auth listener kicks in)
      const savedUserRaw = localStorage.getItem('javaJourneyUser');
      if (savedUserRaw) {
        const savedUser: User = JSON.parse(savedUserRaw);
        setUser(savedUser);
      }

    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
    }
  }, []);

  // Save progress to localStorage and Supabase whenever it changes
  useEffect(() => {
    try {
      const progressToSave = {
        currentSectionIndex,
        currentLessonIndex,
        currentStepIndex,
        completedSteps: Array.from(completedSteps),
        view,
        mainView,
      };
      localStorage.setItem('javaJourneyProgress', JSON.stringify(progressToSave));

      // Save to Supabase if user is logged in
      if (user?.id) {
        completedSteps.forEach(async (stepId) => {
          const [lessonId] = stepId.split('-'); // Assuming stepId format like 'lessonId-stepId'
          await saveProgress(user.id, { lesson_id: lessonId, step_id: stepId, is_completed: true });
        });
      }

    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  }, [currentSectionIndex, currentLessonIndex, currentStepIndex, completedSteps, view, mainView, user]);

  // Handle theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
       console.error("Failed to save theme to localStorage:", error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  const openAssistant = (context: string) => {
    setAssistantContext(context);
    setIsAssistantOpen(true);
  };
  
  const closeAssistant = () => {
    setIsAssistantOpen(false);
    setAssistantContext('');
  };

  const handleLogin = (u: User) => {
    setUser(u);
    try {
      localStorage.setItem('javaJourneyUser', JSON.stringify(u));
    } catch (err) {
      console.error('Failed to cache user after login', err);
    }
    navigate('/profile');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('javaJourneyUser');
    navigate('/learn/java');
  };

  const handleUpdateUser = (u: User) => {
    setUser(u);
    try {
      localStorage.setItem('javaJourneyUser', JSON.stringify(u));
    } catch (err) {
      console.error('Failed to cache user after update', err);
    }
  };


  const currentSection: Section = COURSE_CONTENT[currentSectionIndex];
  const currentLesson: Lesson = currentSection.lessons[currentLessonIndex];
  const currentStep: Step = currentLesson.steps[currentStepIndex];

  const completedLessons = useMemo(() => {
    const lessonIds = new Set<string>();
    COURSE_CONTENT.forEach(section => {
      section.lessons.forEach(lesson => {
        const allStepsComplete = lesson.steps.every(step => completedSteps.has(step.id));
        if (allStepsComplete) {
          lessonIds.add(lesson.id);
        }
      });
    });
    return lessonIds;
  }, [completedSteps]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('javaJourneyNotes');
      const notes: Array<{ lessonId: string; title: string; date: string }> = raw ? JSON.parse(raw) : [];
      const known = new Set(notes.map(n => n.lessonId));
      COURSE_CONTENT.forEach(section => {
        section.lessons.forEach(lesson => {
          const allStepsComplete = lesson.steps.every(step => completedSteps.has(step.id));
          if (allStepsComplete && !known.has(lesson.id)) {
            notes.push({
              lessonId: lesson.id,
              title: lesson.title,
              date: new Date().toISOString(),
            });
          }
        });
      });
      localStorage.setItem('javaJourneyNotes', JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to persist completion notes', e);
    }
  }, [completedSteps]);


  const markStepAsCompleted = (stepId: string) => {
    setCompletedSteps(prev => new Set(prev).add(stepId));
  };
  
  const handleMarkLessonAsComplete = (sectionIndex: number, lessonIndex: number) => {
    const lesson = COURSE_CONTENT[sectionIndex]?.lessons[lessonIndex];
    if (!lesson) return;

    const stepsToComplete = new Set(completedSteps);
    lesson.steps.forEach(step => stepsToComplete.add(step.id));
    setCompletedSteps(stepsToComplete);
  };

  const handleStartLesson = (sectionIndex: number, lessonIndex: number) => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentLessonIndex(lessonIndex);
    setCurrentStepIndex(0);
    const sSlug = sectionSlugs[sectionIndex];
    const lSlug = lessonSlugsBySection[sectionIndex][lessonIndex];
    navigate(`/learn/java/${sSlug}/${lSlug}/0`);
  };

  const handleBackToDashboard = () => {
    navigate('/learn/java');
  };

  const goToNextStep = () => {
    if (currentStepIndex < currentLesson.steps.length - 1) {
      const nextStep = currentStepIndex + 1;
      setCurrentStepIndex(nextStep);
      const sSlug = sectionSlugs[currentSectionIndex];
      const lSlug = lessonSlugsBySection[currentSectionIndex][currentLessonIndex];
      navigate(`/learn/java/${sSlug}/${lSlug}/${nextStep}`);
    } else if (currentLessonIndex < currentSection.lessons.length - 1) {
      const nextLesson = currentLessonIndex + 1;
      setCurrentLessonIndex(nextLesson);
      setCurrentStepIndex(0);
      const sSlug = sectionSlugs[currentSectionIndex];
      const lSlug = lessonSlugsBySection[currentSectionIndex][nextLesson];
      navigate(`/learn/java/${sSlug}/${lSlug}/0`);
    } else if (currentSectionIndex < COURSE_CONTENT.length - 1) {
      const nextSection = currentSectionIndex + 1;
      setCurrentSectionIndex(nextSection);
      setCurrentLessonIndex(0);
      setCurrentStepIndex(0);
      const sSlug = sectionSlugs[nextSection];
      const lSlug = lessonSlugsBySection[nextSection][0];
      navigate(`/learn/java/${sSlug}/${lSlug}/0`);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      const prevStep = currentStepIndex - 1;
      setCurrentStepIndex(prevStep);
      const sSlug = sectionSlugs[currentSectionIndex];
      const lSlug = lessonSlugsBySection[currentSectionIndex][currentLessonIndex];
      navigate(`/learn/java/${sSlug}/${lSlug}/${prevStep}`);
    } else if (currentLessonIndex > 0) {
      const prevLesson = currentSection.lessons[currentLessonIndex - 1];
      const newLessonIndex = currentLessonIndex - 1;
      const newStepIndex = prevLesson.steps.length - 1;
      setCurrentLessonIndex(newLessonIndex);
      setCurrentStepIndex(newStepIndex);
      const sSlug = sectionSlugs[currentSectionIndex];
      const lSlug = lessonSlugsBySection[currentSectionIndex][newLessonIndex];
      navigate(`/learn/java/${sSlug}/${lSlug}/${newStepIndex}`);
    } else if (currentSectionIndex > 0) {
      const prevSection = COURSE_CONTENT[currentSectionIndex - 1];
      const prevLesson = prevSection.lessons[prevSection.lessons.length - 1];
      const newSectionIndex = currentSectionIndex - 1;
      const newLessonIndex = prevSection.lessons.length - 1;
      const newStepIndex = prevLesson.steps.length - 1;
      setCurrentSectionIndex(newSectionIndex);
      setCurrentLessonIndex(newLessonIndex);
      setCurrentStepIndex(newStepIndex);
      const sSlug = sectionSlugs[newSectionIndex];
      const lSlug = lessonSlugsBySection[newSectionIndex][newLessonIndex];
      navigate(`/learn/java/${sSlug}/${lSlug}/${newStepIndex}`);
    }
  };

  const isLastStepOfAll = 
    currentSectionIndex === COURSE_CONTENT.length - 1 &&
    currentLessonIndex === currentSection.lessons.length - 1 &&
    currentStepIndex === currentLesson.steps.length - 1;

  const isFirstStepOfAll = currentSectionIndex === 0 && currentLessonIndex === 0 && currentStepIndex === 0;

  const renderHeader = () => {
    const navItemClasses = "px-1.5 sm:px-4 py-1 sm:py-2 rounded-md text-[11px] sm:text-sm font-medium transition-colors whitespace-nowrap";
    const activeNavItemClasses = "bg-white/20 text-white";
    const inactiveNavItemClasses = "text-blue-200 hover:bg-white/10";
    
    return (
     <header className="bg-primary text-white shadow-md w-full sticky top-0 z-50">
        <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-2 flex justify-between items-center gap-1">
          <div className="flex items-center gap-2 sm:gap-6 flex-shrink">
            <h1 className="text-xl sm:text-2xl font-bold hidden md:block whitespace-nowrap">Java Journey</h1>
            <h1 className="text-xl font-bold md:hidden shrink-0">JJ</h1>
          </div>
          <div className="flex-1 justify-center flex items-center gap-3">
            <nav className="hidden md:flex items-center gap-2">
              <Link to="/learn/java" className={`${navItemClasses} ${location.pathname.startsWith('/learn/java') ? activeNavItemClasses : inactiveNavItemClasses}`}>Course</Link>
              <Link to="/practice/java" className={`${navItemClasses} ${location.pathname === '/practice/java' ? activeNavItemClasses : inactiveNavItemClasses}`}>Games</Link>
              <Link to="/projects/java" className={`${navItemClasses} ${location.pathname.startsWith('/projects/java') ? activeNavItemClasses : inactiveNavItemClasses}`}>Projects</Link>
              <Link to="/resources/java" className={`${navItemClasses} ${location.pathname.startsWith('/resources/java') ? activeNavItemClasses : inactiveNavItemClasses}`}>Resources</Link>
              <Link to="/profile" className={`${navItemClasses} ${location.pathname === '/profile' ? activeNavItemClasses : inactiveNavItemClasses}`}>{user ? 'Profile' : 'Login'}</Link>
            </nav>
            {mainView === 'course' && view === 'lesson' && (
               <div className="w-full max-w-xs sm:max-w-sm">
                   <ProgressBar 
                      currentStep={currentStepIndex} 
                      totalSteps={currentLesson.steps.length} 
                      lessonTitle={currentLesson.title}
                   />
                </div>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            
            {user && (
              <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/10">
                <span className="text-xl">{user.avatar || '👤'}</span>
                <span className="text-sm font-semibold hidden sm:block">{user.name}</span>
              </div>
            )}
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>

        </div>
      </header>
  )};

  const renderMainContent = () => {
    const path = location.pathname;
    if (path === '/practice/java') return <GamesView />;
    if (path === '/projects/java') return <ProjectsView openAssistant={openAssistant} />;
    if (path.startsWith('/projects/java/')) {
      const parts = path.split('/').filter(Boolean);
      const slug = parts[2] || '';
      const project = findProjectBySlug(slug);
      if (project) return <ProjectWorkspace project={project} onExit={() => navigate('/projects/java')} openAssistant={openAssistant} />;
      return <ProjectsView openAssistant={openAssistant} />;
    }
    if (path.startsWith('/resources/java')) return <ResourcesView />;
    if (path === '/profile') {
      if (!user) return <AuthView onLogin={handleLogin} />;
      return <ProfileView user={user} onUpdate={handleUpdateUser} onLogout={handleLogout} />;
    }
    if (path.startsWith('/course/lesson')) {
      const parts = path.split('/').filter(Boolean);
      const sIdx = parseInt(parts[2] ?? '0', 10) || 0;
      const lIdx = parseInt(parts[3] ?? '0', 10) || 0;
      const stIdx = parseInt(parts[4] ?? '0', 10) || 0;
      const sSlug = sectionSlugs[sIdx] || sectionSlugs[0];
      const lSlug = (lessonSlugsBySection[sIdx] || [])[lIdx] || (lessonSlugsBySection[0] || [])[0];
      navigate(`/learn/java/${sSlug}/${lSlug}/${stIdx}`, { replace: true });
      return null;
    }
    if (path === '/course') {
      navigate('/learn/java', { replace: true });
      return null;
    }
    if (path === '/games') {
      navigate('/practice/java', { replace: true });
      return null;
    }
    if (path === '/projects') {
      navigate('/projects/java', { replace: true });
      return null;
    }
    if (path === '/resources') {
      navigate('/resources/java', { replace: true });
      return null;
    }
    if (path.startsWith('/learn/java/')) {
      const parts = path.split('/').filter(Boolean);
      if (parts.length >= 4) {
        const sectionSlug = parts[2];
        const lessonSlug = parts[3];
        const stepSlug = parts[4];
        const sIdx = findSectionIndexBySlug(sectionSlug);
        const lIdx = findLessonIndexBySlug(sIdx, lessonSlug);
        const stIdx = stepSlug ? parseInt(stepSlug, 10) || 0 : 0;
        if (sIdx !== currentSectionIndex) setCurrentSectionIndex(sIdx);
        if (lIdx !== currentLessonIndex) setCurrentLessonIndex(lIdx);
        if (stIdx !== currentStepIndex) setCurrentStepIndex(stIdx);
        const sSlug = sectionSlugs[sIdx];
        const lSlug = lessonSlugsBySection[sIdx][lIdx];
        return (
          <div className="w-full max-w-4xl">
            <div className="text-xs mb-3 text-content-200">
              <Link to="/learn/java" className="hover:underline">Learn Java</Link>
              <span className="mx-1">/</span>
              <Link to={`/learn/java/${sSlug}`} className="hover:underline">{COURSE_CONTENT[sIdx].title}</Link>
              <span className="mx-1">/</span>
              <Link to={`/learn/java/${sSlug}/${lSlug}/0`} className="hover:underline">{COURSE_CONTENT[sIdx].lessons[lIdx].title}</Link>
            </div>
            <LessonView 
              step={currentStep} 
              onContinue={isLastStepOfAll ? handleBackToDashboard : goToNextStep} 
              onBack={goToPreviousStep}
              isLastStep={isLastStepOfAll}
              isFirstStep={isFirstStepOfAll}
              completedSteps={completedSteps}
              markStepAsCompleted={markStepAsCompleted}
              openAssistant={openAssistant}
            />
          </div>
        );
      }
      if (parts.length === 3) {
        const sectionSlug = parts[2];
        const sIdx = findSectionIndexBySlug(sectionSlug);
        const section = COURSE_CONTENT[sIdx];
        const pageSize = 6;
        const search = new URLSearchParams(location.search);
        const pageParam = parseInt(search.get('page') || '1', 10) || 1;
        const totalPages = Math.max(1, Math.ceil(section.lessons.length / pageSize));
        const page = Math.min(Math.max(1, pageParam), totalPages);
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const visibleLessons = section.lessons.slice(start, end);
        const sSlug = sectionSlugs[sIdx];
        return (
          <div className="w-full max-w-4xl animate-fade-in px-2 sm:px-0">
            <div className="text-xs mb-3 text-content-200">
              <Link to="/learn/java" className="hover:underline">Learn Java</Link>
              <span className="mx-1">/</span>
              <span className="text-content-100">{section.title}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4 text-center dark:text-white">{section.title}</h1>
            <ul className="divide-y divide-base-300 dark:divide-base-300-dark bg-base-100 dark:bg-base-100-dark rounded-xl shadow-lg overflow-hidden">
              {visibleLessons.map((lesson, idx) => {
                const lessonIndex = start + idx;
                const lSlug = lessonSlugsBySection[sIdx][lessonIndex];
                const stepsCount = lesson.steps.length;
                const completed = lesson.steps.every(step => completedSteps.has(step.id));
                return (
                  <li key={lesson.id} className="p-4 sm:p-5 flex items-center justify-between">
                    <div className="flex-1">
                      <Link to={`/learn/java/${sSlug}/${lSlug}/0`} className="text-lg font-semibold hover:underline text-content-100 dark:text-white">
                        {lesson.title}
                      </Link>
                      <p className="text-xs text-content-200 dark:text-content-200-dark mt-1">Steps: {stepsCount}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStartLesson(sIdx, lessonIndex)}
                        className="px-3 py-1.5 rounded-md font-semibold bg-primary text-white hover:bg-primary/90 text-sm"
                      >
                        Start
                      </button>
                      {completed && <span className="text-success text-sm">✓</span>}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-center items-center gap-2 mt-4">
              <Link
                to={`/learn/java/${sSlug}?page=${Math.max(1, page - 1)}`}
                className={`px-3 py-1.5 rounded-md text-sm ${page > 1 ? 'bg-base-100 hover:bg-base-300' : 'bg-base-200 cursor-not-allowed'}`}
              >
                Prev
              </Link>
              <span className="text-sm">{page} / {totalPages}</span>
              <Link
                to={`/learn/java/${sSlug}?page=${Math.min(totalPages, page + 1)}`}
                className={`px-3 py-1.5 rounded-md text-sm ${page < totalPages ? 'bg-base-100 hover:bg-base-300' : 'bg-base-200 cursor-not-allowed'}`}
              >
                Next
              </Link>
            </div>
          </div>
        );
      }
      return (
        <DashboardView 
          sections={COURSE_CONTENT}
          onStartLesson={handleStartLesson}
          completedLessons={completedLessons}
          onMarkLessonAsComplete={handleMarkLessonAsComplete}
        />
      );
    }
    return (
      <DashboardView 
        sections={COURSE_CONTENT}
        onStartLesson={handleStartLesson}
        completedLessons={completedLessons}
        onMarkLessonAsComplete={handleMarkLessonAsComplete}
      />
    );
  };

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      navigate('/learn/java', { replace: true });
      return;
    }
    let title = 'Java Journey';
    let description = 'Learn Java with interactive lessons, games, projects, and resources.';
    if (path.startsWith('/learn/java/') && location.pathname.split('/').filter(Boolean).length >= 4) {
      title = `Lesson • ${currentLesson.title} • Java Journey`;
      description = `Follow the lesson "${currentLesson.title}" and continue your learning progression.`;
    } else if (path.startsWith('/learn/java')) {
      const parts = path.split('/').filter(Boolean);
      if (parts.length === 3) {
        const sIdx = findSectionIndexBySlug(parts[2]);
        title = `Section • ${COURSE_CONTENT[sIdx].title} • Java Journey`;
        description = `Explore lessons in the section "${COURSE_CONTENT[sIdx].title}".`;
      } else {
        title = 'Learn Java • Java Journey';
        description = 'Explore the Java learning progression and start lessons.';
      }
    } else if (path === '/practice/java') {
      title = 'Practice Java • Games • Java Journey';
      description = 'Practice Java with interactive coding games.';
    } else if (path.startsWith('/projects/java')) {
      title = 'Java Projects • Java Journey';
      description = 'Build hands-on Java projects to reinforce concepts.';
    } else if (path.startsWith('/resources/java')) {
      title = 'Java Resources • Java Journey';
      description = 'Discover curated tutorials, documentation, and books for Java.';
    } else if (path === '/profile') {
      title = 'Profile • Java Journey';
      description = 'Manage your account, preferences, and progress.';
    }
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [location.pathname, currentLesson.title, findSectionIndexBySlug, lessonSlugsBySection, navigate, sectionSlugs]);

  return (
    <div className="bg-base-200 dark:bg-base-200-dark min-h-screen font-sans text-content-100 dark:text-content-100-dark flex flex-col">
      {renderHeader()}
      {mainView === 'course' && view === 'lesson' && (
          <button onClick={handleBackToDashboard} className="absolute top-20 left-4 text-secondary font-semibold hover:underline md:block">
              &larr; Dashboard
          </button>
      )}
      
  <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 flex items-start justify-center pt-8 sm:pt-16 pb-20 sm:pb-0">
    {renderMainContent()}
  </main>
      <AIDevAssistantModal
        isOpen={isAssistantOpen}
        onClose={closeAssistant}
        context={assistantContext}
       />
      <footer className="px-4 py-3 text-center text-xs text-content-200 dark:text-content-200-dark">
        Built by Anass Dakdaki
      </footer>
      <BottomNavBar 
        currentView={mainView}
        onNavigate={(newMainView, newView) => {
          setMainView(newMainView);
          if (newView) setView(newView);
        }}
        isLoggedIn={!!user}
      />
    </div>
  );
};

export default App;
