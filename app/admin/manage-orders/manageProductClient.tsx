'use client'
import { Product } from '@prisma/client'
import React from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

interface ManageProductClientProps {
    products?: Product[]
}


const ManageProductClient: React.FC<ManageProductClientProps> =  ({products}) => {
  return (
    <div>
        <DataGrid
  rows={rows}
  columns={columns}
  initialState={{
    pagination: {
      paginationModel: { page: 0, pageSize: 5 },
    },
  }}
  pageSizeOptions={[5, 10]}
  checkboxSelection
/>
    </div>
  )
}

export default ManageProductClient;