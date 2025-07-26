'use client';
import React, { useEffect, useState, useRef } from 'react';
import { ReactFlowProvider } from 'reactflow';
import OrgChartFlow from '@/components/tochuc/OrgChartFlow';
import RecursiveInfoBlocks from '@/components/tochuc/RecursiveInfoBlocks';

function restructureTreeForCustomLayout(data) {
  const root = data.find(x => x.attributes.name.includes('Đảng Bộ Trường'));
  if (!root) return data;
  const truongCN = (root.attributes.children?.data || []).find(x => x.attributes.name.includes('Ban Giám Hiệu'));
  if (!truongCN) return data;

  const childrenTCN = truongCN.attributes.children?.data || [];
  const hoidong = childrenTCN.find(x => x.attributes.name.includes('Hội Đồng Chuyên Môn'));
  const phongNC = childrenTCN.find(x => x.attributes.name.includes('Các Tổ Chức Chính Trị Xã Hội'));

  truongCN.attributes.children.data = childrenTCN.filter(x =>
    !(
      x.attributes.name.includes('Hội Đồng Chuyên Môn') ||
      x.attributes.name.includes('Các Tổ Chức Chính Trị Xã Hội')
    )
  );

  let rootChildren = root.attributes.children?.data || [];
  const names = rootChildren.map(x => x.attributes.name);
  if (hoidong && !names.includes(hoidong.attributes.name))
    root.attributes.children.data.push(hoidong);
  if (phongNC && !names.includes(phongNC.attributes.name))
    root.attributes.children.data.push(phongNC);

  return data;
}

function findRootTree(data) {
  return data.find(x => x.attributes.name.includes('Đảng Bộ Trường'));
}

function findNodeById(data, id) {
  return data.find(node => String(node.id) === String(id));
}

function findNodeByName(data, keyword) {
  const normalized = str => str.replace(/\s+/g, '').toLowerCase();
  return data.find(node => normalized(node.attributes.name).includes(normalized(keyword)));
}

