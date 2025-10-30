import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Stack,
  IconButton,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@shared/components/ui/Button";
import { Chip } from "@shared/components/ui/Chip";
import { PageContainer } from "@shared/components/layout/PageContainer";
import { useTranslation } from "@app/providers/I18nProvider";
import { campaignSchema, CampaignFormData } from "../schemas/campaignSchema";
import { Campaign } from "../types/campaign";
import { mockCampaigns } from "../data/mocks/campaigns.mock";
import { sourceOptions, executionTypeOptions } from "../data/mockData";
import { defaultCampaignValues } from "../utils/formDefaults";
import {
  CampaignContainer,
  CampaignHeader,
  CampaignCard,
  FormContainer,
  campaignSx,
} from "../styles/stylesCampaign";

export const Campaigns: React.FC = () => {
  const { t } = useTranslation();

  const getErrorMessage = (error: any): string => {
    return typeof error?.message === "string" ? error.message : "";
  };

  const [campaigns, setCampaigns] = useState<Campaign[]>(
    mockCampaigns.map((campaign) => ({
      ...campaign,
      title: t(campaign.title),
      description: t(campaign.description),
    }))
  );

  const [showForm, setShowForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema(t)),
    defaultValues: defaultCampaignValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    control,
  } = form;

  const onSubmit = (data: CampaignFormData) => {
    if (editingCampaign) {
      setCampaigns((prev) =>
        prev.map((campaign) =>
          campaign.id === editingCampaign.id
            ? { ...campaign, ...data, updatedAt: new Date() }
            : campaign
        )
      );
    } else {
      const newCampaign: Campaign = {
        id: Date.now().toString(),
        title: data.title || "",
        description: data.description || "",
        startDate: data.startDate || new Date(),
        endDate: data.endDate || new Date(),
        source: data.source || "",
        executionType: data.executionType || "",
        scheduledDate: data.scheduledDate,
        scheduledTime: data.scheduledTime,
        group: data.group,
        channel: data.channel,
        messageType: data.messageType,
        template: data.template,
        status: "draft",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setCampaigns((prev) => [...prev, newCampaign]);
    }
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCampaign(null);
    reset();
  };

  const handleCreateCampaign = () => {
    setShowForm(true);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setShowForm(true);
    setValue("title", campaign.title);
    setValue("description", campaign.description);
    setValue("startDate", campaign.startDate);
    setValue("endDate", campaign.endDate);
    setValue("source", campaign.source);
    setValue("executionType", campaign.executionType);
    setValue("scheduledDate", campaign.scheduledDate);
    setValue("scheduledTime", campaign.scheduledTime || "");
    setValue("group", campaign.group || "");
    setValue("channel", campaign.channel || "");
    setValue("messageType", campaign.messageType || "");
    setValue("template", campaign.template || "");
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((campaign) => campaign.id !== id));
  };

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "success";
      case "draft":
        return "warning";
      case "paused":
        return "info";
      case "completed":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: Campaign["status"]) => {
    return t(`status.${status}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <PageContainer>
        <CampaignContainer>
          <CampaignHeader>
            <Box>
              <Typography variant="h4" sx={campaignSx.listTitle}>
                📢 {t("campaign.list")}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t("campaign.manage_description")}
              </Typography>
            </Box>
            <Button
              variant="primary"
              onClick={handleCreateCampaign}
              sx={campaignSx.createButton}
            >
              ➕ {t("buttons.create_campaign")}
            </Button>
          </CampaignHeader>

          {showForm && (
            <FormContainer>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={campaignSx.formHeader}
              >
                <Typography variant="h6" sx={campaignSx.campaignTitle}>
                  {editingCampaign ? t("campaign.edit") : t("campaign.create")}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" onClick={handleCloseForm}>
                    {t("buttons.cancel")}
                  </Button>
                  <Button
                    type="submit"
                    form="simple-campaign-form"
                    variant="primary"
                  >
                    {t("buttons.save")}
                  </Button>
                </Stack>
              </Stack>

              <form id="simple-campaign-form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={t("fields.title")}
                      placeholder={t("placeholders.title")}
                      value={watch("title")}
                      onChange={(e) => setValue("title", e.target.value)}
                      error={!!errors.title}
                      helperText={getErrorMessage(errors.title)}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={t("fields.description")}
                      placeholder={t("placeholders.description")}
                      value={watch("description")}
                      onChange={(e) => setValue("description", e.target.value)}
                      error={!!errors.description}
                      helperText={getErrorMessage(errors.description)}
                      multiline
                      rows={1}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Controller
                      name="startDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          label={t("fields.startDate")}
                          value={field.value || null}
                          onChange={(date) => field.onChange(date)}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              placeholder: t("placeholders.startDate"),
                              error: !!errors.startDate,
                              helperText: getErrorMessage(errors.startDate),
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Controller
                      name="endDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          label={t("fields.endDate")}
                          value={field.value || null}
                          onChange={(date) => field.onChange(date)}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              placeholder: t("placeholders.endDate"),
                              error: !!errors.endDate,
                              helperText: getErrorMessage(errors.endDate),
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Controller
                      name="source"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          select
                          label={t("fields.source")}
                          placeholder={t("placeholders.source")}
                          value={field.value || ""}
                          onChange={field.onChange}
                          error={!!errors.source}
                          helperText={getErrorMessage(errors.source)}
                        >
                          {sourceOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {t(option.label)}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Controller
                      name="executionType"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          select
                          label={t("fields.executionType")}
                          placeholder={t("placeholders.executionType")}
                          value={field.value || ""}
                          onChange={field.onChange}
                          error={!!errors.executionType}
                          helperText={getErrorMessage(errors.executionType)}
                        >
                          {executionTypeOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {t(option.label)}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={campaignSx.personsPlaceholder}>
                      <Typography variant="body2" color="text.secondary">
                        {t("tips.advanced_config")}{" "}
                        <Button
                          size="small"
                          onClick={() =>
                            window.open("/campaigns/new", "_blank")
                          }
                          sx={campaignSx.underlinedButton}
                        >
                          {t("tips.full_form_link")}
                        </Button>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </FormContainer>
          )}

          <Box sx={campaignSx.listContainer}>
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} elevation={0}>
                <Box sx={campaignSx.formHeader}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="start"
                  >
                    <Typography variant="h6" sx={campaignSx.campaignTitle}>
                      {campaign.title}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleEditCampaign(campaign)}
                        sx={campaignSx.actionButton}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteCampaign(campaign.id)}
                        sx={campaignSx.actionButton}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>

                  <Chip
                    label={getStatusLabel(campaign.status)}
                    color={getStatusColor(campaign.status)}
                    size="small"
                    sx={campaignSx.statusChip}
                  />
                </Box>

                {campaign.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={campaignSx.campaignDescription}
                  >
                    {campaign.description}
                  </Typography>
                )}

                <Box sx={campaignSx.campaignDate}>
                  <Typography variant="caption" sx={campaignSx.dateText}>
                    📅 {campaign.startDate.toLocaleDateString()} -{" "}
                    {campaign.endDate.toLocaleDateString()}
                  </Typography>
                </Box>
              </CampaignCard>
            ))}
          </Box>
        </CampaignContainer>
      </PageContainer>
    </LocalizationProvider>
  );
};

export default Campaigns;
