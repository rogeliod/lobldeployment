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

import { nodeTypes } from "@/types/node.types";

import { useDnd } from "@/context/DragAndDropContext";

import "@xyflow/react/dist/style.css";

export default function ReactFlowCanvas() {
  const reactFlowWrapperRef = useRef<HTMLDivElement | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { screenToFlowPosition } = useReactFlow();

  const { type, setSelectedNodeId } = useDnd();

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
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

      if (type === "cluster") {
        const parentId = String(Math.random());
        const childId = String(Math.random());

        const newNode = [
          {
            id: parentId,
            type: "group",
            position,
            style: {
              width: 500,
              height: 500,
            },
            data: { label: type },
          },
          {
            id: childId,
            type: "pool",
            position: { x: 10, y: 10 },
            data: { label: type },
            parentId,
            draggable: false,
          },
        ];
        setNodes((prevNode) => [...prevNode, ...newNode]);
      } else {
        const newNode = {
          id: String(Math.random()),
          type,
          position,
          style: { color: "black" },
          data: { label: type },
        };
        setNodes((prevNodes) => prevNodes.concat(newNode));
      }
    },
    [screenToFlowPosition, type, setNodes]
  );

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", type as string);
    event.dataTransfer.effectAllowed = "move";
  };

  const onHandleChange = (event: OnSelectionChangeParams<Node, never>) => {
    const nodes = event.nodes;
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
        nodeTypes={nodeTypes}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
