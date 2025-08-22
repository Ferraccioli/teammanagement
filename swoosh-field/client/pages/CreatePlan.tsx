import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  frequency: string;
  period: string;
  recurrence: string;
  value: string;
}

export default function CreatePlan() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "Plano Vôlei Pro",
    frequency: "5 vezes",
    period: "Por semana",
    recurrence: "Mensal",
    value: "",
  });

  const [isFrequencyOpen, setIsFrequencyOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const frequencyRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);

  const frequencyOptions = ["Todos os dias", "1 vez", "2 vezes", "3 vezes", "4 vezes", "5 vezes", "6 vezes", "7 vezes"];
  const periodOptions = ["Por semana", "Por mês", "Por ano"];
  const recurrenceOptions = ["Mensal", "Trimestral", "Semestral", "Anual"];

  const getMaxFrequency = () => {
    switch (formData.period) {
      case "Por semana": return 7;
      case "Por mês": return 31;
      case "Por ano": return 365;
      default: return 7;
    }
  };

  const getValidFrequencyOptions = () => {
    const maxFreq = getMaxFrequency();
    return frequencyOptions.filter(option => {
      if (option === "Todos os dias") {
        return formData.period === "Por semana" || formData.period === "Por mês";
      }
      const num = parseInt(option.split(" ")[0]);
      return num <= maxFreq;
    });
  };

  const handleFrequencyChange = (frequency: string) => {
    setFormData(prev => ({ ...prev, frequency }));
    setIsFrequencyOpen(false);
  };

  const handlePeriodChange = (period: string) => {
    setFormData(prev => ({ ...prev, period }));
    setIsPeriodOpen(false);

    // Reset frequency if current is invalid for new period
    const newFormData = { ...formData, period };
    const maxFreq = period === "Por semana" ? 7 : period === "Por mês" ? 31 : 365;

    if (formData.frequency !== "Todos os dias") {
      const currentFreqNum = parseInt(formData.frequency.split(" ")[0]);
      if (currentFreqNum > maxFreq) {
        setFormData(prev => ({ ...prev, period, frequency: "1 vez" }));
        return;
      }
    } else if (period === "Por ano") {
      // "Todos os dias" not valid for "Por ano"
      setFormData(prev => ({ ...prev, period, frequency: "1 vez" }));
      return;
    }

    setFormData(prev => ({ ...prev, period }));
  };

  const handleRecurrenceChange = (recurrence: string) => {
    setFormData(prev => ({ ...prev, recurrence }));
  };

  const handleSubmit = () => {
    // TODO: Implement plan creation logic with Supabase
    console.log("Creating plan:", formData);
    navigate("/");
  };

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  const formatCurrency = (value: string) => {
    // Remove tudo que não for número
    const numericValue = value.replace(/[^\d]/g, "");

    if (!numericValue) return "";

    // Converte para número e divide por 100 para ter centavos
    const number = parseInt(numericValue) / 100;

    // Formata como moeda brasileira
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(number);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setFormData(prev => ({ ...prev, value: formatted }));
  };

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (frequencyRef.current && !frequencyRef.current.contains(event.target as Node)) {
        setIsFrequencyOpen(false);
      }
      if (periodRef.current && !periodRef.current.contains(event.target as Node)) {
        setIsPeriodOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isExiting ? "100%" : 0 }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
      className="flex flex-col min-h-screen bg-white px-6 py-4 max-w-md mx-auto gap-7 sm:max-w-lg md:max-w-2xl lg:max-w-4xl sm:px-8 md:px-12 lg:px-16"
    >
      {/* Header */}
      <button onClick={handleBack} className="self-start">
        <ArrowLeft className="w-6 h-6 text-[#202020]" />
      </button>

      {/* Title */}
      <h1 className="text-2xl font-bold text-[#202020]">
        Criar Plano
      </h1>

      {/* Basic Information Section */}
      <div className="flex flex-col gap-7">
        <div className="text-[11px] text-[#8E8E8E] font-medium">
          Informações Básicas
        </div>

        {/* Name Field */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#202020]">
            Nome
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="flex items-center px-3 py-3 text-xs text-[#202020] bg-white border border-[#DADADA] rounded-md outline-none focus:border-[#202020]"
          />
        </div>

        {/* Frequency Section */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#202020]">
            Frequência das aulas
          </label>
          <div className="flex gap-2">
            {/* Frequency Dropdown */}
            <div className="flex-1 relative" ref={frequencyRef}>
              <button
                onClick={() => setIsFrequencyOpen(!isFrequencyOpen)}
                className="w-full flex items-center justify-between px-3 py-3 text-xs text-[#202020] bg-white border border-[#DADADA] rounded-md"
              >
                {formData.frequency}
                <ChevronDown className="w-[13px] h-[13px] text-[#3C3C3C]" />
              </button>
              {isFrequencyOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#DADADA] rounded-md shadow-lg z-10">
                  {getValidFrequencyOptions().map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFrequencyChange(option)}
                      className="w-full px-3 py-2 text-left text-xs text-[#202020] hover:bg-gray-50"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Period Dropdown */}
            <div className="flex-1 relative" ref={periodRef}>
              <button
                onClick={() => setIsPeriodOpen(!isPeriodOpen)}
                className="w-full flex items-center justify-between px-3 py-3 text-xs text-[#202020] bg-white border border-[#DADADA] rounded-md"
              >
                {formData.period}
                <ChevronDown className="w-[13px] h-[13px] text-[#3C3C3C]" />
              </button>
              {isPeriodOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#DADADA] rounded-md shadow-lg z-10">
                  {periodOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handlePeriodChange(option)}
                      className="w-full px-3 py-2 text-left text-xs text-[#202020] hover:bg-gray-50"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#DADADA]" />

      {/* Billing Section */}
      <div className="flex flex-col gap-7">
        <div className="text-[11px] text-[#8E8E8E] font-medium">
          Cobrança
        </div>

        {/* Recurrence Section */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#202020]">
            Recorrência
          </label>
          <div className="flex gap-2">
            {recurrenceOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleRecurrenceChange(option)}
                className={`flex-1 px-3 py-3 text-xs rounded-md border ${
                  formData.recurrence === option
                    ? "border-[#202020] text-[#202020] font-bold"
                    : "border-[#DADADA] text-[#DADADA] bg-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Value Field */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#202020]">
            Valor
          </label>
          <input
            type="text"
            value={formData.value}
            onChange={handleValueChange}
            placeholder="R$ 0,00"
            className="flex items-center px-3 py-3 text-xs bg-white border border-[#DADADA] rounded-md outline-none focus:border-[#202020] placeholder:text-[#DADADA]"
          />
        </div>
      </div>

      {/* Create Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#202020] text-white py-4 px-2.5 rounded-md text-sm font-medium mt-auto shadow-[0_2px_2.2px_0_rgba(0,0,0,0.02)]"
      >
        Criar Plano
      </button>
    </motion.div>
  );
}
