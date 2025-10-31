import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { useTranslation } from "@app/providers/I18nProvider";
import { campaignSchema, CampaignFormData } from "../schemas/campaignSchema";
import { getDefaultCampaignValues } from "../utils/formDefaults";
import { useToast } from "@shared/components/ui";
import { bootstrapService, BootstrapData } from "../services/bootstrapService";
import { logger } from "@shared/utils/logger";

interface CampaignContextType extends UseFormReturn<CampaignFormData> {
  updateField: (field: keyof CampaignFormData, value: any) => void;
  isLoadingCampaign: boolean;
  isReady: boolean;
  bootstrapData: BootstrapData | null;
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
  const { id } = useParams<{ id: string }>();
  const [isLoadingCampaign, setIsLoadingCampaign] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [bootstrapData, setBootstrapData] = useState<BootstrapData | null>(
    null
  );
  const toast = useToast();

  const resolver = useMemo(() => zodResolver(campaignSchema(t)), [t]);

  const defaultValues = useMemo(
    () => ({
      ...getDefaultCampaignValues(),
      ...initialValues,
    }),
    [initialValues]
  );

  const methods = useForm<CampaignFormData>({
    resolver,
    defaultValues,
    mode: "all",
    reValidateMode: "onChange",
  });

  const { setValue, reset } = methods;

  useEffect(() => {
    const loadBootstrapData = async () => {
      try {
        setIsLoadingCampaign(true);
        setIsReady(false);

        const campaignId = id && id !== "new" ? id : undefined;
        const data = await bootstrapService.getBootstrap(campaignId);

        setBootstrapData(data);

        if (data.campaign) {
          reset({
            title: data.campaign.title,
            description: data.campaign.description,
            startDate: data.campaign.startDate,
            endDate: data.campaign.endDate,
            source: data.campaign.source,
            executionType: data.campaign.executionType,
            scheduledDate: data.campaign.scheduledDate,
            scheduledTime: data.campaign.scheduledTime,
            group: data.campaign.group,
            channel: data.campaign.channel,
            messageType: data.campaign.messageType,
            template: data.campaign.template,
          });
        }

        setIsReady(true);
      } catch (error) {
        logger.error("Failed to load bootstrap data", error, "CampaignContext");
        toast.error(t("errors.campaign_load_failed"));
      } finally {
        setIsLoadingCampaign(false);
      }
    };

    loadBootstrapData();
  }, [id, reset, t, toast]);

  const updateField = useCallback(
    (field: keyof CampaignFormData, value: any) => {
      setValue(field, value, { shouldValidate: true });
    },
    [setValue]
  );

  const contextValue: CampaignContextType = {
    ...methods,
    updateField,
    isLoadingCampaign,
    isReady,
    bootstrapData,
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
