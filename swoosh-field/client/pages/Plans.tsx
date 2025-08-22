import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

interface Plan {
  id: string;
  name: string;
  frequency: string;
  price: string;
  period: string;
}

const mockPlans: Plan[] = [
  {
    id: "1",
    name: "Plano Vôlei Pro",
    frequency: "2x semana",
    price: "R$300,00",
    period: "/semestre",
  },
  {
    id: "2",
    name: "Plano Vôlei Premium",
    frequency: "3x semana",
    price: "R$500,00",
    period: "/ano",
  },
  {
    id: "3",
    name: "Plano Vôlei Livre",
    frequency: "2x semana",
    price: "R$250,00",
    period: "/mês",
  },
];

export default function Plans() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlans = useMemo(() => {
    if (!searchTerm.trim()) return mockPlans;

    return mockPlans.filter(plan =>
      plan.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleCreatePlan = () => {
    navigate("/criar-plano");
  };
  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-4 max-w-md mx-auto gap-7 sm:max-w-lg md:max-w-2xl lg:max-w-4xl sm:px-8 md:px-12 lg:px-16 relative">
      <Navigation />

      {/* Title */}
      <h1 className="text-2xl font-bold text-[#202020] md:text-3xl lg:text-4xl">
        Planos
      </h1>

      {/* Search */}
      <div className="flex items-center gap-2 bg-[#F5F5F5] rounded-md px-3 py-3 md:px-4 md:py-4">
        <Search className="w-[13px] h-[13px] text-[#8E8E8E] md:w-4 md:h-4" />
        <input
          type="text"
          placeholder="Pesquisar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent text-xs text-[#8E8E8E] font-normal md:text-sm placeholder:text-[#8E8E8E] outline-none"
        />
      </div>

      {/* Plans List */}
      <div className="flex-1">
        {filteredPlans.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-[#8E8E8E] text-sm mb-2">Nenhum plano encontrado</p>
            <p className="text-[#8E8E8E] text-xs">Tente buscar por outro termo</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {filteredPlans.map((plan, index) => (
            <div key={plan.id} className="md:bg-gray-50 md:p-4 md:rounded-lg md:border md:border-gray-200">
              <div className="flex justify-between items-center md:flex-col md:items-start md:gap-4">
                {/* Plan Info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-1">
                    <span className="text-[10px] text-[#8E8E8E] font-normal md:text-sm">
                      {plan.name}
                    </span>
                    <span className="text-[10px] text-[#8E8E8E] font-normal md:text-sm">
                      {plan.frequency}
                    </span>
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-[21px] text-[#101010] font-normal md:text-3xl">
                      {plan.price}
                    </span>
                    <span className="text-[11px] text-[#8E8E8E] font-normal md:text-base">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Configuration Button */}
                <button className="flex items-center justify-center px-2.5 py-3 bg-white border border-[#E8E8E8] rounded-md shadow-[0_2px_2.2px_0_rgba(0,0,0,0.02)] md:w-full md:py-2">
                  <span className="text-xs text-[#1F1F1F] font-normal md:text-sm">
                    Configurações
                  </span>
                </button>
              </div>

              {/* Divider - only show if not last item on mobile */}
              {index < filteredPlans.length - 1 && (
                <div className="w-full h-px bg-[#DADADA] mt-5 md:hidden" />
              )}
            </div>
            ))}
          </div>
        )}
      </div>

      {/* New Plan Button */}
      <button
        onClick={handleCreatePlan}
        className="w-full bg-[#202020] text-white py-4 px-2.5 rounded-md text-sm font-medium mt-auto md:py-3 md:text-base lg:max-w-xs lg:self-center"
      >
        Novo Plano
      </button>
    </div>
  );
}
