import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "@app/layouts/MainLayout";
import { Laraigo } from "@modules/home/components/Laraigo";
import { CampaignList } from "@modules/campaigns/components/CampaignList";
import { CampaignForm } from "@modules/campaigns/components/CampaignForm";

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Laraigo />} />

        <Route
          path="/campaigns"
          element={
            <MainLayout>
              <CampaignList />
            </MainLayout>
          }
        />

        <Route
          path="/campaigns/new"
          element={
            <MainLayout>
              <CampaignForm />
            </MainLayout>
          }
        />

        <Route
          path="/campaigns/edit/:id"
          element={
            <MainLayout>
              <CampaignForm />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
