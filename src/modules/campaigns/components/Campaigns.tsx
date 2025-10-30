import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Stack,
  IconButton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@shared/components/ui/Button";
import { Chip } from "@shared/components/ui/Chip";

import { PageContainer } from "@shared/components/layout/PageContainer";
import { useTranslation } from "@app/providers/I18nProvider";
import {
  campaignSchema,
  CampaignFormData,
  Campaign,
} from "../schemas/campaignSchema";
import {
  CampaignContainer,
  CampaignHeader,
  CampaignCard,
  FormContainer,
  campaignSx,
} from "../styles/stylesCampaign";

export const Campaigns: React.FC = () => {
  const { t } = useTranslation();
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      title: "Campaña de Verano 2025",
      description: "Promoción especial para productos de verano",
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-08-31"),
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      title: "Black Friday 2025",
      description: "Descuentos especiales para el Black Friday",
      startDate: new Date("2025-11-24"),
      endDate: new Date("2025-11-30"),
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
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
        ...data,
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

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setValue("title", campaign.title);
    setValue("description", campaign.description || "");
    setValue("startDate", campaign.startDate);
    setValue("endDate", campaign.endDate);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
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
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                📢 {t("campaign.list")}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Gestiona tus campañas de marketing de forma inteligente
              </Typography>
            </Box>
            <Button
              variant="primary"
              onClick={() => setShowForm(true)}
              sx={{ px: 4 }}
            >
              ➕ {t("buttons.create_campaign")}
            </Button>
          </CampaignHeader>

          {showForm && (
            <FormContainer sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                {editingCampaign ? t("campaign.edit") : t("campaign.create")}
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={t("campaign.title")}
                      {...register("title")}
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={t("campaign.description")}
                      {...register("description")}
                      multiline
                      rows={1}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label={t("campaign.start_date")}
                      value={watch("startDate")}
                      onChange={(date: Date | null) =>
                        setValue("startDate", date || new Date())
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.startDate,
                          helperText: errors.startDate?.message,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label={t("campaign.end_date")}
                      value={watch("endDate")}
                      onChange={(date: Date | null) =>
                        setValue("endDate", date || new Date())
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.endDate,
                          helperText: errors.endDate?.message,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="flex-end"
                    >
                      <Button variant="outlined" onClick={handleCloseForm}>
                        {t("buttons.cancel")}
                      </Button>
                      <Button type="submit" variant="primary">
                        {t("buttons.save")}
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            </FormContainer>
          )}

          <Box sx={campaignSx.listContainer}>
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} elevation={0}>
                <Box sx={{ mb: 2 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="start"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                      {campaign.title}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(campaign)}
                        sx={campaignSx.actionButton}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(campaign.id)}
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
                    sx={{ mb: 2 }}
                  >
                    {campaign.description}
                  </Typography>
                )}

                <Box sx={{ mt: 2 }}>
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
