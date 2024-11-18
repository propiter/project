import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, RefreshCw, Plus } from "lucide-react";
import KanbanBoard from "./crm/KanbanBoard";
import LeadModal from "./crm/LeadModal";
import { Lead, Stage } from "./crm/types";

export default function AdminDashboard() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [showNewLeadModal, setShowNewLeadModal] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchLeads();
  }, [navigate]);

  const fetchLeads = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch("http://localhost:3000/api/leads", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch leads");

      const data = await response.json();
      // Sort leads by fechaActualizacion in descending order
      const sortedLeads = data.sort(
        (a: Lead, b: Lead) =>
          new Date(b.fechaActualizacion).getTime() -
          new Date(a.fechaActualizacion).getTime()
      );
      setLeads(sortedLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleStageChange = async (leadId: number, newStage: Stage) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/leads/${leadId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ etapa: newStage }),
        }
      );

      if (!response.ok) throw new Error("Failed to update lead stage");

      // Refresh leads after successful update
      await fetchLeads();
    } catch (error) {
      console.error("Error updating lead stage:", error);
      throw error;
    }
  };

  const handleLeadUpdate = async (updatedLead: Lead) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/leads/${updatedLead.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedLead),
        }
      );

      if (!response.ok) throw new Error("Failed to update lead");

      // Refresh leads after successful update
      await fetchLeads();
    } catch (error) {
      console.error("Error updating lead:", error);
      throw error;
    }
  };

  const handleNewLead = async (newLead: Lead) => {
    try {
      const response = await fetch("http://localhost:3000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newLead),
      });

      if (!response.ok) throw new Error("Failed to create lead");

      // Refresh leads after successful creation
      await fetchLeads();
    } catch (error) {
      console.error("Error creating lead:", error);
      throw error;
    }
  };

  const filteredLeads = React.useMemo(() => {
    return leads.filter((lead) => {
      const searchStr = searchTerm.toLowerCase();
      return (
        lead.nombre.toLowerCase().includes(searchStr) ||
        lead.empresa?.toLowerCase().includes(searchStr) ||
        lead.origen.toLowerCase().includes(searchStr) ||
        lead.destino.toLowerCase().includes(searchStr) ||
        lead.email.toLowerCase().includes(searchStr) ||
        lead.telefono.toLowerCase().includes(searchStr)
      );
    });
  }, [leads, searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1800px] mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Reservas
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar reservas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => {
                /* Implement filters */
              }}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <Filter className="w-5 h-5" />
            </button>
            <button
              onClick={fetchLeads}
              className={`p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg ${
                isRefreshing ? "animate-spin" : ""
              }`}
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowNewLeadModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
              Nueva Reserva
            </button>
          </div>
        </div>

        <KanbanBoard
          leads={filteredLeads}
          onLeadClick={setSelectedLead}
          onStageChange={handleStageChange}
        />

        {selectedLead && (
          <LeadModal
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
            onUpdate={handleLeadUpdate}
          />
        )}

        {showNewLeadModal && (
          <LeadModal
            onClose={() => setShowNewLeadModal(false)}
            onUpdate={handleNewLead}
            isNew={true}
          />
        )}
      </div>
    </div>
  );
}
