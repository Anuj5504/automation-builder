'use client'
import WorkflowForm from '@/components/forms/workflow-form'
import CustomModal from '@/components/global/custom-model'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal-provider'
import { Plus, PlusCircle, PlusCircleIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const WorkflowButton = (props: Props) => {
    const {setOpen,setClose}=useModal();

    const handleClick = () => {
        setOpen(
            <CustomModal title="Create a Workflow Automation" subheading="Workflows are a powerfull tool that helps you automate tasks.">
                <WorkflowForm/>
            </CustomModal>
        )
    }

    return (
        // <Button size={'icon'} className='cursor-pointer' onClick={handleClick}>
            <Plus onClick={handleClick} className='bg-white text-black rounded-sm cursor-pointer'/>
        // </Button>
    )
}

export default WorkflowButton