import { useReactFlow } from "@xyflow/react";
import { useEffect, useRef, type ReactNode } from "react";

function AutoResizeNode({ id, children }: { id: string; children: ReactNode }) {
  const { setNodes } = useReactFlow();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === id
              ? { ...node, style: { ...node.style, width, height } }
              : node
          )
        );
      }
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [id, setNodes]);

  return <div ref={ref}>{children}</div>;
}

export default AutoResizeNode;
