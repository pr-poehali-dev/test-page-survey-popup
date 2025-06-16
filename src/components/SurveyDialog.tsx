import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SurveyDialogProps {
  open: boolean;
  onClose: () => void;
  onTakeSurvey: () => void;
  onSkip: () => void;
}

const SurveyDialog = ({
  open,
  onClose,
  onTakeSurvey,
  onSkip,
}: SurveyDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">
            Помочь нам стать лучше?
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Пройдите короткий опрос — это займёт всего минуту и поможет улучшить
            сервис для всех.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-6">
          <Button
            onClick={onTakeSurvey}
            className="w-full bg-black hover:bg-gray-800 text-white"
          >
            Пройти опрос
          </Button>
          <Button
            onClick={onSkip}
            variant="ghost"
            className="w-full text-gray-600 hover:text-gray-800"
          >
            Может быть позже
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SurveyDialog;
