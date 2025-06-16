const MinimalHero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-2xl mx-auto text-center px-6">
        <h1 className="text-5xl font-light text-gray-900 mb-6 tracking-tight">
          Простота
        </h1>
        <p className="text-xl text-gray-600 font-light leading-relaxed">
          Минималистичный дизайн — это не отсутствие деталей,
          <br />а присутствие только самого важного.
        </p>
        <div className="mt-12 h-px bg-gray-200 w-24 mx-auto"></div>
      </div>
    </div>
  );
};

export default MinimalHero;
