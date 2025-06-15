'use client';
import React, { useEffect, useState, useRef } from 'react';
import { ReactFlowProvider } from 'reactflow';
import OrgChartFlow from '@/components/tochuc/OrgChartFlow';
import RecursiveInfoBlocks from '@/components/tochuc/RecursiveInfoBlocks';
// import RecursiveInfoBlocks from '@tochuc/RecursiveInfoBlocks';

function restructureTreeForCustomLayout(data) {
  const root = data.find(x => x.attributes.name.includes('Hội Đồng Quản Lý'));
  if (!root) return data;
  const truongCN = (root.attributes.children?.data || [])
    .find(x => x.attributes.name.includes('Trường Công Nghệ'));
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
function buildFlowTree(node, depth = 0, x = 0, nodes = [], edges = [], parent = null, custom = {}) {
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
      backgroundColor: isTruongCongNghe ? '#DC2626' : '#E0E7FF', // đỏ cho trường CN
      color: isTruongCongNghe ? '#fff' : '#111827',              // chữ trắng
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

  if (parent) {
    edges.push({
      id: `e${parent}-${id}`,
      source: String(parent),
      target: id,
      type: 'step',
      markerEnd: { type: 'arrowclosed' }
    });
  }

  // CUSTOM: Nếu là root Hội Đồng Quản Lý
  if (depth === 0 && node.attributes.children?.data?.length) {
    const children = node.attributes.children.data;
    // Tìm đúng các node đặc biệt theo tên (bạn cần kiểm tra đúng tên)
    const truongCN = children.find(x => x.attributes.name.includes('Trường Công Nghệ'));
    const hoiDongHT = children.find(x => x.attributes.name.includes('Hội Đồng Học Thuật'));
    const toChucCT = children.find(x => x.attributes.name.includes('Tổ Chức Chính Trị Xã Hội'));

    // Tạo 3 vị trí: left - center - right (giả sử chỉ có 3 node này dưới root)
    const centerX = x;
    const offsetX = NODE_WIDTH * 1.5;
    // Trường Công Nghệ ở giữa
    if (truongCN) buildFlowTree(truongCN, depth + 1, centerX, nodes, edges, id, { type: 'truong' });
    // Hội đồng học thuật bên trái
    if (hoiDongHT) buildFlowTree(hoiDongHT, depth + 1, centerX - offsetX, nodes, edges, id, { type: 'left' });
    // Tổ chức chính trị xã hội bên phải
    if (toChucCT) buildFlowTree(toChucCT, depth + 1, centerX + offsetX, nodes, edges, id, { type: 'right' });

    // Các node còn lại (nếu có), vẽ thêm nếu cần
    // const otherChildren = children.filter(x => 
    //   ![truongCN, hoiDongHT, toChucCT].includes(x)
    // );
    // otherChildren.forEach((child, i) => {
    //   buildFlowTree(child, depth + 1, centerX + (i-1)*NODE_WIDTH, nodes, edges, id);
    // });

    return { nodes, edges };
  }

  // Nếu là Trường Công Nghệ, vẽ các khoa/phòng bên dưới
  if (custom.type === 'truong' && node.attributes.children?.data?.length) {
    const children = node.attributes.children.data;
    let baseX = x - (children.length - 1) / 2 * NODE_WIDTH;
    children.forEach((child, i) => {
      buildFlowTree(child, depth + 1, baseX + i * NODE_WIDTH, nodes, edges, id);
    });

    // CUSTOM: Vẽ mũi tên từ Trường Công Nghệ sang Hội Đồng Học Thuật và Tổ Chức Chính Trị Xã Hội cùng hàng
    // Đã vẽ ở trên (ở nhánh root)
    return { nodes, edges };
  }

  // Nếu là node thường, vẽ bình thường
  const children = node.attributes.children?.data || [];
  if (children.length) {
    let baseX = x - (children.length - 1) / 2 * NODE_WIDTH;
    children.forEach((child, i) => {
      buildFlowTree(child, depth + 1, baseX + i * NODE_WIDTH, nodes, edges, id);
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
        data = restructureTreeForCustomLayout(data); // <-- Thêm dòng này
        setData(data);
        const rootTree = findRootTree(data);
        if (rootTree) {
          const { nodes, edges } = buildFlowTree(rootTree, 0, 600);
          setNodes(nodes);
          setEdges(edges);
          setTreeRoot(rootTree);
          // refs...
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
    // refs.current[id] phải là DOM element
    if (id && refs.current[id]) {
      setActiveId(id);
      // refs.current[id] là <div> trong InfoBlock
      refs.current[id].scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => setActiveId(null), 1500);
    }
  };


  if (loading) return <div className="text-center mt-5">Đang tải dữ liệu...</div>;

  return (
    <ReactFlowProvider>
      <div className="container py-4">
        <h1 className="text-center bg-white mt-5 mb-0 pt-5 fw-bolder">SƠ ĐỒ TỔ CHỨC</h1>
        <div className="bg-light" style={{ boxShadow: "none", borderRadius: 0 }}>
          <OrgChartFlow nodes={nodes} edges={edges} onNodeClick={onNodeClick} />
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
