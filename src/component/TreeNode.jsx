import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

const TreeNode = ({ node, onAdd, onDelete, onEdit }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleAddClick = () => {
    const nodeName = prompt("Enter the name of the new node:", node.name);
    if (nodeName) {
      onAdd(node.id, nodeName);
    }
  };


  const handleDeleteClick = () => {
    onDelete(node.id);
  };

  const handleEditClick = () => {
    const newNodeName = prompt("Enter the new name of the node", node.name);
    if (newNodeName) {
      onEdit(node.id, newNodeName);
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
        
        <button onClick={ handleAddClick}><IoMdAdd /></button>
        <button onClick={handleEditClick}><CiEdit /></button>
       <button onClick={handleDeleteClick}><MdDeleteOutline /></button>
       
        </div>
      {expanded && node.child_modules && node.child_modules.length > 0 && (
        <ul className="tree-child_modules">
          {node.child_modules.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onAdd={onAdd}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
      </div>
    </>
  );
};

export default TreeNode;
