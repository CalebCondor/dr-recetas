import { Button } from "@/components/ui/button";
export default function Header() {
  return (
    <header className="w-full relative z-50">
      <div className="w-full px-6 md:px-12 lg:px-[8%] py-8 flex items-center justify-between">
        <img src="/logo.png" alt="Dr. Recetas" className="h-10" />
        <nav className="hidden md:flex items-center gap-10">
          <a
            href="#servicios"
            className="text-slate-600 hover:text-teal-800 font-medium transition-colors text-sm"
          >
            Servicios
          </a>
          <a
            href="#descuentos"
            className="text-slate-600 hover:text-teal-800 font-medium transition-colors text-sm"
          >
            Descuentos
          </a>
          <a
            href="#nosotros"
            className="text-slate-600 hover:text-teal-800 font-medium transition-colors text-sm"
          >
            Nosotros
          </a>
          <a
            href="#membresias"
            className="text-slate-600 hover:text-teal-800 font-medium transition-colors text-sm"
          >
            Membresías
          </a>
          <Button className="px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm text-slate-700 font-semibold border-none shadow-sm hover:bg-white transition-colors text-sm">
            Iniciar sesión
          </Button>
        </nav>
      </div>
    </header>
  );
}
