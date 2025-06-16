import { useEffect, useState } from "react";

interface UseBeforeUnloadProps {
  onBeforeUnload: () => void;
}

const useBeforeUnload = ({ onBeforeUnload }: UseBeforeUnloadProps) => {
  const [shouldShowDialog, setShouldShowDialog] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      setShouldShowDialog(true);
      onBeforeUnload();
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [onBeforeUnload]);

  return { shouldShowDialog, setShouldShowDialog };
};

export default useBeforeUnload;
