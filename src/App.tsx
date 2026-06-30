import { Component, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { GlowingOrbs } from "@/components/GlowingOrbs";
import { FloatingTerminal } from "@/components/FloatingTerminal";
import { Nav } from "@/components/Nav";
import { Toaster } from "@/components/ui/sonner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
import SkillsPage from "@/pages/Skills";
import ExperiencePage from "@/pages/Experience";
import ProjectsPage from "@/pages/Projects";
import ContactPage from "@/pages/Contact";
import AuthPage from "@/pages/Auth";
import ResetPasswordPage from "@/pages/ResetPassword";
import AdminPage from "@/pages/Admin";

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
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
      <GlowingOrbs />
      <Nav />
      <FloatingTerminal />
      <main>{children}</main>
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
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
