import { memo, useCallback, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Paper,
  List,
  ListItem,
  Alert,
} from "@mui/material";
import { UploadFile, Person, Delete, GetApp } from "@mui/icons-material";
import { useCampaign } from "../contexts/CampaignContext";
import { useTranslation } from "@app/providers/I18nProvider";

export const PersonsTab = memo(() => {
  const { t } = useTranslation();
  const {
    watch,
    setValue,
    formState: { errors },
  } = useCampaign();

  const source = watch("source");
  const persons = watch("persons") || [];
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const getErrorMessage = (error: any): string => {
    return typeof error?.message === "string" ? error.message : "";
  };

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        const validTypes = [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
          "text/csv",
        ];

        if (!validTypes.includes(selectedFile.type)) {
          return;
        }

        setValue("filePath", selectedFile.name, { shouldValidate: true });
        setUploadedFile(selectedFile);
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setUploadedFile(null);
    setValue("filePath", null, { shouldValidate: true });
  }, [setValue]);

  const handleAddPerson = useCallback(() => {
    const newPerson = {
      id: Date.now().toString(),
      name: "",
      email: "",
      phone: "",
    };
    setValue("persons", [...persons, newPerson], { shouldValidate: true });
  }, [persons, setValue]);

  const handleRemovePerson = useCallback(
    (index: number) => {
      const updatedPersons = persons.filter((_, i) => i !== index);
      setValue("persons", updatedPersons, { shouldValidate: true });
    },
    [persons, setValue]
  );

  const handlePersonChange = useCallback(
    (index: number, field: string, value: string) => {
      const updatedPersons = [...persons];
      updatedPersons[index] = { ...updatedPersons[index], [field]: value };
      setValue("persons", updatedPersons, { shouldValidate: true });
    },
    [persons, setValue]
  );

  const downloadTemplate = useCallback(() => {
    const csvContent =
      "name,email,phone\nJohn Doe,john@example.com,+1234567890\nJane Smith,jane@example.com,+0987654321";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "campaign_persons_template.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, []);

  const isExternalSource = source === "EXTERNA";

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {t("campaigns.tabs.persons")}
      </Typography>

      <Grid container spacing={3}>
        {isExternalSource ? (
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              {t("campaigns.persons_tab.file_upload.title")}
            </Typography>

            <Alert severity="info" sx={{ mb: 2 }}>
              {t("campaigns.persons_tab.file_upload.info")}
            </Alert>

            <Box sx={{ mb: 2 }}>
              <Button
                variant="outlined"
                startIcon={<GetApp />}
                onClick={downloadTemplate}
                sx={{ mb: 2 }}
              >
                {t("campaigns.persons_tab.file_upload.download_template")}
              </Button>
            </Box>

            <Paper
              sx={{
                p: 3,
                border: "2px dashed",
                borderColor: errors.filePath ? "error.main" : "grey.300",
                backgroundColor: errors.filePath ? "error.light" : "grey.50",
                textAlign: "center",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "grey.100",
                },
              }}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <input
                id="file-upload"
                type="file"
                accept=".xlsx,.xls,.csv"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />

              <UploadFile sx={{ fontSize: 48, color: "grey.400", mb: 1 }} />

              {uploadedFile ? (
                <Box>
                  <Typography variant="body1" color="primary" gutterBottom>
                    {uploadedFile.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<Delete />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                  >
                    {t("campaigns.persons_tab.file_upload.remove")}
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Typography variant="body1" gutterBottom>
                    {t("campaigns.persons_tab.file_upload.drag_drop")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("campaigns.persons_tab.file_upload.supported_formats")}
                  </Typography>
                </Box>
              )}
            </Paper>

            {errors.filePath && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {getErrorMessage(errors.filePath)}
              </Typography>
            )}
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="subtitle1">
                {t("campaigns.persons_tab.manual_entry.title")}
              </Typography>
              <Button
                variant="contained"
                startIcon={<Person />}
                onClick={handleAddPerson}
              >
                {t("campaigns.persons_tab.manual_entry.add_person")}
              </Button>
            </Box>

            {persons.length === 0 ? (
              <Alert severity="info">
                {t("campaigns.persons_tab.manual_entry.no_persons")}
              </Alert>
            ) : (
              <List>
                {persons.map((person: any, index: number) => (
                  <ListItem key={person.id || index}>
                    <Paper sx={{ p: 2, width: "100%" }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            label={t("campaigns.persons_tab.fields.name")}
                            value={person.name || ""}
                            onChange={(e) =>
                              handlePersonChange(index, "name", e.target.value)
                            }
                            placeholder={t(
                              "campaigns.persons_tab.placeholders.name"
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            size="small"
                            type="email"
                            label={t("campaigns.persons_tab.fields.email")}
                            value={person.email || ""}
                            onChange={(e) =>
                              handlePersonChange(index, "email", e.target.value)
                            }
                            placeholder={t(
                              "campaigns.persons_tab.placeholders.email"
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            label={t("campaigns.persons_tab.fields.phone")}
                            value={person.phone || ""}
                            onChange={(e) =>
                              handlePersonChange(index, "phone", e.target.value)
                            }
                            placeholder={t(
                              "campaigns.persons_tab.placeholders.phone"
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<Delete />}
                            onClick={() => handleRemovePerson(index)}
                            fullWidth
                          >
                            {t("campaigns.persons_tab.manual_entry.remove")}
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </ListItem>
                ))}
              </List>
            )}

            {errors.persons && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {getErrorMessage(errors.persons)}
              </Typography>
            )}
          </Grid>
        )}

        <Grid item xs={12}>
          <Paper sx={{ p: 2, backgroundColor: "grey.50" }}>
            <Typography variant="subtitle2" gutterBottom>
              {t("campaigns.persons_tab.summary.title")}
            </Typography>
            <Typography variant="body2">
              {isExternalSource
                ? uploadedFile
                  ? t("campaigns.persons_tab.summary.file_selected", {
                      filename: uploadedFile.name,
                    })
                  : t("campaigns.persons_tab.summary.no_file")
                : t("campaigns.persons_tab.summary.persons_count", {
                    count: persons.length,
                  })}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
});

export default PersonsTab;
