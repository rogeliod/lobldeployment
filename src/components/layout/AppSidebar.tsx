import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useDnd } from "@/context/DragAndDropContext";

import { typeOfDraggableNodes } from "@/data/nodes";

function AppSidebar() {
  const { setType } = useDnd();

  const onDragInit = (e: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    setType(nodeType);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <Sidebar>
      <SidebarHeader className="font-semibold">Components</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {typeOfDraggableNodes.map((nodes) => (
                <SidebarMenuItem key={nodes.label}>
                  <SidebarMenuButton asChild>
                    <div
                      draggable
                      onDragStart={(e) => onDragInit(e, nodes.type)}
                    >
                      {nodes.label}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
