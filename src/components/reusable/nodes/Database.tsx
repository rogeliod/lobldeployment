import { Handle, Position } from "@xyflow/react";
import { Trash2 } from "lucide-react";

import useCRUDNode from "@/hooks/useCRUD";

export default function DatabaseNode({ id }: { id: string }) {
  const { handleDeleteNode } = useCRUDNode();

  return (
    <div className="node-wrapper w-80 shadow-lg">
      <div className="node-wrapper__head">
        <p className="font-semibold self-center">Name</p>
        <div className="flex gap-2">
          <p className="node-wrapper__label">database</p>
          <Trash2
            className="self-center"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteNode(id);
            }}
          />
        </div>
      </div>
      <div className="node-wrapper__body">
        <p>Description of database</p>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        id="database-target"
        isValidConnection={(connection) => {
          if (connection.sourceHandle === "s3-source") {
            return true;
          } else return false;
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="database-source"
        isValidConnection={(connection) => {
          if (connection.targetHandle === "pool-target") {
            return true;
          } else return false;
        }}
      />
    </div>
  );
}
