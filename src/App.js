import React, { useState } from 'react';
import TreeNode from './component/TreeNode';
import '../src/component/Tree.css';

const App = () => {
  const [nodes, setNodes] = useState([
    {
      id: "1",
      name: "division",
      child_modules: [
        {
          id: "1-1",
          name: "department",
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

  const handleAdd = (parentId,node) => {
    
      const newNode = { id: `${node.id}-${Date.now()}`, name: 'New Node',  path: `${node.path}/new node`, child_modules: [] };
      
    const addNode = (nodes, parentId) => {
      return nodes.map(n => {
        if (n.id === parentId) {
          n.child_modules = [...n.child_modules, newNode];
        } else if (n.child_modules.length) {
          n.child_modules = addNode(n.child_modules, parentId);
        }
        return n;
      });
    };
    
    setNodes(addNode(nodes, parentId));
    
  
  // const handleAdd = (parentId, nodeName) => {
  //   const newNode = {
  //     id: `${parentId}-${Date.now()}`,
  //     name: nodeName,
  //     path: `${parentId}/new node`,
  //     child_modules: []
  //   }
  // };

    const addNodeRecursive = (nodesList, parentId) => {
      return nodesList.map(node => {
        if (node.id === parentId) {
          node.child_modules = [...node.child_modules, newNode];
        } else if (node.child_modules.length) {
          node.child_modules = addNodeRecursive(node.child_modules, parentId);
        }
        return node;
      });
    };
    
    setNodes(addNodeRecursive(nodes, parentId)
  );
  
};
  
  

  const handleDelete = (node) => {
    const deleteNode = (nodes, parentId) => {
      return nodes.filter(n => n.id !== parentId).map(n => {
        if (n.child_modules.length) {
          n.child_modules = deleteNode(n.child_modules, parentId);
        }
        return n;
      });
    };
    
    setNodes(deleteNode(nodes, node.id));
  };

  const handleEdit = (node) => {
    const newName = prompt('Enter new name:', node.name);
    if (newName) {
      const editNode = (nodes, parentId) => {
        return nodes.map(n => {
          if (n.id === parentId) {
            n.name = newName;
          } else if (n.child_modules.length) {
            n.child_modules = editNode(n.child_modules, parentId);
          }
          return n;
        });
      };
      
      setNodes(editNode(nodes, node.id));
    }
  };

  return (
    <div>
      {nodes.map(node => (
    
        <TreeNode key={node.id} node={node} onAdd={handleAdd} onDelete={handleDelete} onEdit={handleEdit} />
        
      ))}
    </div>
  );


}
export default App;