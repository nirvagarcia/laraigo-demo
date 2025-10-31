import { ThemeProvider, I18nProvider } from "@app/providers";
import { ToastProvider } from "@shared/components/ui";
import { AppRoutes } from "@app/routes/AppRoutes";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <I18nProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </I18nProvider>
    </ThemeProvider>
  );
};

export default App;
