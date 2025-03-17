import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MarkerType,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { PlusIcon, SendIcon, MessageCircleIcon, MailIcon, EyeIcon, ThumbsUpIcon, XCircleIcon } from 'lucide-react';

// Custom Node Component
const ActionNode = ({ data }) => {
  const actionIcons = {
    'connection-request': SendIcon,
    'send-message': MessageCircleIcon,
    inmail: MailIcon,
    'view-profile': EyeIcon,
    follow: ThumbsUpIcon,
    accepted: ThumbsUpIcon,
    rejected: XCircleIcon
  };

  const ActionIcon = actionIcons[data.type] || SendIcon;

  return (
    <div className="bg-white border-2 border-blue-500 rounded-lg shadow-md p-4 w-64 relative">
      <Handle type="target" position={Position.Top} id="target" className="w-4 h-4 bg-blue-500" />
      <div className="flex items-center space-x-3">
        <ActionIcon className="text-blue-500" size={20} />
        <div>
          <div className="font-semibold">{data.label}</div>
          <div className="text-sm text-gray-500">Wait: {data.waitTime} Days</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="source-accepted" className="w-4 h-4 bg-green-500 left-1/4 -translate-x-1/2" />
      <Handle type="source" position={Position.Bottom} id="source-rejected" className="w-4 h-4 bg-red-500 right-1/4 translate-x-1/2" />
    </div>
  );
};

const nodeTypes = {
  actionNode: ActionNode
};

const CampaignFlowCreator = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: 'start',
      type: 'input',
      data: { label: 'Campaign Start' },
      position: { x: 250, y: 50 },
      style: { backgroundColor: '#e6f3ff', borderColor: '#3b82f6' }
    }
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => {
      const edgeParams = {
        ...params,
        sourceHandle: params.sourceHandle || 'source',
        targetHandle: params.targetHandle || 'target',
        type: ConnectionLineType.Bezier,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6'
        },
        style: {
          stroke: '#3b82f6',
          strokeWidth: 2
        }
      };

      setEdges((eds) => addEdge(edgeParams, eds));
    },
    [setEdges]
  );

  const addActionNode = () => {
    const newId = `action-${nodes.length}`;
    const newActionNode = {
      id: newId,
      type: 'actionNode',
      data: {
        type: 'connection-request',
        label: 'Send Connection Request',
        waitTime: 2
      },
      position: { x: 200, y: nodes.length * 150 + 50 }
    };

    const acceptedNodeId = `${newId}-accepted`;
    const rejectedNodeId = `${newId}-rejected`;

    const acceptedNode = {
      id: acceptedNodeId,
      type: 'actionNode',
      data: {
        type: 'accepted',
        label: 'Accepted',
        waitTime: 3
      },
      position: { x: 100, y: nodes.length * 150 + 150 }
    };

    const rejectedNode = {
      id: rejectedNodeId,
      type: 'actionNode',
      data: {
        type: 'rejected',
        label: 'Rejected',
        waitTime: 5
      },
      position: { x: 300, y: nodes.length * 150 + 150 }
    };

    setNodes((nds) => [...nds, newActionNode, acceptedNode, rejectedNode]);

    setEdges((eds) => [
      ...eds,
      {
        id: `edge-start-${newId}`,
        source: 'start',
        target: newId,
        sourceHandle: 'source',
        targetHandle: 'target',
        type: ConnectionLineType.Bezier,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6'
        },
        style: {
          stroke: '#3b82f6',
          strokeWidth: 2
        }
      },
      {
        id: `edge-${newId}-accepted`,
        source: newId,
        target: acceptedNodeId,
        sourceHandle: 'source-accepted',
        targetHandle: 'target',
        type: ConnectionLineType.Bezier,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6'
        },
        style: {
          stroke: '#3b82f6',
          strokeWidth: 2
        }
      },
      {
        id: `edge-${newId}-rejected`,
        source: newId,
        target: rejectedNodeId,
        sourceHandle: 'source-rejected',
        targetHandle: 'target',
        type: ConnectionLineType.Bezier,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6'
        },
        style: {
          stroke: '#3b82f6',
          strokeWidth: 2
        }
      }
    ]);
  };

  return (
    <div className="w-full h-[500px]">
      {' '}
      {/* Explicit width and height */}
      <div className="p-4 bg-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold">LinkedIn Campaign Sequence</h2>
        <button
          onClick={addActionNode}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <PlusIcon size={16} />
          <span>Add Action</span>
        </button>
      </div>
      <ReactFlowProvider>
        <div style={{ height: 700, width: '100%' }}>
          {' '}
          {/* Another container with explicit height */}
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            connectionLineType={ConnectionLineType.Bezier}
            snapToGrid={true}
            proOptions={{ hideAttribution: true }}
            className="bg-gray-50" // Optional: add background color
          >
            <Controls />
            <Background color="#f3f4f6" variant="dots" />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default CampaignFlowCreator;
