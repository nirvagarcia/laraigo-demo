import { createContext, useContext, ReactNode } from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@app/providers/I18nProvider";
import { campaignSchema, CampaignFormData } from "../schemas/campaignSchema";
import { getDefaultCampaignValues } from "../utils/formDefaults";

interface CampaignContextType extends UseFormReturn<CampaignFormData> {
  updateField: (field: keyof CampaignFormData, value: any) => void;
}

const CampaignContext = createContext<CampaignContextType | null>(null);

interface CampaignProviderProps {
  children: ReactNode;
  initialValues?: Partial<CampaignFormData>;
}

export const CampaignProvider: React.FC<CampaignProviderProps> = ({
  children,
  initialValues,
}) => {
  const { t } = useTranslation();

  const methods = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema(t)),
    defaultValues: {
      ...getDefaultCampaignValues(),
      ...initialValues,
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const updateField = (field: keyof CampaignFormData, value: any) => {
    methods.setValue(field, value, { shouldValidate: true });
  };

  const contextValue: CampaignContextType = {
    ...methods,
    updateField,
  };

  return (
    <CampaignContext.Provider value={contextValue}>
      <FormProvider {...methods}>{children}</FormProvider>
    </CampaignContext.Provider>
  );
};

export const useCampaign = (): CampaignContextType => {
  const context = useContext(CampaignContext);

  if (!context) {
    throw new Error("useCampaign must be used within a CampaignProvider");
  }

  return context;
};

export default CampaignProvider;
