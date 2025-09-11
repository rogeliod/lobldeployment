import { Handle, Position } from "@xyflow/react";
import { Trash2 } from "lucide-react";

import useCRUDNode from "@/hooks/useCRUD";

export default function DeploymentNode({ id }: { id: string }) {
  const { handleDeleteNode } = useCRUDNode();

  return (
    <div className="node-wrapper shadow-lg w-2xl">
      <div className="node-wrapper__head">
        <p className="font-semibold self-center">Name</p>
        <div className="flex gap-2">
          <p className="node-wrapper__label">Deployment</p>
          <Trash2
            onClick={() => handleDeleteNode(id)}
            className="self-center"
          />
        </div>
      </div>
      <div className="node-wrapper__body">
        <p>Description of Deployment</p>
      </div>
      <Handle
        type="source"
        position={Position.Left}
        id="deployment-source"
        isValidConnection={(connection) => {
          if (connection.targetHandle === "pool-source") {
            return true;
          } else return false;
        }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="deployment-target"
        isValidConnection={(connection) => {
          if (connection.sourceHandle === "production-target") {
            return true;
          } else return false;
        }}
      />
    </div>
  );
}
