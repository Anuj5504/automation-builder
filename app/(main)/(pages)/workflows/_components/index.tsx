import React from 'react'
import Workflow from './workflow'

type Props = {}

const Workflows = (props: Props) => {
  return (
    <div className='relative flex flex-col gap-4'>
        <section className='flex flex-col gap-1 p-2 px-4'>
            <Workflow description='Creating a Test Workflow' id='e223232fdds' name='Automation Workflow' publish={true}/> 
        </section>
    </div>
  )
}

export default Workflows