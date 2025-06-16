import { Button } from "@/components/ui/button";

interface MinimalHeroProps {
  onTogglePreventClose: () => void;
  preventClose: boolean;
}

const MinimalHero = ({
  onTogglePreventClose,
  preventClose,
}: MinimalHeroProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Тест защиты от закрытия
        </h1>
        <Button
          onClick={onTogglePreventClose}
          variant={preventClose ? "destructive" : "default"}
          size="lg"
        >
          {preventClose ? "Отключить защиту" : "Включить защиту от закрытия"}
        </Button>
        <p className="mt-4 text-sm text-gray-600">
          {preventClose
            ? "Попробуйте закрыть вкладку - появится предупреждение"
            : "Нажмите кнопку, чтобы включить защиту"}
        </p>
      </div>
    </div>
  );
};

export default MinimalHero;
