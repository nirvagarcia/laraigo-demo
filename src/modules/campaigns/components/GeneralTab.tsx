import { memo } from "react";
import { Grid, TextField, MenuItem, Typography, Box } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Controller } from "react-hook-form";
import { useCampaign } from "../contexts/CampaignContext";
import { useTranslation } from "@app/providers/I18nProvider";
import { SelectOption } from "../types/selectOption";

export const GeneralTab = memo(() => {
  const { t } = useTranslation();
  const {
    register,
    control,
    watch,
    formState: { errors },
    bootstrapData,
  } = useCampaign();

  const executionType = watch("executionType");
  const messageType = watch("messageType");

  const getErrorMessage = (error: any): string => {
    return typeof error?.message === "string" ? error.message : "";
  };

  const getTemplateOptions = (): SelectOption[] => {
    if (!messageType || !bootstrapData.templates[messageType]) {
      return [];
    }
    return bootstrapData.templates[messageType];
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {t("campaigns.tabs.general")}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("campaigns.fields.title")}
              placeholder={t("campaigns.placeholders.title")}
              {...register("title")}
              error={!!errors.title}
              helperText={getErrorMessage(errors.title)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label={t("campaigns.fields.description")}
              placeholder={t("campaigns.placeholders.description")}
              {...register("description")}
              error={!!errors.description}
              helperText={getErrorMessage(errors.description)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label={t("campaigns.fields.startDate")}
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date?.toISOString() || "")}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.startDate,
                      helperText: getErrorMessage(errors.startDate),
                      placeholder: t("campaigns.placeholders.startDate"),
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
                  label={t("campaigns.fields.endDate")}
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date?.toISOString() || null)
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.endDate,
                      helperText: getErrorMessage(errors.endDate),
                      placeholder: t("campaigns.placeholders.endDate"),
                    },
                  }}
                />
              )}
            />
          </Grid>{" "}
          <Grid item xs={12} md={6}>
            <Controller
              name="source"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  select
                  label={t("campaigns.fields.source")}
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={!!errors.source}
                  helperText={getErrorMessage(errors.source)}
                  placeholder={t("campaigns.placeholders.source")}
                >
                  {bootstrapData.sources.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
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
                  label={t("campaigns.fields.executionType")}
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={!!errors.executionType}
                  helperText={getErrorMessage(errors.executionType)}
                  placeholder={t("campaigns.placeholders.executionType")}
                >
                  {bootstrapData.executionTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          {executionType === "Programada" && (
            <>
              <Grid item xs={12} md={6}>
                <Controller
                  name="scheduledDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label={t("campaigns.fields.scheduledDate")}
                      value={field.value ? new Date(field.value) : null}
                      onChange={(date) =>
                        field.onChange(date?.toISOString() || null)
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.scheduledDate,
                          helperText: getErrorMessage(errors.scheduledDate),
                          placeholder: t(
                            "campaigns.placeholders.scheduledDate"
                          ),
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="scheduledTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      label={t("campaigns.fields.scheduledTime")}
                      value={
                        field.value
                          ? new Date(`1970-01-01T${field.value}`)
                          : null
                      }
                      onChange={(time) => {
                        if (time) {
                          const hours = time
                            .getHours()
                            .toString()
                            .padStart(2, "0");
                          const minutes = time
                            .getMinutes()
                            .toString()
                            .padStart(2, "0");
                          field.onChange(`${hours}:${minutes}`);
                        } else {
                          field.onChange("");
                        }
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.scheduledTime,
                          helperText: getErrorMessage(errors.scheduledTime),
                          placeholder: t(
                            "campaigns.placeholders.scheduledTime"
                          ),
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} md={6}>
            <Controller
              name="group"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  select
                  label={t("campaigns.fields.group")}
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={!!errors.group}
                  helperText={getErrorMessage(errors.group)}
                  placeholder={t("campaigns.placeholders.group")}
                >
                  {bootstrapData.groups.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="channel"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  select
                  label={t("campaigns.fields.channel")}
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={!!errors.channel}
                  helperText={getErrorMessage(errors.channel)}
                  placeholder={t("campaigns.placeholders.channel")}
                >
                  {bootstrapData.channels.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="messageType"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  select
                  label={t("campaigns.fields.messageType")}
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={!!errors.messageType}
                  helperText={getErrorMessage(errors.messageType)}
                  placeholder={t("campaigns.placeholders.messageType")}
                >
                  {bootstrapData.messageTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="template"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  select
                  label={t("campaigns.fields.template")}
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={!!errors.template}
                  helperText={getErrorMessage(errors.template)}
                  placeholder={t("campaigns.placeholders.template")}
                  disabled={!messageType}
                >
                  {getTemplateOptions().map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
});

export default GeneralTab;
