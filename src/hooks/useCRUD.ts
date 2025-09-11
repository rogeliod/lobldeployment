import type { Node } from "@xyflow/react";

import { useReactFlow } from "@xyflow/react";

function useCRUDNode() {
  const { addNodes, getNodes, setNodes } = useReactFlow();

  const handleDeleteNode = (id: string) => {
    const nodes = getNodes();
    const filteredNodes = nodes.filter((each) => each.id !== id);
    setNodes(filteredNodes);
  };

  const handleDeleteNodeWithChildren = (id: string) => {
    const nodes = getNodes();
    const filteredNodes = nodes.filter(
      (each) => each.id !== id && each.parentId !== id
    );
    setNodes(filteredNodes);
  };

  const handleRecursiveDeleteNode = (id: string) => {
    const nodes = getNodes();

    const toRemove = new Set<string>();

    function collectIds(id: string) {
      toRemove.add(id);
      nodes.forEach((item) => {
        if (item.parentId === id && !toRemove.has(item.id)) {
          collectIds(item.id);
        }
      });
    }

    collectIds(id);
    const filteredNodes = nodes.filter((item) => !toRemove.has(item.id));
    setNodes(filteredNodes);
  };

  const handleAddNode = (node: Node | Node[]) => {
    addNodes(node);
  };

  return {
    handleDeleteNode,
    handleDeleteNodeWithChildren,
    handleAddNode,
    handleRecursiveDeleteNode,
  };
}

export default useCRUDNode;
