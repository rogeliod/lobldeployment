import { Trash2Icon } from "lucide-react";

import useCRUDNode from "@/hooks/useCRUD";

export default function BasicNode({ id }: { id: string }) {
  const { handleDeleteNode } = useCRUDNode();

  return (
    <div className="node-wrapper rounded-xs shadow-lg p-1 w-fit mx-1">
      <div className="flex">
        <p className="p-1">Name of the node in pool</p>
        <Trash2Icon
          className="self-center"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteNode(id);
          }}
        />
      </div>
    </div>
  );
}
