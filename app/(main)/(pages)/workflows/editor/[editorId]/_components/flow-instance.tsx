import { Button } from '@/components/ui/button';
import { useNodeConnections } from '@xyflow/react';
import { usePathname } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { onCreateNodesEdges, onFlowPublish } from '../_actions/workflowConnection';
import { toast } from 'sonner';

type Props = {
    children: React.ReactNode
    edges: any[]
    nodes: any[]
}

const FlowInstance = ({ children, edges, nodes }: Props) => {
    const pathname = usePathname();
    const [isFlow, setisFlow] = useState([]);
    //    const nodeConnection = useNodeConnections();

    //     const onFlowAutomation=useCallback(async ()=>{
    //         const flow=await onCreateNodesEdges(
    //             pathname.split('/').pop()!,
    //             JSON.stringify(nodes),
    //             JSON.stringify(edges),
    //             JSON.stringify(isFlow)
    //         )
    //         if(flow) toast.message(flow.message)
    //     },[nodeConnection])

    const [flowConnections, setFlowConnections] = useState<any[]>([]);

    const onFlowAutomation = useCallback(async () => {
        const flow = await onCreateNodesEdges(
            pathname.split('/').pop()!,
            JSON.stringify(nodes),
            JSON.stringify(edges),
            JSON.stringify(flowConnections)
        );
        if (flow) toast.success(flow.message);
    }, [pathname, nodes, edges, flowConnections]);
    const onPublishWorkflow = useCallback(async () => {
        const response = await onFlowPublish(pathname.split('/').pop()!, true)
        if (response) toast.message(response)

    }, [])
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-3 p-4'>
                <Button onClick={onFlowAutomation} disabled={isFlow.length < 1}>
                    Save
                </Button>
                <Button onClick={onPublishWorkflow} disabled={isFlow.length < 1}>
                    Publish
                </Button>
            </div>
            {children}
        </div>
    )
}

export default FlowInstance