import { Handle, Position } from "@xyflow/react";

export default function PoolNode() {
  return (
    <div className="bg-purple-600 w-32 h-32">
      <p>Pool Node</p>
      <Handle type="source" position={Position.Left} />
    </div>
  );
}
