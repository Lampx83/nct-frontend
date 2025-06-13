'use client';
import { margin } from '@mui/system';
import React, { useEffect, useState, useRef } from 'react';
import ReactFlow, { ReactFlowProvider, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

function getImageUrl(block) {
  const imageData = block?.image?.data?.attributes;
  if (!imageData) return null;
  let url = imageData.formats?.medium?.url || imageData.url;
  if (url && !url.startsWith('http')) url = "https://nct.neu.edu.vn/admin" + url;
  return url;
}

function findRootTree(data) {
  return data.find(x => x.attributes.name.includes('Hội Đồng Quản Lý'));
}
function findNodeById(data, id) {
  return data.find(node => String(node.id) === String(id));
}

function buildFlowTree(node, depth = 0, x = 0, nodes = [], edges = [], parent = null) {
  const NODE_WIDTH = 260;
  const NODE_HEIGHT = 110;
  const id = String(node.id);
  const y = depth * NODE_HEIGHT;
  nodes.push({
    id,
    position: { x, y },
    data: { label: node.attributes.name },
    style: {
      padding: '8px 8px',
      borderRadius: 8,
      backgroundColor: '#E0E7FF',
      color: '#111827',
      fontWeight: 'bold',
      textAlign: 'center',
      border: '1px solid #888',
      minWidth: 140,
      maxWidth: 220,
      height: 70,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'normal',
      fontSize: 13,
      wordWrap: 'break-word',
    //   boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
    //   cursor: 'pointer'
    }
  });
  if (parent) {
    edges.push({
      id: `e${parent}-${id}`,
      source: String(parent),
      target: id,
      type: 'step',
      markerEnd: { type: 'arrowclosed' }
    });
  }
  const children = node.attributes.children?.data || [];
  const n = children.length;
  let baseX = x - (n-1)/2 * NODE_WIDTH;
  children.forEach((child, i) => {
    buildFlowTree(child, depth + 1, baseX + i*NODE_WIDTH, nodes, edges, id);
  });
  return { nodes, edges };
}

function InfoBlock({ node, isActive, refProp }) {
  const blocks = node.attributes.imageBlocks?.slice(0, 2) || [];
  return (
    <div
      ref={refProp}
      className="mb-4 p-3"
      style={{
        scrollMarginTop: 120,
        background: isActive ? '#fffbe7' : '#fff',
        transition: 'background 0.6s',
        borderRadius: 12,
      }}
    >
      <h5 className="mb-3 text-primary" style={{ fontWeight: 700 }}>{node.attributes.name}</h5>
      {blocks.map((block, idx) => (
        <div className={`row mb-2 align-items-stretch${idx === 1 ? " flex-row-reverse" : ""}`} key={idx}>
          <div className="col-md-6 d-flex align-items-stretch">
            <div
              style={{
                width: "100%",
                height: 320,
                background: "#f8f8f8",
                borderRadius: 10,
                overflow: "hidden",
                display: "flex",
                alignItems: "center"
              }}
            >
              {getImageUrl(block) && (
                <img
                  src={getImageUrl(block)}
                  alt={`Ảnh ${idx + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  }}
                />
              )}
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center font-text-roboto">
            <div
              style={{
                textAlign: 'justify',
                fontSize: 16,
                fontFamily: 'Roboto, sans-serif',
                color: '#1a1a1a'
              }}
              dangerouslySetInnerHTML={{ __html: block?.description || "" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Duyệt tree InfoBlock đúng cha-con với data gốc
function renderInfoBlocksRecursive(node, data, refs, activeId) {
  const nodeFull = findNodeById(data, node.id) || node;
  const blocks = nodeFull.attributes.imageBlocks?.slice(0, 2) || [];
  const nodeBlock = blocks.length > 0
    ? (
      <InfoBlock
        key={node.id}
        node={nodeFull}
        refProp={refs.current[node.id]}
        isActive={activeId === node.id}
      />
    )
    : null;

  // Render children (nếu có)
  const children = node.attributes.children?.data || [];
  return (
    <>
      {nodeBlock}
      {children.map(child => renderInfoBlocksRecursive(child, data, refs, activeId))}
    </>
  );
}

export default function OrgChartPage() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [treeRoot, setTreeRoot] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const refs = useRef({});

  useEffect(() => {
    fetch("https://nct.neu.edu.vn/admin/api/org-charts?populate=deep,3")
      .then(res => res.json())
      .then(json => {
        const data = json.data || [];
        setData(data);

        // Lấy root node tree đúng "Hội Đồng Quản Lý"
        const rootTree = findRootTree(data);
        if (rootTree) {
          const children = rootTree.attributes.children?.data || [];
          // Duyệt đúng gốc của sơ đồ là Hội Đồng Quản Lý
          const { nodes, edges } = buildFlowTree(rootTree, 0, 600);
          setNodes(nodes);
          setEdges(edges);
          setTreeRoot(rootTree);

          // Tạo refs cho node có info (theo ID tree)
          function collectRefs(node) {
            const nodeFull = findNodeById(data, node.id) || node;
            const blocks = nodeFull.attributes.imageBlocks?.slice(0, 2) || [];
            if (blocks.length > 0 && !refs.current[node.id]) {
              refs.current[node.id] = React.createRef();
            }
            const children = node.attributes.children?.data || [];
            children.forEach(child => collectRefs(child));
          }
          collectRefs(rootTree);
        }
        setLoading(false);
      });
  }, []);

  // Map node label sang id trong treeRoot
  const getNodeIdByLabel = (label) => {
    let foundId = null;
    function findId(node) {
      const normalized = str => str.replace(/\n/g, '').replace(/\s+/g, '').toLowerCase();
      if (normalized(node.attributes.name) === normalized(label)) {
        foundId = node.id;
      }
      const children = node.attributes.children?.data || [];
      for (const child of children) findId(child);
    }
    if (treeRoot) findId(treeRoot);
    return foundId;
  };

  // Click node: scroll đến infoBlock
  const onNodeClick = (event, node) => {
    const id = getNodeIdByLabel(node.data.label);
    if (id && refs.current[id]) {
      setActiveId(id);
      refs.current[id].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => setActiveId(null), 1500);
    }
  };

  if (loading) return <div className="text-center mt-5">Đang tải dữ liệu...</div>;

  return (
    <ReactFlowProvider>
      <div className="container py-4">
        <div className="bg-light p-4 rounded shadow mb-5">
          <h2 className="mb-5 text-center text-success mt-5">Sơ đồ tổ chức</h2>
          <div style={{ height: 520 }}>
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
        </div>
        {/* <h2 className="mb-4 text-center text-success">Thông tin các Lab & Khoa</h2> */}
        {/* InfoBlock duyệt đúng cây (treeRoot) và lấy info từ data gốc */}
        {treeRoot && renderInfoBlocksRecursive(treeRoot, data, refs, activeId)}
      </div>
    </ReactFlowProvider>
  );
}
