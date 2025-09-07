import { useCallback, useRef } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Background,
} from "@xyflow/react";

import type { OnConnect, Node, OnSelectionChangeParams } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { useDnd } from "@/context/DragAndDropContext";

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function ReactFlowCanvas() {
  const reactFlowWrapperRef = useRef<HTMLDivElement | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { screenToFlowPosition } = useReactFlow();

  const { type, setSelectedNodeId } = useDnd();

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        style: { color: "black" },
        data: { label: type },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, setNodes]
  );

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", type as string);
    event.dataTransfer.effectAllowed = "move";
  };

  const onHandleChange = (e: OnSelectionChangeParams<Node, never>) => {
    const nodes = e.nodes;
    const selected = nodes.filter((each) => each.selected);
    setSelectedNodeId(selected[0]?.id);
  };

  return (
    <div className="h-full" ref={reactFlowWrapperRef}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        onSelectionChange={onHandleChange}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
