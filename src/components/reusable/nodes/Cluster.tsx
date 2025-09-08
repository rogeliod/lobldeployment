import { Handle, Position } from "@xyflow/react";

export default function ClusterNode() {
  return (
    <div className="node-wrapper shadow-lg w-xl">
      <div className="node-wrapper__head">
        <p className="font-semibold self-center">Name</p>
        <p className="node-wrapper__label">cluster</p>
      </div>
      <div className="node-wrapper__body">
        <p>Description of Cluster</p>
      </div>
      <Handle type="target" position={Position.Top} id="cluster-target" />
      <Handle type="source" position={Position.Bottom} id="cluster-source" />
    </div>
  );
}
