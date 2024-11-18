import React from "react";
import { Lead } from "./types";
import { Calendar, MapPin, Users, Truck, Clock } from "lucide-react";
import { parseISO, addDays } from "date-fns";
import { format } from "date-fns-tz";

interface LeadCardProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
}

export default function LeadCard({ lead, onClick }: LeadCardProps) {
  const getStatusColor = (etapa: string) => {
    switch (etapa.toLowerCase()) {
      case "sin contactar":
        return "bg-gray-100";
      case "calificado para comprar":
        return "bg-blue-100";
      case "cotizacion enviada":
        return "bg-yellow-100";
      case "pendiente de cierre":
        return "bg-orange-100";
      case "cierre ganado":
        return "bg-green-100";
      case "cierre perdido":
        return "bg-red-100";
      case "descalificado":
        return "bg-purple-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div
      className={`p-4 mb-3 rounded-lg shadow-sm border border-gray-200 ${getStatusColor(
        lead.etapa
      )}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3
          className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
          onClick={(e) => {
            e.stopPropagation();
            onClick(lead);
          }}
        >
          {lead.nombre}
        </h3>
        <span className="text-xs text-gray-500">#{lead.id}</span>
      </div>

      {lead.empresa && (
        <p className="text-sm text-gray-600 mb-2">{lead.empresa}</p>
      )}

      <div className="flex items-center text-sm text-gray-600 mb-2">
        <MapPin className="w-4 h-4 mr-1" />
        <span className="truncate">
          {lead.origen} → {lead.destino}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{format(addDays(parseISO(lead.fecha), 1), "dd MMM yyyy")}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span>{lead.hora}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          <span>{lead.pasajeros}</span>
        </div>
        <div className="flex items-center">
          <Truck className="w-4 h-4 mr-1" />
          <span>{lead.tipoVehiculo}</span>
        </div>
      </div>
    </div>
  );
}
