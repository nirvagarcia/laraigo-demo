import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MainLayout } from "@app/layouts/MainLayout";
import { ProtectedRoute } from "@shared/components/auth/ProtectedRoute";
import { Laraigo } from "@modules/home/components/Laraigo";
import { CampaignList } from "@modules/campaigns/components/CampaignList";
import { CampaignForm } from "@modules/campaigns/components/CampaignForm";
import { CampaignsProvider } from "@modules/campaigns/contexts/CampaignsProvider";
import { LoginPage } from "@modules/auth/pages/LoginPage";
import { RegisterPage } from "@modules/auth/pages/RegisterPage";
import ComingSoon from "@modules/common/pages/ComingSoon";

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRoute requireAuth={false}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute requireAuth={false}>
              <RegisterPage />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Laraigo />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ComingSoon titleKey="menu.dashboard" />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/campaigns"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CampaignsProvider>
                  <CampaignList />
                </CampaignsProvider>
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/campaigns/new"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CampaignsProvider>
                  <CampaignForm />
                </CampaignsProvider>
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/campaigns/edit/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CampaignsProvider>
                  <CampaignForm />
                </CampaignsProvider>
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ComingSoon titleKey="menu.templates" />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ComingSoon titleKey="menu.reports" />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
