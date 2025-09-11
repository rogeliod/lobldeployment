import useCRUDNode from "@/hooks/useCRUD";
import { Handle, Position } from "@xyflow/react";
import type { Node } from "@xyflow/react";
import { Plus, Trash2 } from "lucide-react";

export default function ClusterNode({ id }: { id: string }) {
  const { handleAddNode, handleRecursiveDeleteNode } = useCRUDNode();

  const handleAddPool = () => {
    const poolId = String(Math.random());

    const pool: Node = {
      id: poolId,
      parentId: id,
      style: { zIndex: 50 },
      extent: "parent",
      data: { label: "pool" },
      position: { x: 0, y: 0 },
      type: "pool",
    };

    const basicNode: Node = {
      id: String(Math.random()),
      parentId: poolId,
      style: { zIndex: 100 },
      extent: "parent",
      data: { label: "node" },
      position: { x: 0, y: 0 },
      type: "basicNode",
    };

    handleAddNode([pool, basicNode]);
  };

  const handleDeleteCluster = () => {
    handleRecursiveDeleteNode(id);
  };

  return (
    <div className="node-wrapper shadow-lg w-xl h-96">
      <div className="node-wrapper__head">
        <p className="font-semibold self-center">Name</p>
        <div className="flex gap-2">
          <p className="node-wrapper__label">cluster</p>
          <Trash2 className="self-center" onClick={handleDeleteCluster} />
          <Plus className="self-center" onClick={handleAddPool} />
        </div>
      </div>
      {/* <div className="node-wrapper__body">
        <p>Description of Cluster</p>
      </div> */}
      <Handle type="target" position={Position.Top} id="cluster-target" />
      <Handle type="source" position={Position.Bottom} id="cluster-source" />
    </div>
  );
}
