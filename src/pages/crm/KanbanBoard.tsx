import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Lead, Stage, STAGES } from "./types";
import LeadCard from "./LeadCard";

interface KanbanBoardProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
  onStageChange: (leadId: number, newStage: Stage) => Promise<void>;
}

export default function KanbanBoard({
  leads,
  onLeadClick,
  onStageChange,
}: KanbanBoardProps) {
  const [localLeads, setLocalLeads] = React.useState<Lead[]>(leads);

  React.useEffect(() => {
    setLocalLeads(leads);
  }, [leads]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const leadId = parseInt(draggableId);
    const newStage = destination.droppableId as Stage;

    // Optimistic update
    const updatedLeads = localLeads.map((lead) =>
      lead.id === leadId ? { ...lead, etapa: newStage } : lead
    );
    setLocalLeads(updatedLeads);

    try {
      await onStageChange(leadId, newStage);
    } catch (error) {
      // Revert on error
      setLocalLeads(leads);
      console.error("Error updating stage:", error);
    }
  };

  const getLeadsByStage = (stage: Stage) => {
    return localLeads.filter(
      (lead) => lead.etapa.toLowerCase() === stage.toLowerCase()
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => (
          <div key={stage} className="flex-shrink-0 w-80">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700">{stage}</h3>
                <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm">
                  {getLeadsByStage(stage).length}
                </span>
              </div>

              <Droppable droppableId={stage}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-[200px] max-h-[calc(100vh-220px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
                  >
                    {getLeadsByStage(stage).map((lead, index) => (
                      <Draggable
                        key={lead.id}
                        draggableId={lead.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <LeadCard lead={lead} onClick={onLeadClick} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
