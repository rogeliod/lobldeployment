import useCRUDNode from "@/hooks/useCRUD";
import useNode from "@/hooks/useNode";

import {
  Handle,
  Position,
  // useReactFlow,
  // NodeResizer,
  // type ResizeDragEvent,
  // useReactFlow,
} from "@xyflow/react";
import { Trash2 } from "lucide-react";

export default function PoolNode({ id }: { id: string }) {
  const { handleDeleteNodeWithChildren, handleAddNode } = useCRUDNode();

  const { createResourceNode } = useNode();

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const resourceNode = createResourceNode({ parentId: id });
    handleAddNode(resourceNode);
  };

  // const handleResize = (event: ResizeDragEvent) => {
  //   console.log(event.x, event.y);
  //   const nodes = getNodes();
  //   const updatedNode = nodes.map((node) => {
  //     if (node.id === id) {
  //       return {
  //         ...node,
  //         style: { ...node.style, height: event.x },
  //       };
  //     }
  //     return node;
  //   });
  //   setNodes(updatedNode);
  // };

  return (
    <>
      {/* <NodeResizer onResize={handleResize} /> */}
      <div className="node-wrapper h-82 shadow-lg">
        <div className="node-wrapper__head">
          <p className="font-semibold self-center">Name</p>
          <div className="flex gap-2">
            <p className="node-wrapper__label">pool</p>
            <Trash2
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNodeWithChildren(id);
              }}
              className="self-center"
            />
          </div>
        </div>
        <div className="node-wrapper__body">
          <button onClick={handleAdd} className="w-full">
            Add Resource
          </button>
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
    </>
  );
}
