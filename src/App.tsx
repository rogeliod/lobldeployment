import { ReactFlowProvider } from "@xyflow/react";

import ReactFlowCanvas from "@/components/global/ReactFlowCanvas";
import AppSidebar from "@/components/layout/AppSidebar";

import { SidebarProvider } from "@/components/ui/sidebar";

import { DnDProvider } from "@/context/DragAndDropContext";

function App() {
  return (
    <main>
      <ReactFlowProvider>
        <DnDProvider>
          <SidebarProvider>
            <aside>
              <AppSidebar />
            </aside>
            <section className="w-full">
              <ReactFlowCanvas />
            </section>
          </SidebarProvider>
        </DnDProvider>
      </ReactFlowProvider>
    </main>
  );
}

export default App;
