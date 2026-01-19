import { Button } from "@/components/ui/button";
export default function Header() {
  return (
    <header className="w-full border-b border-slate-100">
      <div className="w-full px-6 md:px-12 lg:px-[5%] py-4 flex items-center justify-between">
        <img src="/logo.png" alt="Dr. Recetas" className="h-8" />
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#servicios"
            className="text-slate-700 hover:text-teal-700 font-medium transition-colors"
          >
            Servicios
          </a>
          <a
            href="#descuentos"
            className="text-slate-700 hover:text-teal-700 font-medium transition-colors"
          >
            Descuentos
          </a>
          <a
            href="#nosotros"
            className="text-slate-700 hover:text-teal-700 font-medium transition-colors"
          >
            Nosotros
          </a>
          <a
            href="#membresias"
            className="text-slate-700 hover:text-teal-700 font-medium transition-colors"
          >
            Membresías
          </a>
          <Button className="px-4 py-2 rounded-lg bg-white text-slate-700 font-medium border border-slate-200 hover:bg-slate-50 transition-colors">
            Iniciar sesión
          </Button>
        </nav>
      </div>
    </header>
  );
}
