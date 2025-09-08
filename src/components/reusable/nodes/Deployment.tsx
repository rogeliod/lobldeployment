import { Handle, Position } from "@xyflow/react";

export default function DeploymentNode() {
  return (
    <div className="node-wrapper shadow-lg w-2xl">
      <div className="node-wrapper__head">
        <p className="font-semibold self-center">Name</p>
        <p className="node-wrapper__label">Deployment</p>
      </div>
      <div className="node-wrapper__body">
        <p>Description of Deployment</p>
      </div>
      <Handle
        type="source"
        position={Position.Left}
        id="deployment-source"
        isValidConnection={(connection) => {
          if (connection.targetHandle === "pool-source") {
            return true;
          } else return false;
        }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="deployment-target"
        isValidConnection={(connection) => {
          if (connection.sourceHandle === "production-target") {
            return true;
          } else return false;
        }}
      />
    </div>
  );
}
