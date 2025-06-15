// RecursiveInfoBlocks.js
'use client';
import React from 'react';
import InfoBlock from './InfoBlock';

function findNodeById(data, id) {
  return data.find(node => String(node.id) === String(id));
}

export default function RecursiveInfoBlocks({ node, data, refs, activeId }) {
  const nodeFull = findNodeById(data, node.id) || node;
  const blocks = nodeFull.attributes.imageBlocks?.slice(0, 2) || [];
  const nodeBlock = blocks.length > 0
    ? (
      <InfoBlock
        key={node.id}
        node={nodeFull}
        refProp={el => refs.current[node.id] = el}  // <-- callback ref (ĐÚNG)
        isActive={activeId === node.id}
      />
    ) : null;
  const children = node.attributes.children?.data || [];
  return (
    <>
      {nodeBlock}
      {children.map(child => (
        <RecursiveInfoBlocks
          key={child.id}
          node={child}
          data={data}
          refs={refs}
          activeId={activeId}
        />
      ))}
    </>
  );
}
