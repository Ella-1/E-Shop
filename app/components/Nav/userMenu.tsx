"use client";
import { Avatar } from "@mui/material";
import React, { useCallback, useState } from "react";
import Avater from "../avater";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import { MenuItems } from "./menuItems";
import { signOut } from "next-auth/react";
import { BackDrop } from "./backDrop";
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

export const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
  const [isOpen, setIsOpen] = useState(false);

  // toggle the state fromtrue to flas and from flase to true
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="p-2 border-[1px]  border-slate-400 flex flex-grow item-center gap-1 rounded-full cursor-pointer hover:shadow-md text-slate-700 hover:duration-300"
        >
          <Avater />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className="absolute rounded-md w-[170px] mt-2overflow-hidden right-0 bg-slate-400 top-12 text-sm flex flex-col cursor-pointer ">
            {currentUser ? (
              <div>
                <Link href={"/orders"}>
                  <MenuItems onClick={toggleOpen}>Your Orders</MenuItems>
                </Link>
                <Link href={"/admin"}>
                  <MenuItems onClick={toggleOpen}>Admin Dashboard</MenuItems>
                </Link>

                <MenuItems
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Logout
                </MenuItems>
              </div>
            ) : (
              <div>
                <div>
                  <Link href={"/login"}>
                    <MenuItems onClick={toggleOpen}>Login</MenuItems>
                  </Link>
                  <Link href={"/register"}>
                    <MenuItems onClick={toggleOpen}>Register</MenuItems>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};
