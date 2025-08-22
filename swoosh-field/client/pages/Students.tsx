import { Users } from "lucide-react";
import Navigation from "../components/Navigation";

export default function Students() {
  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-4 max-w-md mx-auto gap-7 sm:max-w-lg md:max-w-2xl lg:max-w-4xl sm:px-8 md:px-12 lg:px-16 relative">
      <Navigation />

      {/* Title */}
      <h1 className="text-2xl font-bold text-[#202020] md:text-3xl lg:text-4xl">
        Alunos
      </h1>

      {/* Placeholder Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
        <Users className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-lg font-medium text-gray-600 mb-2">
          Página em Desenvolvimento
        </h2>
        <p className="text-gray-500 text-sm max-w-sm">
          A funcionalidade de gestão de alunos estará disponível em breve. 
          Continue explorando outras seções do app.
        </p>
      </div>

      {/* New Student Button */}
      <button className="w-full bg-[#202020] text-white py-4 px-2.5 rounded-md text-sm font-medium mt-auto md:py-3 md:text-base lg:max-w-xs lg:self-center">
        Novo Aluno
      </button>
    </div>
  );
}
