import { Handle, Position } from "@xyflow/react";

export default function S3Node() {
  return (
    <div className="node-wrapper shadow-lg">
      <div className="node-wrapper__head">
        <p className="font-semibold self-center">Name</p>
        <p className="node-wrapper__label">S3</p>
      </div>
      <div className="node-wrapper__body">
        <p>Description of S3</p>
      </div>
      <Handle type="source" position={Position.Left} />
    </div>
  );
}
