import CreateOrgView from '@/components/views/create-org-view'
import React from 'react'

const CreateOrgPage = () => {
  return (
    <div className='container'>
      <div className='mt-14 [&>form]:bg-[#C4DFD9] [&>form]:py-10 [&>form]:px-5  [&>form]:rounded-lg [&>form]:mx-auto [&>form]:w-[250px] em:[&>form]:w-[400px] sm:[&>form]:w-[600px] md:[&>form]:w-[700px] lg:[&>form]:w-[800px]'>
         <CreateOrgView />
      </div>
    </div>
  )
}

export default CreateOrgPage