import React, { useState } from 'react';
import TreeNode from './component/TreeNode';
import '../src/component/Tree.css';
import './App.css'


const Tree = () => {
  const [nodes, setNodes] = useState([
    {
      id: "1",
      name: "Executive Management",
      child_modules: [
        {
          id: "1-1",
          name: "Management office",
          path: "/division/department",
          child_modules: [
            {
              id: "1-1-1",
              name: "General manager",
              path: "/division/department/general manager",
              child_modules: []
            },
            {
              id: "1-1-2",
              name: "hotel manager",
              path: "/division/department/hotel manager",
              child_modules: []
            },
            {
              id: "1-1-3",
              name: "pa to General manager",
              path: "/division/department/pa to general manager",
              child_modules: []
            },
            {
              id: "1-1-4",
              name: "health&safety manager",
              path: "/division/department/health&safety manager",
              child_modules: []
            }
          ]
        }
      ]
    }
  ]);

  const handleAdd = (id, nodeName) => {
    const newNode = { id: `${id}-${Date.now()}`, name: nodeName, path: `${id}/new node`, child_modules: [] };

    const addNodeRecursive = (nodesList, id) => {
      return nodesList.map(node => {
        if (node.id === id) {
          return {
            ...node,
            child_modules: [...node.child_modules, newNode]
          };
        } else if (node.child_modules.length) {
          return {
            ...node,
            child_modules: addNodeRecursive(node.child_modules, id)
          };
        }
        return node;
      });
    };

    setNodes(prevNodes => addNodeRecursive(prevNodes, id));
  };

  const handleDelete = (id) => {
    const deleteNode = (nodes, id) => {
      return nodes.filter(n => n.id !== id).map(n => {
        if (n.child_modules) {
          n.child_modules = deleteNode(n.child_modules, id);
        }
        return n;
      });
    };

    setNodes(prevNodes => deleteNode(prevNodes, id));
  };

  const handleEdit = (id, newName) => {
    if (newName) {
      const editNode = (nodes, id) => {
        return nodes.map(n => {
          if (n.id === id) {
            return { ...n, name: newName };
          } else if (n.child_modules.length) {
            return {
              ...n,
              child_modules: editNode(n.child_modules, id)
            };
          }
          return n;
        });
      };

      setNodes(prevNodes => editNode(prevNodes, id));
    }
  };

  return (
    <div>
      {nodes.map(node => (
        <TreeNode
          key={node.id}
          node={node}
          onAdd={handleAdd}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default Tree;