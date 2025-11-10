import React, { createContext, useContext, ReactNode } from "react";
import { Campaign, CampaignFormData } from "../types/campaign";
import { useCampaigns as useBaseCampaigns } from "../hooks/useCampaigns";

interface CampaignsContextType {
  campaigns: Campaign[];
  isLoading: boolean;
  error: string | null;
  getCampaign: (id: number) => Promise<Campaign>;
  createCampaign: (data: CampaignFormData) => Promise<Campaign>;
  updateCampaign: (id: number, data: CampaignFormData) => Promise<Campaign>;
  deleteCampaign: (id: number) => Promise<void>;
  refresh: () => Promise<void>;
}

const CampaignsContext = createContext<CampaignsContextType | null>(null);

interface CampaignsProviderProps {
  children: ReactNode;
}

export const CampaignsProvider: React.FC<CampaignsProviderProps> = ({
  children,
}) => {
  const campaignsData = useBaseCampaigns();

  return (
    <CampaignsContext.Provider value={campaignsData}>
      {children}
    </CampaignsContext.Provider>
  );
};

export const useCampaigns = (): CampaignsContextType => {
  const context = useContext(CampaignsContext);

  if (!context) {
    throw new Error("useCampaigns must be used within a CampaignsProvider");
  }

  return context;
};

export default CampaignsProvider;
