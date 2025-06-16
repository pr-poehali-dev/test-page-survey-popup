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

      // Предотвращаем закрытие и показываем предупреждение
      event.preventDefault();
      event.returnValue = message; // Для старых браузеров
      return message; // Для современных браузеров
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [onBeforeUnload, message]);
};

export default useBeforeUnload;
