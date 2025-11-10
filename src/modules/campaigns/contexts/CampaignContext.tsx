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
import { logger } from "@shared/utils/logger";
import { getCampaignById } from "../data/campaignApiService";
import { bootstrapService, BootstrapData } from "../services/bootstrapService";

interface CampaignContextType extends UseFormReturn<CampaignFormData> {
  updateField: (field: keyof CampaignFormData, value: any) => void;
  isLoadingCampaign: boolean;
  isReady: boolean;
  bootstrapData: BootstrapData;
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
  const [bootstrapData, setBootstrapData] = useState<BootstrapData>({
    sources: [],
    executionTypes: [],
    groups: [],
    channels: [],
    messageTypes: [],
    templates: {},
  });
  const toast = useToast();

  const isEditing = id && id !== "new";
  const resolver = useMemo(() => zodResolver(campaignSchema), []);

  useEffect(() => {
    const loadBootstrapData = async () => {
      try {
        const data = await bootstrapService.getBootstrap();
        setBootstrapData(data);
      } catch (error) {
        logger.error("Failed to load bootstrap data", error, "CampaignContext");
        toast.error(t("errors.bootstrap_load_failed"));
      }
    };

    loadBootstrapData();
  }, [t, toast]);

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
    mode: "onChange",
    criteriaMode: "all",
    reValidateMode: "onChange",
  });

  const { setValue, reset } = methods;

  useEffect(() => {
    const loadCampaign = async () => {
      if (!isEditing) {
        setIsReady(true);
        return;
      }

      try {
        setIsLoadingCampaign(true);
        setIsReady(false);

        const campaign = await getCampaignById(Number(id));

        reset({
          title: campaign.title,
          description: campaign.description,
          startDate: campaign.startDate,
          endDate: campaign.endDate,
          source: campaign.source,
          executionType: campaign.executionType,
          scheduledDate: campaign.scheduledDate,
          scheduledTime: campaign.scheduledTime,
          group: campaign.group,
          channel: campaign.channel,
          messageType: campaign.messageType,
          template: campaign.template,
          persons: campaign.persons,
          filePath: campaign.filePath,
        });

        setIsReady(true);
      } catch (error) {
        logger.error("Failed to load campaign", error, "CampaignContext");
        toast.error(t("errors.campaign_load_failed"));
      } finally {
        setIsLoadingCampaign(false);
      }
    };

    loadCampaign();
  }, [id, isEditing, reset, t, toast]);

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
