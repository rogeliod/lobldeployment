import { useCallback, useRef } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Background,
} from "@xyflow/react";

import type {
  OnConnect,
  Node,
  OnSelectionChangeParams,
  Edge,
} from "@xyflow/react";

import { nodeTypes } from "@/types/node.types";

import { useDnd } from "@/context/DragAndDropContext";

import "@xyflow/react/dist/style.css";

export default function ReactFlowCanvas() {
  const reactFlowWrapperRef = useRef<HTMLDivElement | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { screenToFlowPosition } = useReactFlow();

  const { type, setSelectedNodeId } = useDnd();

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: "step" }, eds)),
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
        // const groupId = String(Math.random());
        const clusterId = String(Math.random());
        const poolId = String(Math.random());
        const nodeId = String(Math.random());

        const newNode: Node[] = [
          // {
          //   id: groupId,
          //   type: "group",
          //   position,
          //   style: {
          //     width: 576,
          //     height: 500,
          //     zIndex: -1,
          //   },
          //   data: { label: type },
          //   resizing: true,
          // },
          {
            id: clusterId,
            type: "cluster",
            position: { x: 0, y: 0 },
            // extent: "parent",
            // draggable: false,
            data: { label: "cluster" },
            // parentId: groupId,
            // resizing: true,
            style: {
              zIndex: 10,
            },
          },
          {
            id: poolId,
            type: "pool",
            position: { x: 10, y: 10 },
            data: { label: type },
            parentId: clusterId,
            extent: "parent",
            style: {
              zIndex: 50,
            },
          },
          {
            id: nodeId,
            type: "basicNode",
            position: { x: 8, y: 60 },
            data: { label: type },
            parentId: poolId,
            extent: "parent",
            style: { zIndex: 100 },
          },
        ];
        setNodes((prevNode) => [...prevNode, ...newNode]);
      } else {
        const id = String(Math.random());
        const newNode = {
          id,
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

  const onHandleChange = (event: OnSelectionChangeParams<Node, Edge>) => {
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
