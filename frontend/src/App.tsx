import { lazy, Suspense, Component, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "@/hooks/useTheme";
import { GlowingOrbs } from "@/components/GlowingOrbs";
import { Nav } from "@/components/Nav";
import { Toaster } from "@/components/ui/sonner";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const FloatingTerminal = lazy(() =>
  import("@/components/FloatingTerminal").then((m) => ({ default: m.FloatingTerminal }))
);
const ChatWidget = lazy(() =>
  import("@/components/ChatWidget").then((m) => ({ default: m.ChatWidget }))
);
const HomePage = lazy(() => import("@/pages/Home"));
const AboutPage = lazy(() => import("@/pages/About"));
const SkillsPage = lazy(() => import("@/pages/Skills"));
const ExperiencePage = lazy(() => import("@/pages/Experience"));
const ProjectsPage = lazy(() => import("@/pages/Projects"));
const ContactPage = lazy(() => import("@/pages/Contact"));
const AuthPage = lazy(() => import("@/pages/Auth"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPassword"));
const AdminPage = lazy(() => import("@/pages/Admin"));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex gap-2">
        <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.3s]" />
        <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.15s]" />
        <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-400" />
      </div>
    </div>
  );
}

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div
          className="flex min-h-screen items-center justify-center bg-background px-4"
          role="main"
        >
          <Helmet>
            <title>Error | Hakizimana Leogad</title>
            <meta name="robots" content="noindex" />
          </Helmet>
          <div className="max-w-md text-center">
            <h1 className="text-7xl font-bold text-foreground">Oops</h1>
            <p className="mt-4 text-sm text-muted-foreground">{this.state.error.message}</p>
            <div className="mt-6">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Go home
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4" role="main">
      <Helmet>
        <title>404 — Page Not Found | Hakizimana Leogad</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-emerald-500 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>
      <GlowingOrbs />
      <Nav />
      <Suspense fallback={null}>
        <FloatingTerminal />
        <ChatWidget />
      </Suspense>
      <main id="main-content" role="main">
        {children}
      </main>
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrowserRouter>
            <Toaster />
            <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route
                element={
                  <Layout>
                    <HomePage />
                  </Layout>
                }
                path="/"
              />
              <Route
                element={
                  <Layout>
                    <AboutPage />
                  </Layout>
                }
                path="/about"
              />
              <Route
                element={
                  <Layout>
                    <SkillsPage />
                  </Layout>
                }
                path="/skills"
              />
              <Route
                element={
                  <Layout>
                    <ExperiencePage />
                  </Layout>
                }
                path="/experience"
              />
              <Route
                element={
                  <Layout>
                    <ProjectsPage />
                  </Layout>
                }
                path="/projects"
              />
              <Route
                element={
                  <Layout>
                    <ContactPage />
                  </Layout>
                }
                path="/contact"
              />
              <Route element={<AuthPage />} path="/auth" />
              <Route element={<ResetPasswordPage />} path="/reset-password" />
              <Route
                element={
                  <Layout>
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  </Layout>
                }
                path="/admin"
              />
              <Route
                element={
                  <Layout>
                    <NotFound />
                  </Layout>
                }
                path="*"
              />
            </Routes>
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
