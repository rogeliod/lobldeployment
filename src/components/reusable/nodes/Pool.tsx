import useCRUDNode from "@/hooks/useCRUD";

import { Handle, Position } from "@xyflow/react";
import { Trash2 } from "lucide-react";

export default function PoolNode({ id }: { id: string }) {
  const { handleDeleteNodeWithChildren } = useCRUDNode();

  return (
    <div className="node-wrapper h-82 shadow-lg">
      <div className="node-wrapper__head">
        <p className="font-semibold self-center">Name</p>
        <div className="flex gap-2">
          <p className="node-wrapper__label">pool</p>
          <Trash2
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteNodeWithChildren(id);
            }}
            className="self-center"
          />
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Right}
        id="pool-target"
        isValidConnection={(connection) => {
          if (connection.sourceHandle === "database-target") {
            return true;
          } else {
            return false;
          }
        }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="pool-source"
        isValidConnection={(connection) => {
          if (connection.targetHandle === "deployment-target") {
            return true;
          } else {
            return false;
          }
        }}
      />
    </div>
  );
}
