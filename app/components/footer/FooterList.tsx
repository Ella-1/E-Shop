import React from 'react'

interface FooterListProps{
    childern: React.ReactNode;
}

const FooterList: React.FC<FooterListProps > = ({childern}) => {
  return (
    <div className='w-full sm:w-1/2 md:w6-1/4 lg:w-1/6 mb-6 flex flex-col gap-2'>
        {childern}
        </div>
  )
}

export default FooterList