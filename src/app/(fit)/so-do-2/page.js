

"use client";

// import React, { useCallback, useState } from 'react';
import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Controls,
  MiniMap,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';


const nodeStyle = {
  padding: '16px 12px',
  borderRadius: 8,
  backgroundColor: '#E0E7FF',
  color: '#111827',
  fontWeight: 'bold',
  textAlign: 'center',
  border: '1px solid #888',
  minWidth: 140,
  maxWidth: 180,
  height: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'normal',
  fontSize: 13,
  wordWrap: 'break-word',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
};

const nodes = [
  { id: '1', position: { x: 600, y: -50 }, data: { label: 'Board of Trustees' }, style: nodeStyle },
  { id: '2', position: { x: 600, y: 100 }, data: { label: 'College of Technology' }, style: { ...nodeStyle, backgroundColor: '#DC2626', color: '#fff' } },
  { id: '3', position: { x: 250, y: 100 }, data: { label: 'Socio-political organizations' }, style: nodeStyle },
  { id: '4', position: { x: 950, y: 100 }, data: { label: 'Academic council' }, style: nodeStyle },
  { id: '5', position: { x: 30, y: 300 }, data: { label: 'Office' }, style: nodeStyle },
  { id: '6', position: { x: 1220, y: 300 }, data: { label: 'LABs' }, style: nodeStyle },
  { id: '7', position: { x: 200, y: 300 }, data: { label: 'Faculty\nof\nFundamental\nscience' }, style: nodeStyle },
  { id: '8', position: { x: 360, y: 300 }, data: { label: 'Faculty\nof\nMathematical\nEconomics' }, style: nodeStyle },
  { id: '9', position: { x: 530, y: 300 }, data: { label: 'Faculty\nof\nData Science\nand\nArtificial Intelligence' }, style: nodeStyle},
  { id: '10', position: { x: 700, y: 300 }, data: { label: 'Faculty\nof\nStatistical\nEconomics' }, style: nodeStyle },
  { id: '11', position: { x: 870, y: 300 }, data: { label: 'Faculty\nof\nInformation\nTechnology' }, style: nodeStyle },
  { id: '12', position: { x: 1040, y: 300 }, data: { label: 'Faculty\nof\nManagement\nInformation\nSystem' }, style: nodeStyle },
];

const edges = [
  { id: 'e1-2', source: '1', target: '2', type: 'step', markerEnd: { type: 'arrowclosed' } },
  { id: 'e2-3', source: '2', target: '3', type: 'step', sourceHandle: 'left', markerEnd: { type: 'arrowclosed' } },
  { id: 'e2-4', source: '2', target: '4', type: 'step', sourceHandle: 'right', markerEnd: { type: 'arrowclosed' } },
  { id: 'e2-5', source: '2', target: '5', type: 'step', markerEnd: { type: 'arrowclosed' } },
  { id: 'e2-6', source: '2', target: '6', type: 'step', markerEnd: { type: 'arrowclosed' } },
  { id: 'e2-7', source: '2', target: '7', type: 'step', markerEnd: { type: 'arrowclosed' } },
  { id: 'e2-8', source: '2', target: '8', type: 'step', markerEnd: { type: 'arrowclosed' } },
  { id: 'e2-9', source: '2', target: '9', type: 'step', markerEnd: { type: 'arrowclosed' } },
  { id: 'e2-10', source: '2', target: '10', type: 'step', markerEnd: { type: 'arrowclosed' } },
  { id: 'e2-11', source: '2', target: '11', type: 'step', markerEnd: { type: 'arrowclosed' } },
  { id: 'e2-12', source: '2', target: '12', type: 'step', markerEnd: { type: 'arrowclosed' } },
];

export default function Organization() {
  const [selected, setSelected] = useState(null);

//   const onNodeClick = useCallback((event, node) => {
//     setSelected(node.data.label);
//     window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
//   }, []);

  const detailRef = useRef(null);

  const onNodeClick = useCallback((event, node) => {
    setSelected(node.data.label);
    setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    }, []);


  return (
    <ReactFlowProvider>
      <div style={{ backgroundColor: '#fff', padding: '20px' }}>
                  {/* <h1 style={{ textAlign: 'center', margin: '90px 0 0 0', fontWeight: 'bold', fontSize: '48px', color: '#781C1C' }}> */}
          {/* Sơ đồ tổ chức */}
        {/* </h1> */}
        <div style={{ height: '600px', display: 'flex', justifyContent: 'center' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            onNodeClick={onNodeClick}
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            panOnScroll={false}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
          >
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>

    {selected && (
          <div ref={detailRef} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: 20, padding: 16, borderTop: '1px solid #ccc' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ width: '48%', height: 350, backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontStyle: 'italic' }}>Ảnh 1</span>
                </div>
                <div style={{ marginTop: 10 }}>
                <p>Thông tin mô tả về <strong>{selected.replace(/\n/g, ' ')}</strong> hiển thị tại đây.</p>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ marginTop: 10 }}>
                <p>Thông tin mô tả về <strong>{selected.replace(/\n/g, ' ')}</strong> hiển thị tại đây.</p>
                </div>
                <div style={{ width: '48%', height: 350, backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontStyle: 'italic' }}>Ảnh 2</span>
                {/* <img src="https://neu.daotaotuxa.net/wp-content/uploads/2022/08/dai-hoc-kinh-te-quoc-dan-ngoi-truong-mo-uoc-cua-nhieu-sinh-vien-2.webp" alt="Ảnh mô tả" style={{ maxWidth: '100%', maxHeight: '100%',objectFit: 'cover',display: 'block' }} /> */}
                </div>
            </div>
          </div>
    )}
      </div>

      <style jsx global>{`
        .react-flow__node:hover {
          background-color: #1D4ED8 !important;
          color: #fff !important;
          transition: background-color 0.3s ease;
          cursor: pointer;
        }
        .react-flow__controls button,
        .react-flow__controls .react-flow__controls-interactive {
          display: none;
        }
        .react-flow__attribution {
          display: none;
        }
      `}</style>
    </ReactFlowProvider>
  );
}
