export default function Sidebar() {
  return (
    <aside className="w-20 lg:w-64 bg-medical-dark text-white flex flex-col items-center lg:items-start lg:px-6 py-8 shadow-xl z-10">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-medical-dark font-bold text-xl shadow-sm">
          +
        </div>
        <h1 className="hidden lg:block text-xl font-bold tracking-wide">LinguaBridge</h1>
      </div>
      <nav className="flex flex-col gap-6 w-full mt-4">
        <button className="flex items-center justify-center lg:justify-start gap-4 text-white transition-colors w-full p-2 bg-white/10 rounded-lg cursor-pointer">
          <span className="text-2xl">📝</span>
          <span className="hidden lg:block font-medium">Intake</span>
        </button>
      </nav>
    </aside>
  );
}