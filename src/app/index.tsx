import { ThemeProvider, I18nProvider } from "@app/providers";
import { AppRoutes } from "@app/routes/AppRoutes";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AppRoutes />
      </I18nProvider>
    </ThemeProvider>
  );
};

export default App;
