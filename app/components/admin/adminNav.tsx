"use client"
import React from "react";
import Container from "../Container";
import Link from "next/link";
import AdminNavItem from "./adminNavItem";
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md";
import { usePathname } from "next/navigation";

function AdminNav() {
const pathname = usePathname() //to know the current path we are on

  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4 ">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          
          <Link href={'/admin'}>
          <AdminNavItem  label="Summary" icon={MdDashboard} selected={pathname === '/admins'}/>
          </Link>

          <Link href={'/admin/add-products'}>
          <AdminNavItem  label="Add Products" icon={MdLibraryAdd} selected={pathname === '/admin/add-products'}/>
          </Link>

          <Link href={'/admin/manage-products'}>
          <AdminNavItem  label="Manage Products" icon={MdDns} selected={pathname === '/admin/manage-products'}/>
          </Link>

          <Link href={'/admin/manage-orders'}>
          <AdminNavItem  label="Manage Ordrs" icon={MdFormatListBulleted} selected={pathname === '/admin/manage-orders'}/>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default AdminNav;
