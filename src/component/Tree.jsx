// src/components/Tree.jsx
import React from 'react';
import TreeNode from './TreeNode';



const Tree = ({ data }) => {
  return (
    <div className="tree-container">
      
      <ul className="tree-root">
        {data.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </ul>
    </div>
  );
};

export default Tree;