function buildFlowTree(node, depth = 0, x = 0, nodes = [], edges = [], parent = null, custom = {}, data = []) {
  const NODE_WIDTH = 250; // Giảm từ 320 xuống 250
  const NODE_HEIGHT = 200; // Giảm từ 280 xuống 200
  const id = String(node.id);
  const y = depth * NODE_HEIGHT;
  const name = node.attributes.name;
  const isTruongCongNghe = name.includes('Ban Giám Hiệu');
  const isHDDHT = name.includes('Hội Đồng Chuyên Môn');
  const isCTXH = name.includes('Các Tổ Chức Chính Trị Xã Hội');

  nodes.push({
    id,
    position: { x, y },
    data: { label: name },
    type: 'customOrg',
    sourcePosition: isTruongCongNghe ? undefined : undefined,
    targetPosition: isHDDHT ? 'right' : isCTXH ? 'left' : undefined,
  });

  if (parent && !(custom.skipEdgeFromParent)) {
    edges.push({
      id: `e${parent}-${id}`,
      source: String(parent),
      target: id,
      type: 'smoothstep',
      style: {
        stroke: '#1D4ED8',
        strokeWidth: 2,
      },
      markerEnd: { 
        type: 'arrowclosed',
        width: 20,
        height: 20,
        color: '#1D4ED8'
      },
    });
  }

  if (depth === 0 && node.attributes.children?.data?.length) {
    const children = node.attributes.children.data;
    const truongCN = children.find(x => x.attributes.name.includes('Ban Giám Hiệu'));
    const hoidonHT = children.find(x => x.attributes.name.includes('Hội Đồng Chuyên Môn'));
    const toChucCTXH = children.find(x => x.attributes.name.includes('Các Tổ Chức Chính Trị Xã Hội'));

    const centerX = x;
    const spacing = NODE_WIDTH * 1.2; // Giảm spacing

    if (hoidonHT)
      buildFlowTree(hoidonHT, depth + 1, centerX - spacing, nodes, edges, id, { skipEdgeFromParent: true }, data);
    if (truongCN)
      buildFlowTree(truongCN, depth + 1, centerX, nodes, edges, id, { type: 'truong' }, data);
    if (toChucCTXH)
      buildFlowTree(toChucCTXH, depth + 1, centerX + spacing, nodes, edges, id, { skipEdgeFromParent: true }, data);

    return { nodes, edges };
  }

  if (custom.type === 'truong' && node.attributes.children?.data?.length) {
    const children = node.attributes.children.data;
    
    // Responsive layout - tự động chia hàng dựa trên screen width
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const perRow = screenWidth < 768 ? 2 : screenWidth < 1200 ? 3 : children.length;
    const rows = Math.ceil(children.length / perRow);
    
    children.forEach((child, i) => {
      const row = Math.floor(i / perRow);
      const col = i % perRow;
      const currentRowItems = Math.min(perRow, children.length - row * perRow);
      const baseX = x - ((currentRowItems - 1) / 2) * NODE_WIDTH * 0.9;
      const childX = baseX + col * NODE_WIDTH * 0.9;
      const childY = y + (row + 1) * NODE_HEIGHT * 0.8;
      
      buildFlowTree(child, depth + 1 + row, childX, nodes, edges, id, {}, data);
    });

    // Horizontal edges
    const hoidonHT = findNodeByName(data, 'Hội Đồng Chuyên Môn');
    const toChucCTXH = findNodeByName(data, 'Các Tổ Chức Chính Trị Xã Hội');

    if (hoidonHT) {
      edges.push({
        id: `edge-left-${id}-${hoidonHT.id}`,
        source: id,
        target: String(hoidonHT.id),
        sourceHandle: 'left',
        targetHandle: 'right',
        type: 'smoothstep',
        style: {
          stroke: '#1D4ED8',
          strokeWidth: 2,
        },
        markerEnd: {
          type: 'arrowclosed',
          width: 20,
          height: 20,
          color: '#1D4ED8'
        },
      });
    }

    if (toChucCTXH) {
      edges.push({
        id: `edge-right-${id}-${toChucCTXH.id}`,
        source: id,
        target: String(toChucCTXH.id),
        sourceHandle: 'right',
        targetHandle: 'left',
        type: 'smoothstep',
        style: {
          stroke: '#1D4ED8',
          strokeWidth: 2,
        },
        markerEnd: {
          type: 'arrowclosed',
          width: 20,
          height: 20,
          color: '#1D4ED8'
        },
      });
    }

    return { nodes, edges };
  }

  const children = node.attributes.children?.data || [];
  if (children.length) {
    let baseX = x - (children.length - 1) / 2 * NODE_WIDTH * 0.9;
    children.forEach((child, i) => {
      buildFlowTree(child, depth + 1, baseX + i * NODE_WIDTH * 0.9, nodes, edges, id, {}, data);
    });
  }

  return { nodes, edges };
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
        let data = json.data || [];
        data = restructureTreeForCustomLayout(data);
        setData(data);
        const rootTree = findRootTree(data);
        if (rootTree) {
          // Tính center dựa trên screen width
          const centerX = typeof window !== 'undefined' ? window.innerWidth / 4 : 400;
          const { nodes, edges } = buildFlowTree(rootTree, 0, centerX, [], [], null, {}, data);
          setNodes(nodes);
          setEdges(edges);
          setTreeRoot(rootTree);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

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

  const onNodeClick = (event, node) => {
    const id = getNodeIdByLabel(node.data.label);
    if (id && refs.current[id]) {
      setActiveId(id);
      refs.current[id].scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => setActiveId(null), 1500);
    }
  };

  if (loading) return <div className="text-center mt-5">Đang tải dữ liệu...</div>;

  return (
    <ReactFlowProvider>
      <div className="container-fluid px-0 py-4">
        <h1 className="text-center bg-white mt-5 mb-0 pt-5 fw-bolder">SƠ ĐỒ TỔ CHỨC</h1>

        <div
          className="bg-light w-100"
          style={{
            boxShadow: 'none',
            borderRadius: 0,
            // overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            overflow: 'hidden',
            height: 'auto',
            minHeight: '60vh',
          }}
        >
          <div style={{ 
            minWidth: '100%',
            width: 'fit-content',
          }}>
            <OrgChartFlow nodes={nodes} edges={edges} onNodeClick={onNodeClick} />
          </div>
        </div>

        <div className="container px-0 py-4">
          {treeRoot && (
            <RecursiveInfoBlocks
              node={treeRoot}
              data={data}
              refs={refs}
              activeId={activeId}
            />
          )}
        </div>
      </div>
      
      <style jsx global>{`
        .react-flow__node {
          transition: background 0.22s, color 0.22s;
        }
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
        
        @media (max-width: 768px) {
          .container-fluid {
            padding: 0 !important;
          }
        }
      `}</style>
    </ReactFlowProvider>
  );
}