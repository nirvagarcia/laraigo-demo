import React, { createContext, useContext, ReactNode } from "react";
import { Campaign } from "../types/campaign";
import { CampaignFormData } from "../schemas/campaignSchema";
import { useCampaigns as useBaseCampaigns } from "../hooks/useCampaigns";

interface CampaignsContextType {
  campaigns: Campaign[];
  isLoading: boolean;
  error: string | null;
  getCampaign: (id: string) => Promise<Campaign>;
  createCampaign: (data: CampaignFormData) => Promise<Campaign>;
  updateCampaign: (id: string, data: CampaignFormData) => Promise<Campaign>;
  deleteCampaign: (id: string) => Promise<void>;
  saveCampaign: (data: CampaignFormData, id?: string) => Promise<Campaign>;
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
