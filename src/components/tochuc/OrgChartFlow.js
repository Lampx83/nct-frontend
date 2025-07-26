import React from 'react';
import ReactFlow, { Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

// Custom Node Component
const CustomOrgNode = ({ data, isConnectable }) => {
  const isTruongCongNghe = data.label.includes('Ban Giám Hiệu');
  const isHDDHT = data.label.includes('Hội Đồng Chuyên Môn');
  const isCTXH = data.label.includes('Các Tổ Chức Chính Trị Xã Hội');

  return (
    <div
      style={{
        padding: '8px 10px',
        borderRadius: 12,
        backgroundColor: isTruongCongNghe ? '#DC2626' : '#E0E7FF',
        color: isTruongCongNghe ? '#fff' : '#111827',
        fontWeight: 'bold',
        textAlign: 'center',
        border: '1px solid #888',
        minWidth: 200, // Giảm từ 280
        maxWidth: 220, // Giảm từ 360
        height: 140,   // Giảm từ 180
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'normal',
        fontSize: 14, // Giảm từ 24 xuống 14
        wordWrap: 'break-word',
        position: 'relative',
      }}
    >
      {/* Handle Top */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        isConnectable={isConnectable}
        style={{
          background: '#1D4ED8',
          width: 8,
          height: 8,
          top: -4,
        }}
      />

      {/* Handle Bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        isConnectable={isConnectable}
        style={{
          background: '#1D4ED8',
          width: 8,
          height: 8,
          bottom: -4,
        }}
      />

      {/* Handle Left */}
      {(isTruongCongNghe || isCTXH) && (
        <Handle
          type={isTruongCongNghe ? "source" : "target"}
          position={Position.Left}
          id="left"
          isConnectable={isConnectable}
          style={{
            background: '#1D4ED8',
            width: 8,
            height: 8,
            left: -4,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
      )}

      {/* Handle Right */}
      {(isTruongCongNghe || isHDDHT) && (
        <Handle
          type={isTruongCongNghe ? "source" : "target"}
          position={Position.Right}
          id="right"
          isConnectable={isConnectable}
          style={{
            background: '#1D4ED8',
            width: 8,
            height: 8,
            right: -4,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
      )}

      <div>{data.label}</div>
    </div>
  );
};

const nodeTypes = {
  customOrg: CustomOrgNode,
};

const OrgChartFlow = ({ nodes, edges, onNodeClick }) => {
  return (
    <div style={{ 
      width: '100%', 
      height: '80vh',
      minHeight: '500px',
      backgroundColor: '#f8f9fa'
    }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{
          padding: 0.1,
          includeHiddenNodes: false,
        }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        // panOnDrag={true}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={true}
        // minZoom={0.5}
        // maxZoom={1.2}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        style={{ backgroundColor: '#fff' }}
        panOnDrag={false}
        minZoom={1}
        maxZoom={1}
      />
    </div>
  );
};

export default OrgChartFlow;