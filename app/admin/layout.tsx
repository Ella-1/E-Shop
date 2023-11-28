import { Metadata } from 'next';
import React, { ReactNode } from 'react'
import AdminNav from '../components/admin/adminNav';

export const metadata: Metadata = {
    title: "E-Commerce Admin",
    description: "Ecommerce App Admin dashboard",
  };

function AdminLayout({children}: {children: ReactNode}) {
  return (
    <div>
        <AdminNav />
        <div>
            {children}
        </div>
    </div>
  )
}

export default AdminLayout