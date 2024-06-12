import React, { useState } from 'react';

const TreeNode = ({ node, addNode, deleteNode, editNode }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleAddClick = () => {
    const nodeName = prompt("Enter the name of the new node:");
    if (nodeName) {
      addNode(node.id, nodeName);
    }
  };


  const handleDeleteClick = () => {
    deleteNode(node.id);
  };

  const handleEditClick = () => {
    const newNodeName = prompt("Enter the new name of the node", node.name);
    if (newNodeName) {
      editNode(node.id, newNodeName);
    }
  };

  return (
    <>
    <div className='container'>
      <div className="tree-node" onClick={toggleExpand}>
        
        {node.child_modules && node.child_modules.length > 0 && (
          <span className={`tree-toggler ${expanded ? 'expanded' : ''}`} >
            {expanded ? '-' : '+'}
          </span>
        )}
        

        {node.name}
        <div className='buttns'>
        <button onClick={() => handleAddClick(node)}>Add</button>
        <button onClick={() => handleDeleteClick(node)}>Edit</button>
        <button onClick={() => handleEditClick(node)}>Delete</button>
        </div>
        </div>

        
        
     
      
      {expanded && node.child_modules && node.child_modules.length > 0 && (
        <ul className="tree-child_modules">
          {node.child_modules.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              addNode={addNode}
              deleteNode={deleteNode}
              editNode={editNode}
            />
          ))}
        </ul>
      )}
      </div>
    </>
  );
};

export default TreeNode;
