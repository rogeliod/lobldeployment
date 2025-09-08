import { Handle, Position } from "@xyflow/react";

export default function DatabaseNode() {
  return (
    <div className="node-wrapper w-80 shadow-lg">
      <div className="node-wrapper__head">
        <p className="font-semibold self-center">Name</p>
        <p className="node-wrapper__label">database</p>
      </div>
      <div className="node-wrapper__body">
        <p>Description of database</p>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
