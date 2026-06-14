export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AD</span>
          </div>
          <span className="text-gray-900 font-bold text-lg">AnalyticsPro</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Welcome back</span>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </nav>
  );
}
