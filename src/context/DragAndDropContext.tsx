import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type DndContextType = {
  type: string | null;
  setType: React.Dispatch<React.SetStateAction<string | null>>;
  selectedNodeId: string | null;
  setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
};

const DndContext = createContext<DndContextType>({
  type: null,
  setType: () => {},
  selectedNodeId: null,
  setSelectedNodeId: () => {},
});

export const DnDProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  return (
    <DndContext.Provider
      value={{ type, setType, selectedNodeId, setSelectedNodeId }}
    >
      {children}
    </DndContext.Provider>
  );
};

export default DndContext;

// eslint-disable-next-line react-refresh/only-export-components
export const useDnd = () => {
  return useContext(DndContext);
};
