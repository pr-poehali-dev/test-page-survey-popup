import { useEffect } from "react";

interface UseBeforeUnloadProps {
  onBeforeUnload?: () => void;
  message?: string;
}

const useBeforeUnload = ({
  onBeforeUnload,
  message = "Вы уверены, что хотите покинуть страницу?",
}: UseBeforeUnloadProps) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Вызываем callback если он есть
      if (onBeforeUnload) {
        onBeforeUnload();
      }

      // Современные браузеры требуют именно такой подход
      event.preventDefault();
      // Возвращаем пустую строку - браузер покажет стандартное сообщение
      return (event.returnValue = "");
    };

    // Также добавляем обработчик для события pagehide
    const handlePageHide = (event: PageTransitionEvent) => {
      if (!event.persisted && onBeforeUnload) {
        onBeforeUnload();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [onBeforeUnload, message]);
};

export default useBeforeUnload;
