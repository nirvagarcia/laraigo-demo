import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "@app/layouts/MainLayout";
import { Laraigo } from "@modules/home/components/Laraigo";
import { Campaigns } from "@modules/campaigns/components/Campaigns";

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Laraigo />} />

        <Route
          path="/campaigns"
          element={
            <MainLayout>
              <Campaigns />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
