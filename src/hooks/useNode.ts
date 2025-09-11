import { useReactFlow, type Node } from "@xyflow/react";

export default function useNode() {
  const { getNodes } = useReactFlow();

  const calcResourceNodeYPos = (parentId: string) => {
    const nodes = getNodes();
    const resource = nodes.filter(
      (node) => node.type === "resource" && node.parentId === parentId
    );
    return resource.length * 50;
  };

  const createResourceNode = (node: Partial<Node>) => {
    return {
      ...node,
      id: String(Math.random()),
      parentId: node.parentId,
      extent: "parent",
      position: {
        x: 8,
        y: calcResourceNodeYPos(node.parentId as string) + 120,
      },
      data: { label: "pool" },
      type: "resource",
      style: { zIndex: 100 },
    } as Node;
  };

  return {
    createResourceNode,
  };
}
