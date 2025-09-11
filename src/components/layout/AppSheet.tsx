import { useEffect, useState } from "react";
import { useReactFlow } from "@xyflow/react";

import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { useDnd } from "@/context/DragAndDropContext";

function AppSheet() {
  const { selectedNodeId, setSelectedNodeId, setClickedNode, clickedNode } =
    useDnd();
  const { setNodes, setEdges } = useReactFlow();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedNodeId && clickedNode) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [selectedNodeId, clickedNode]);

  const handleOnOpenChange = () => {
    setSelectedNodeId(null);
    setClickedNode(null);
    setNodes((nodes) => nodes.map((node) => ({ ...node, selected: false })));
    setEdges((edges) => edges.map((edge) => ({ ...edge, selected: false })));
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOnOpenChange}>
      <SheetContent>
        <SheetHeader>Component</SheetHeader>
        <div>
          <p>Hello world</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default AppSheet;
