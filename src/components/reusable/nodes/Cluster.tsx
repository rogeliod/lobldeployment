import { poolNodeXaxis, poolNodeYaxis, poolNodeZIndex } from "@/constants";
import useCRUDNode from "@/hooks/useCRUD";
import useNode from "@/hooks/useNode";
import { Handle, Position } from "@xyflow/react";
import type { Node } from "@xyflow/react";
import { Plus, Trash2 } from "lucide-react";

export default function ClusterNode({ id }: { id: string }) {
  const { handleAddNode, handleRecursiveDeleteNode } = useCRUDNode();
  const { createResourceNode } = useNode();

  const handleAddPool = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    const poolId = String(Math.random());

    const pool: Node = {
      id: poolId,
      parentId: id,
      style: { zIndex: poolNodeZIndex },
      extent: "parent",
      data: { label: "pool" },
      position: {
        x: poolNodeXaxis * Math.random(),
        y: poolNodeYaxis * Math.random(),
      },
      type: "pool",
    };

    const resourceNode = createResourceNode({ parentId: poolId });

    handleAddNode([pool, resourceNode]);
  };

  const handleDeleteCluster = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    handleRecursiveDeleteNode(id);
  };

  return (
    <div className="node-wrapper shadow-lg w-2xl h-[500px]">
      <div className="node-wrapper__head">
        <p className="font-semibold self-center">Name</p>
        <div className="flex gap-2">
          <p className="node-wrapper__label">cluster</p>
          <Trash2 className="self-center" onClick={handleDeleteCluster} />
          <Plus className="self-center" onClick={handleAddPool} />
        </div>
      </div>
      <Handle type="target" position={Position.Top} id="cluster-target" />
      <Handle type="source" position={Position.Bottom} id="cluster-source" />
    </div>
  );
}
