import { useState } from "react";
import MinimalHero from "@/components/MinimalHero";
import SurveyDialog from "@/components/SurveyDialog";
import useBeforeUnload from "@/hooks/useBeforeUnload";

const Index = () => {
  const [showSurveyDialog, setShowSurveyDialog] = useState(false);

  useBeforeUnload({
    message: "Вы действительно хотите покинуть страницу?",
    onBeforeUnload: () => {
      console.log("Пользователь пытается покинуть страницу");
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

  return (
    <>
      <MinimalHero />
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
