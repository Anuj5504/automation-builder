'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { addEdge, Connection, Controls, Edge, EdgeChange, MiniMap, NodeChange, ReactFlow, ReactFlowInstance, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { EditorCanvasCardType, EditorNode } from '@/lib/types';
import { useEditor } from '@/providers/editor-provider';
import EditorCanvasCardSingle from './editor-canvas-card-single';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { v4 } from 'uuid';
import { EditorCanvasDefaultCardTypes } from '@/lib/constants';


type Props = {}

const intialNodes: EditorNode[] = [];
const initialEdges: { id: string; source: string; target: string }[] = [];


const EditorCanvas = (props: Props) => {
    const { dispatch, state } = useEditor();
    const nodeTypes = useMemo(
        () => ({
            Action: EditorCanvasCardSingle,
            Trigger: EditorCanvasCardSingle,
            Email: EditorCanvasCardSingle,
            Condition: EditorCanvasCardSingle,
            AI: EditorCanvasCardSingle,
            Slack: EditorCanvasCardSingle,
            'Google Drive': EditorCanvasCardSingle,
            Notion: EditorCanvasCardSingle,
            Discord: EditorCanvasCardSingle,
            'Custom Webhook': EditorCanvasCardSingle,
            'Google Calendar': EditorCanvasCardSingle,
            Wait: EditorCanvasCardSingle,
        }),
        []
    )

    const [nodes, setNodes] = useState(intialNodes)
    const [edges, setEdges] = useState(initialEdges)
    const [isWorkFlowLoading, setIsWorkFlowLoading] = useState<boolean>(false)
    const [reactFlowInstance, setReactFlowInstance] =
        useState<ReactFlowInstance<EditorNode, { id: string; source: string; target: string }> | undefined>(undefined)
    const pathname = usePathname()

    const onDragOver = useCallback((event: any) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
    }, [])

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            //@ts-ignore
            setNodes((nds) => applyNodeChanges(changes, nds))
        },
        [setNodes]
    )

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) =>
            //@ts-ignore
            setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    )

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        []
    )

    const onDrop = useCallback(
        (event: any) => {
            event.preventDefault()

            const type: EditorCanvasCardType['type'] = event.dataTransfer.getData(
                'application/reactflow'
            )

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return
            }

            const triggerAlreadyExists = state.editor.elements.find(
                (node) => node.type === 'Trigger'
            )

            if (type === 'Trigger' && triggerAlreadyExists) {
                toast('Only one trigger can be added to automations at the moment')
                return
            }

            if (!reactFlowInstance) return
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            })

            const newNode = {
                id: v4(),
                type,
                position,
                data: {
                    title: type,
                    description: EditorCanvasDefaultCardTypes[type].description,
                    completed: false,
                    current: false,
                    metadata: {},
                    type: type,
                },
            }
            //@ts-ignore
            setNodes((nds) => nds.concat(newNode))
        },
        [reactFlowInstance, state]
    )

    const handleClickCanvas = () => {
        dispatch({
            type: 'SELECTED_ELEMENT',
            payload: {
                element: {
                    data: {
                        completed: false,
                        current: false,
                        description: '',
                        metadata: {},
                        title: '',
                        type: 'Trigger',
                    },
                    id: '',
                    position: { x: 0, y: 0 },
                    type: 'Trigger',
                },
            },
        })
    }

    useEffect(() => {
        dispatch({ type: 'LOAD_DATA', payload: { edges, elements: nodes } })
    }, [nodes, edges])

    // const onGetWorkFlow = async () => {
    //     setIsWorkFlowLoading(true)
    //     const response = await onGetNodesEdges(pathname.split('/').pop()!)
    //     if (response) {
    //         setEdges(JSON.parse(response.edges!))
    //         setNodes(JSON.parse(response.nodes!))
    //         setIsWorkFlowLoading(false)
    //     }
    //     setIsWorkFlowLoading(false)
    // }

    useEffect(() => {
        // onGetWorkFlow()
    }, [])

    return (
        <ResizablePanelGroup direction='horizontal' className="h-screen" >
            <ResizablePanel defaultSize={70}    >
                <div className="h-full w-full">
                    <div style={{ width: '100%', height: '100%', paddingBottom: '70px' }} className='relative'>
                            <ReactFlowProvider>


                        <ReactFlow
                            className="w-full h-full"
                            style={{ width: '100%', height: '100%' }}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            nodes={state.editor.elements}
                            onNodesChange={onNodesChange}
                            edges={edges}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onInit={(instance) => setReactFlowInstance(instance)}
                            fitView
                            onClick={handleClickCanvas}
                            nodeTypes={nodeTypes}
                            >
                            <Controls position='top-left' />
                            <MiniMap position='bottom-left' className='!bg-background' zoomable pannable />
                        </ReactFlow>
                        </ReactFlowProvider>
                    </div>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default EditorCanvas