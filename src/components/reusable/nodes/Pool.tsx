import { Handle, Position } from "@xyflow/react";

export default function PoolNode() {
  return (
    <div className="node-wrapper h-42 shadow-lg">
      <div className="node-wrapper__head">
        <p className="font-semibold self-center">Name</p>
        <p className="node-wrapper__label">pool</p>
      </div>
      {/* <div className="node-wrapper__body">
        <p>Description of pool node</p>
      </div> */}
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
