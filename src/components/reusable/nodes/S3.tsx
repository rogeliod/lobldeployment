import useCRUDNode from "@/hooks/useCRUD";
import { Handle, Position } from "@xyflow/react";
import { Trash2 } from "lucide-react";

export default function S3Node({ id }: { id: string }) {
  const { handleDeleteNode } = useCRUDNode();

  return (
    <div className="node-wrapper shadow-lg">
      <div className="node-wrapper__head">
        <p className="font-semibold self-center">Name</p>
        <div className="flex gap-2">
          <p className="node-wrapper__label">S3</p>
          <Trash2
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteNode(id);
            }}
            className="self-center cursor-pointer"
          />
        </div>
      </div>
      <div className="node-wrapper__body">
        <p>Description of S3</p>
      </div>
      <Handle
        type="source"
        position={Position.Left}
        id="s3-source"
        isValidConnection={(connection) => {
          if (connection.targetHandle === "database-target") {
            return true;
          } else return false;
        }}
      />
    </div>
  );
}
