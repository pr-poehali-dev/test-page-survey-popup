import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface UseBeforeUnloadProps {
  enabled?: boolean;
  onBeforeUnload?: () => void;
  onNavigationAttempt?: () => void;
  message?: string;
}

const useBeforeUnload = ({
  enabled = false,
  onBeforeUnload,
  onNavigationAttempt,
  message = "Вы уверены, что хотите покинуть страницу?",
}: UseBeforeUnloadProps) => {
  const enabledRef = useRef(enabled);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  // Отслеживание попыток закрыть браузер/вкладку
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!enabledRef.current) return;

      if (onBeforeUnload) {
        onBeforeUnload();
      }

      event.returnValue = message;
      event.preventDefault();
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [message, onBeforeUnload]);

  // Отслеживание попыток навигации
  useEffect(() => {
    if (!enabled || !onNavigationAttempt) return;

    const handlePopState = () => {
      if (enabledRef.current) {
        onNavigationAttempt();
        // Возвращаем пользователя обратно
        window.history.pushState(null, "", location.pathname);
      }
    };

    // Блокируем кнопку "Назад"
    window.history.pushState(null, "", location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [enabled, onNavigationAttempt, location.pathname]);
};

export default useBeforeUnload;
