import { useMemo, memo, useEffect } from "react";
import { Grid, TextField, MenuItem, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Controller } from "react-hook-form";
import { useTranslation } from "@app/providers/I18nProvider";
import { useCampaign } from "../contexts/CampaignContext";
import { isScheduledExecution } from "../utils/formHelpers";

export const GeneralTab = memo(() => {
  const { t } = useTranslation();
  const {
    register,
    control,
    watch,
    updateField,
    formState: { errors },
    bootstrapData,
  } = useCampaign();

  const executionType = watch("executionType");
  const messageType = watch("messageType");
  const isScheduled = useMemo(
    () => isScheduledExecution(executionType),
    [executionType]
  );

  const getErrorMessage = (error: any): string => {
    return typeof error?.message === "string" ? error.message : "";
  };

  const sources = bootstrapData?.sources || [];
  const executionTypes = bootstrapData?.executionTypes || [];
  const groups = bootstrapData?.groups || [];
  const channels = bootstrapData?.channels || [];
  const messageTypes = bootstrapData?.messageTypes || [];
  const templates = bootstrapData?.templates || {};

  const translatedSourceOptions = useMemo(
    () =>
      sources.map((option) => ({
        ...option,
        displayLabel: t(option.label),
      })),
    [sources, t]
  );

  const translatedExecutionTypeOptions = useMemo(
    () =>
      executionTypes.map((option) => ({
        ...option,
        displayLabel: t(option.label),
      })),
    [executionTypes, t]
  );

  const translatedGroupOptions = useMemo(
    () =>
      groups.map((option) => ({
        ...option,
        displayLabel: t(option.label),
      })),
    [groups, t]
  );

  const translatedChannelOptions = useMemo(
    () =>
      channels.map((option) => ({
        ...option,
        displayLabel: t(option.label),
      })),
    [channels, t]
  );

  const translatedMessageTypeOptions = useMemo(
    () =>
      messageTypes.map((option) => ({
        ...option,
        displayLabel: t(option.label),
      })),
    [messageTypes, t]
  );

  const availableTemplates = useMemo(() => {
    return messageType ? templates[messageType] || [] : [];
  }, [messageType, templates]);

  const translatedTemplateOptions = useMemo(
    () =>
      availableTemplates.map((option) => ({
        ...option,
        displayLabel: t(option.label),
      })),
    [availableTemplates, t]
  );

  useEffect(() => {
    if (
      messageType &&
      !availableTemplates.find(
        (template) => template.value === watch("template")
      )
    ) {
      updateField("template", "");
    }
  }, [messageType, updateField, watch, availableTemplates]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("fields.title")}
              placeholder={t("placeholders.title")}
              {...register("title")}
              error={!!errors.title}
              helperText={getErrorMessage(errors.title)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("fields.description")}
              placeholder={t("placeholders.description")}
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
                  {translatedSourceOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.displayLabel}
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
                  {translatedExecutionTypeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.displayLabel}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {isScheduled && (
            <>
              <Grid item xs={12} md={6}>
                <Controller
                  name="scheduledDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label={t("fields.scheduledDate")}
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          placeholder: t("placeholders.scheduledDate"),
                          error: !!errors.scheduledDate,
                          helperText: getErrorMessage(errors.scheduledDate),
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
                      label={t("fields.scheduledTime")}
                      value={
                        field.value
                          ? new Date(`1970-01-01T${field.value}`)
                          : null
                      }
                      onChange={(time) => {
                        if (time) {
                          const timeString = time.toTimeString().slice(0, 5);
                          field.onChange(timeString);
                        } else {
                          field.onChange("");
                        }
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          placeholder: t("placeholders.scheduledTime"),
                          error: !!errors.scheduledTime,
                          helperText: getErrorMessage(errors.scheduledTime),
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
                  label={t("fields.group")}
                  placeholder={t("placeholders.group")}
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={!!errors.group}
                  helperText={getErrorMessage(errors.group)}
                >
                  {translatedGroupOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.displayLabel}
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
                  label={t("fields.channel")}
                  placeholder={t("placeholders.channel")}
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={!!errors.channel}
                  helperText={getErrorMessage(errors.channel)}
                >
                  {translatedChannelOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.displayLabel}
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
                  label={t("fields.messageType")}
                  placeholder={t("placeholders.messageType")}
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={!!errors.messageType}
                  helperText={getErrorMessage(errors.messageType)}
                >
                  {translatedMessageTypeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.displayLabel}
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
                  label={t("fields.template")}
                  placeholder={t("placeholders.template")}
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={!!errors.template}
                  helperText={getErrorMessage(errors.template)}
                  disabled={!messageType || availableTemplates.length === 0}
                >
                  {translatedTemplateOptions.map((template) => (
                    <MenuItem key={template.value} value={template.value}>
                      {template.displayLabel}
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
