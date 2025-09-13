import { useReactFlow, type Node } from "@xyflow/react";

import {
  resourceNodeXaxis,
  resourceNodeYaxis,
  resourceNodeZIndex,
} from "@/constants";

export default function useNode() {
  const { getNodes } = useReactFlow();

  const calcResourceNodeYPos = (parentId: string) => {
    const nodes = getNodes();
    const resource = nodes.filter(
      (node) => node.type === "resource" && node.parentId === parentId
    );
    return resource.length * resourceNodeYaxis;
  };

  const createResourceNode = (node: Partial<Node>) => {
    return {
      ...node,
      id: String(Math.random()),
      parentId: node.parentId,
      extent: "parent",
      position: {
        x: resourceNodeXaxis,
        y: calcResourceNodeYPos(node.parentId as string) + resourceNodeYaxis,
      },
      data: { label: "resource" },
      type: "resource",
      style: { zIndex: resourceNodeZIndex },
    } as Node;
  };

  return {
    createResourceNode,
  };
}
