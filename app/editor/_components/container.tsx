"use client";

import Sidebar from './sidebar/sidebar'
import Tools from './tools/tool'
import WorkspaceContainer from './workspace/workspaceContainer'
import useSidebarStore from '@/store/sidebar'

function Container() {
  const { isOpen } = useSidebarStore();

  return (
    <section className='w-full flex-1 flex min-h-0'>
        {/* Sidebar - Dynamic width based on state */}
        <div 
          className={`transition-all duration-300 ease-in-out ${
            isOpen ? 'w-[40%] max-w-[390px]' : 'w-[20%] max-w-[70px]'
          }`}
        >
            <Sidebar />
        </div>
        
        {/* Main content area - Auto width to fill remaining space */}
        <div 
          className={`w-auto flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
            isOpen ? 'w-[60%]' : 'w-[80%]'
          }`}
        >
            <Tools />
            <WorkspaceContainer />
        </div>
    </section>
  )
}

export default Container