'use client';
import React from 'react';
import ReactFlow, { Controls } from 'reactflow';
import 'reactflow/dist/style.css';

export default function OrgChartFlow({ nodes, edges, onNodeClick }) {
  return (
    <div style={{ height: 520 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onNodeClick={onNodeClick} // <--- callback nhận từ cha (đã đúng)
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        panOnScroll={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnDoubleClick={false}

      >
        <Controls showInteractive={false} />
      </ReactFlow>
       <style jsx global>{`
        .react-flow__renderer {
          cursor: default !important;
        }
        .react-flow__pane {
          cursor: default !important;
          background: #fff !important;
        }
      `}</style>
    </div>
  );
}

