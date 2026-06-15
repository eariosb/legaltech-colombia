import Link from "next/link";
import { CourseShell } from "@/components/layout/CourseShell";
import { Icon } from "@/components/icons/Icon";

export default function NotFound() {
  return (
    <CourseShell>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-6">⚖️</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Página no encontrada</h1>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            El módulo que buscas no existe o fue movido a otra ruta.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-blue-900 transition-colors"
          >
            <Icon name="arrow-left" size={16} />
            Volver al inicio
          </Link>
        </div>
      </div>
    </CourseShell>
  );
}
