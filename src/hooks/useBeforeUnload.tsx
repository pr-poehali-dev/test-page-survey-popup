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

      // Стандартное поведение браузера - показать встроенный диалог
      event.preventDefault();
      event.returnValue = message;

      // Вызываем колбэк для показа нашей модалки
      // Но модалка покажется только если пользователь останется на странице
      setTimeout(() => {
        if (onBeforeUnload && enabledRef.current) {
          onBeforeUnload();
        }
      }, 100);

      return message;
    };

    const handleVisibilityChange = () => {
      // Если страница становится скрытой и включена защита
      if (document.hidden && enabledRef.current && onBeforeUnload) {
        onBeforeUnload();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [onBeforeUnload, message]);

  // Отслеживание попыток навигации
  useEffect(() => {
    if (!enabled || !onNavigationAttempt) return;

    const handlePopState = (event: PopStateEvent) => {
      if (enabledRef.current) {
        event.preventDefault();
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
