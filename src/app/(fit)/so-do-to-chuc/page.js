'use client';
import React, { useEffect, useState, useRef } from 'react';
import { ReactFlowProvider } from 'reactflow';
import OrgChartFlow from '@/components/tochuc/OrgChartFlow';
import RecursiveInfoBlocks from '@/components/tochuc/RecursiveInfoBlocks';

function restructureTreeForCustomLayout(data) {
  const root = data.find(x => x.attributes.name.includes('Hội Đồng Quản Lý'));
  if (!root) return data;
  const truongCN = (root.attributes.children?.data || []).find(x => x.attributes.name.includes('Trường Công Nghệ'));
  if (!truongCN) return data;

  const childrenTCN = truongCN.attributes.children?.data || [];
  const hoidong = childrenTCN.find(x => x.attributes.name.includes('Hội Đồng Học Thuật'));
  const phongNC = childrenTCN.find(x => x.attributes.name.includes('Tổ Chức Chính Trị Xã Hội'));

  truongCN.attributes.children.data = childrenTCN.filter(x =>
    !(
      x.attributes.name.includes('Hội Đồng Học Thuật') ||
      x.attributes.name.includes('Tổ Chức Chính Trị Xã Hội')
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
  return data.find(x => x.attributes.name.includes('Hội Đồng Quản Lý'));
}

function findNodeById(data, id) {
  return data.find(node => String(node.id) === String(id));
}

function findNodeByName(data, keyword) {
  const normalized = str => str.replace(/\s+/g, '').toLowerCase();
  return data.find(node => normalized(node.attributes.name).includes(normalized(keyword)));
}

function buildFlowTree(node, depth = 0, x = 0, nodes = [], edges = [], parent = null, custom = {}, data = []) {
  const NODE_WIDTH = 320;
  const NODE_HEIGHT = 280;
  const id = String(node.id);
  const y = depth * NODE_HEIGHT;
  const isTruongCongNghe = node.attributes.name.includes('Trường Công Nghệ');

  nodes.push({
    id,
    position: { x, y },
    data: { label: node.attributes.name },
    style: {
      padding: '12px 14px',
      borderRadius: 12,
      backgroundColor: isTruongCongNghe ? '#DC2626' : '#E0E7FF',
      color: isTruongCongNghe ? '#fff' : '#111827',
      fontWeight: 'bold',
      textAlign: 'center',
      border: '1px solid #888',
      minWidth: 280,
      maxWidth: 360,
      height: 180,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'normal',
      fontSize: 24,
      wordWrap: 'break-word',
    },
  });

  if (parent && !(custom.skipEdgeFromParent)) {
    edges.push({
      id: `e${parent}-${id}`,
      source: String(parent),
      target: id,
      type: 'step',
      markerEnd: { type: 'arrowclosed' },
    });
  }

  if (depth === 0 && node.attributes.children?.data?.length) {
    const children = node.attributes.children.data;
    const truongCN = children.find(x => x.attributes.name.includes('Trường Công Nghệ'));
    const hoidonHT = children.find(x => x.attributes.name.includes('Hội Đồng Học Thuật'));
    const toChucCTXH = children.find(x => x.attributes.name.includes('Tổ Chức Chính Trị Xã Hội'));

    const centerX = x;
    const offsetX = NODE_WIDTH * 1.5;

    if (truongCN)
      buildFlowTree(truongCN, depth + 1, centerX, nodes, edges, id, { type: 'truong' }, data);
    if (hoidonHT)
      buildFlowTree(hoidonHT, depth + 1, centerX - offsetX, nodes, edges, id, { skipEdgeFromParent: true }, data);
    if (toChucCTXH)
      buildFlowTree(toChucCTXH, depth + 1, centerX + offsetX, nodes, edges, id, { skipEdgeFromParent: true }, data);

    return { nodes, edges };
  }

  if (custom.type === 'truong' && node.attributes.children?.data?.length) {
    const children = node.attributes.children.data;
    let baseX = x - (children.length - 1) / 2 * NODE_WIDTH;
    children.forEach((child, i) => {
      buildFlowTree(child, depth + 1, baseX + i * NODE_WIDTH, nodes, edges, id, {}, data);
    });

    const hoidonHT = findNodeByName(data, 'Hội Đồng Học Thuật');
    const toChucCTXH = findNodeByName(data, 'Tổ Chức Chính Trị Xã Hội');

    if (hoidonHT) {
      edges.push({
        id: `extra-edge-${id}-${hoidonHT.id}`,
        source: id,
        target: String(hoidonHT.id),
        type: 'step',
        markerEnd: { type: 'arrowclosed' },
      });
    }

    if (toChucCTXH) {
      edges.push({
        id: `extra-edge-${id}-${toChucCTXH.id}`,
        source: id,
        target: String(toChucCTXH.id),
        type: 'step',
        markerEnd: { type: 'arrowclosed' },
      });
    }

    return { nodes, edges };
  }

  const children = node.attributes.children?.data || [];
  if (children.length) {
    let baseX = x - (children.length - 1) / 2 * NODE_WIDTH;
    children.forEach((child, i) => {
      buildFlowTree(child, depth + 1, baseX + i * NODE_WIDTH, nodes, edges, id, {}, data);
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
          const { nodes, edges } = buildFlowTree(rootTree, 0, 600, [], [], null, {}, data);
          setNodes(nodes);
          setEdges(edges);
          setTreeRoot(rootTree);
        }
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
        <div className="bg-light w-100" style={{ boxShadow: 'none', borderRadius: 0, overflowX: 'auto' }}>
          <div style={{ minWidth: '1200px' }}>
            <OrgChartFlow nodes={nodes} edges={edges} onNodeClick={onNodeClick} />
          </div>
        </div>
        {treeRoot && (
          <RecursiveInfoBlocks
            node={treeRoot}
            data={data}
            refs={refs}
            activeId={activeId}
          />
        )}
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
      `}</style>
    </ReactFlowProvider>
  );
}
