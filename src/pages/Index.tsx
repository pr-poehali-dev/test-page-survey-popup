import { useState } from "react";
import MinimalHero from "@/components/MinimalHero";
import SurveyDialog from "@/components/SurveyDialog";
import useBeforeUnload from "@/hooks/useBeforeUnload";

const Index = () => {
  const [showSurveyDialog, setShowSurveyDialog] = useState(false);
  const [preventClose, setPreventClose] = useState(false);

  useBeforeUnload({
    enabled: preventClose,
    message: "Вы действительно хотите покинуть страницу?",
    onBeforeUnload: () => {
      console.log("Пользователь пытается закрыть браузер");
    },
    onNavigationAttempt: () => {
      console.log("Пользователь пытается навигацию");
      setShowSurveyDialog(true);
    },
  });

  const handleTakeSurvey = () => {
    setShowSurveyDialog(false);
    // Здесь можно добавить переход на страницу опроса
    window.open("https://forms.gle/example", "_blank");
  };

  const handleSkipSurvey = () => {
    setShowSurveyDialog(false);
  };

  const handleCloseDialog = () => {
    setShowSurveyDialog(false);
  };

  const togglePreventClose = () => {
    setPreventClose(!preventClose);
  };

  return (
    <>
      <MinimalHero
        onTogglePreventClose={togglePreventClose}
        preventClose={preventClose}
      />
      <SurveyDialog
        open={showSurveyDialog}
        onClose={handleCloseDialog}
        onTakeSurvey={handleTakeSurvey}
        onSkip={handleSkipSurvey}
      />
    </>
  );
};

export default Index;
