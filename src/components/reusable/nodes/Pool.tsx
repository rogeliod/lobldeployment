import useCRUDNode from "@/hooks/useCRUD";

import { Handle, Position } from "@xyflow/react";
import { Trash2 } from "lucide-react";

export default function PoolNode({ id }: { id: string }) {
  const { handleDeleteNodeWithChildren, handleAddNode } = useCRUDNode();

  const handleAdd = () => {
    handleAddNode({
      id: String(Math.random()),
      parentId: id,
      extent: "parent",
      position: { x: 8, y: 10 },
      data: { label: "pool" },
      type: "basicNode",
      style: { zIndex: 100 },
    });
  };

  return (
    <div className="node-wrapper h-42 shadow-lg">
      <div className="node-wrapper__head">
        <p className="font-semibold self-center">Name</p>
        <div className="flex gap-2">
          <p className="node-wrapper__label">pool</p>
          <Trash2
            onClick={() => handleDeleteNodeWithChildren(id)}
            className="self-center"
          />
        </div>
      </div>
      <div className="node-wrapper__body">
        <button onClick={handleAdd}>Add Resource</button>
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
