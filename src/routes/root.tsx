import { Outlet, useNavigate } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      <nav className="max-w-[100px] md:max-w-[200px] bg-slate-900 text-slate-200 flex flex-col gap-8 p-4">
        <h3 className="font-bold text-xl">Ricky and Morty</h3>
        <button
          className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm hover:shadow-cyan-600"
          onClick={() => navigate("/contact")}
        >
          <span>📞</span>
          <span className="hidden md:inline-block ml-2">Contact</span>
        </button>
      </nav>
      <Outlet />
    </div>
  );
}
