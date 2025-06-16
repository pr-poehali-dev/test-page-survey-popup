import { useEffect, useRef } from "react";

interface UseBeforeUnloadProps {
  enabled?: boolean;
  onBeforeUnload?: () => void;
  message?: string;
}

const useBeforeUnload = ({
  enabled = false,
  onBeforeUnload,
  message = "Вы уверены, что хотите покинуть страницу?",
}: UseBeforeUnloadProps) => {
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!enabledRef.current) return;

      if (onBeforeUnload) {
        onBeforeUnload();
      }

      // Устанавливаем returnValue для показа диалога
      event.returnValue = message;
      event.preventDefault();

      // Возвращаем сообщение для старых браузеров
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [message, onBeforeUnload]);
};

export default useBeforeUnload;
