import { NavigateFunction } from "react-router-dom";

export const goToNewCampaign = (navigate: NavigateFunction) => {
  navigate("/campaigns/new");
};

export const goToEditCampaign = (navigate: NavigateFunction, id: string) => {
  navigate(`/campaigns/edit/${id}`);
};

export const goToCampaignsList = (navigate: NavigateFunction) => {
  navigate("/campaigns");
};
