import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Info, Sparkles, TrendingUp, Zap } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { 
  getSchemaRecommendation, 
  type EntityDefinition, 
  type SchemaRecommendation 
} from "./schema-registry";

interface SchemaSelectorProps {
  industry: string;
  department: string;
  onSelectionChange: (selectedEntities: string[], recommendation: SchemaRecommendation) => void;
}

export function SchemaSelector({ industry, department, onSelectionChange }: SchemaSelectorProps) {
  const [recommendation, setRecommendation] = useState<SchemaRecommendation | null>(null);
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [showAllEntities, setShowAllEntities] = useState(false);

  useEffect(() => {
    // Get schema recommendation based on Industry + Department
    const rec = getSchemaRecommendation(industry, department);
    setRecommendation(rec);

    // Pre-select all recommended entities
    const recommended = rec.entities
      .filter(e => e.recommended)
      .map(e => e.id);
    setSelectedEntities(recommended);
    
    // Notify parent
    onSelectionChange(recommended, rec);
  }, [industry, department]);

  const handleToggleEntity = (entityId: string) => {
    const newSelection = selectedEntities.includes(entityId)
      ? selectedEntities.filter(id => id !== entityId)
      : [...selectedEntities, entityId];
    
    setSelectedEntities(newSelection);
    
    if (recommendation) {
      onSelectionChange(newSelection, recommendation);
    }
  };

  if (!recommendation) return null;

  const coreEntities = recommendation.entities.filter(e => e.category === "core");
  const extendedEntities = recommendation.entities.filter(e => e.category === "extended");
  const industryEntities = recommendation.entities.filter(e => e.category === "industry-specific");

  const displayEntities = showAllEntities 
    ? recommendation.entities 
    : recommendation.entities.filter(e => e.recommended || e.category === "core");

  return (
    <div className="space-y-6">
      {/* Header with North Star */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">Your North Star Metric</h3>
              <Badge variant="secondary" className="bg-purple-600 text-white text-[10px]">
                {industry} × {department}
              </Badge>
            </div>
            <p className="text-2xl font-bold text-purple-900 mb-1">
              {recommendation.northStar}
            </p>
            <p className="text-xs text-purple-700">
              All selected entities will optimize tracking for this metric
            </p>
          </div>
        </div>
      </div>

      {/* Selection Summary */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold mb-1">
            Select Data Types to Track
          </h3>
          <p className="text-sm text-muted-foreground">
            {selectedEntities.length} of {recommendation.entities.length} selected • Drives Spine schema & connector sync
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAllEntities(!showAllEntities)}
          className="text-xs"
        >
          {showAllEntities ? "Show Recommended Only" : "Show All Options"}
        </Button>
      </div>

      {/* Entity Grid */}
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-6">
          {/* Core Entities */}
          {coreEntities.length > 0 && (!showAllEntities || true) && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-blue-600" />
                <h4 className="text-sm font-semibold">Core Entities</h4>
                <Badge variant="secondary" className="text-[10px] bg-blue-100 text-blue-700">
                  Essential
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {coreEntities.map((entity) => (
                  <EntityCard
                    key={entity.id}
                    entity={entity}
                    selected={selectedEntities.includes(entity.id)}
                    onToggle={handleToggleEntity}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Industry-Specific Entities */}
          {industryEntities.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <h4 className="text-sm font-semibold">Industry-Specific</h4>
                <Badge variant="secondary" className="text-[10px] bg-purple-100 text-purple-700">
                  {industry}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {industryEntities.map((entity) => (
                  <EntityCard
                    key={entity.id}
                    entity={entity}
                    selected={selectedEntities.includes(entity.id)}
                    onToggle={handleToggleEntity}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Extended Entities (only if showing all) */}
          {showAllEntities && extendedEntities.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-gray-600" />
                <h4 className="text-sm font-semibold">Extended Options</h4>
                <Badge variant="secondary" className="text-[10px] bg-gray-100 text-gray-700">
                  Optional
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {extendedEntities.map((entity) => (
                  <EntityCard
                    key={entity.id}
                    entity={entity}
                    selected={selectedEntities.includes(entity.id)}
                    onToggle={handleToggleEntity}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Recommended Connectors Preview */}
      {recommendation.connectors.length > 0 && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
          <div className="flex items-start gap-2 text-xs text-blue-900">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold mb-1">
                Recommended Connectors for your schema:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {recommendation.connectors.slice(0, 6).map(connector => (
                  <Badge 
                    key={connector} 
                    variant="secondary"
                    className="text-[10px] bg-blue-100 text-blue-700"
                  >
                    {connector}
                  </Badge>
                ))}
                {recommendation.connectors.length > 6 && (
                  <Badge variant="secondary" className="text-[10px] bg-blue-100 text-blue-700">
                    +{recommendation.connectors.length - 6} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* What Happens Next */}
      <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
        <h4 className="text-xs font-semibold text-gray-900 mb-2">
          What happens with this schema:
        </h4>
        <ul className="space-y-1.5 text-xs text-gray-700">
          <li className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0" />
            <span><strong>Spine Configuration:</strong> tenant_spine_config upserted with selected entities</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0" />
            <span><strong>Connector Sync:</strong> Only selected entity types will be synced from connected tools</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0" />
            <span><strong>UI Modules:</strong> Workspace views automatically adapt to your schema</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0" />
            <span><strong>Intelligence:</strong> AI signals focus on {recommendation.northStar}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Entity Card Component
interface EntityCardProps {
  entity: EntityDefinition;
  selected: boolean;
  onToggle: (id: string) => void;
}

function EntityCard({ entity, selected, onToggle }: EntityCardProps) {
  return (
    <motion.button
      onClick={() => onToggle(entity.id)}
      className={`
        relative p-3 rounded-lg border-2 text-left transition-all duration-200
        ${selected 
          ? "border-[#3F5185] bg-[#3F5185]/5 shadow-sm" 
          : "border-gray-200 hover:border-gray-300"
        }
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl">{entity.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-sm truncate">
              {entity.name}
            </h4>
            {selected && (
              <CheckCircle2 className="w-4 h-4 text-[#3F5185] shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            {entity.description}
          </p>
          
          {/* Key Fields Preview */}
          {entity.fields && entity.fields.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {entity.fields.slice(0, 3).map(field => (
                <span 
                  key={field}
                  className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600"
                >
                  {field}
                </span>
              ))}
              {entity.fields.length > 3 && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                  +{entity.fields.length - 3}
                </span>
              )}
            </div>
          )}
          
          {/* Recommended Badge */}
          {entity.recommended && (
            <Badge 
              variant="secondary" 
              className="mt-2 text-[9px] bg-emerald-100 text-emerald-700"
            >
              Recommended
            </Badge>
          )}
        </div>
      </div>

      {/* Required For Dependencies */}
      {entity.requiredFor && entity.requiredFor.length > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <p className="text-[9px] text-gray-500">
            Required for: {entity.requiredFor.join(", ")}
          </p>
        </div>
      )}
    </motion.button>
  );
}
