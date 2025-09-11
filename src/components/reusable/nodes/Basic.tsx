import { useReactFlow } from "@xyflow/react";
import { Trash2Icon } from "lucide-react";

export default function BasicNode({ id }: { id: string }) {
  const { setNodes, getNodes } = useReactFlow();

  const handleDeleteNode = () => {
    const nodes = getNodes();
    const filteredNodes = nodes.filter((each) => each.id !== id);
    setNodes(filteredNodes);
  };

  return (
    <div className="node-wrapper rounded-xs shadow-lg p-1 w-fit mx-1">
      <div className="flex">
        <p className="p-1">Name of the node in pool</p>
        <Trash2Icon className="self-center" onClick={handleDeleteNode} />
      </div>
    </div>
  );
}
