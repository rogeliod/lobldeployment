import { ReactFlowProvider } from "@xyflow/react";

import ReactFlowCanvas from "@/components/layout/ReactFlowCanvas";
import { DnDProvider } from "./context/DragAndDropContext";

function App() {
  return (
    <main>
      <ReactFlowProvider>
        <DnDProvider>
          <aside>Sidebar here</aside>
          <section className="w-full">
            <ReactFlowCanvas />
          </section>
        </DnDProvider>
      </ReactFlowProvider>
    </main>
  );
}

export default App;
