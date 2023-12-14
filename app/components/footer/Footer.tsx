import React from "react";
import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import {MdFacebook} from 'react-icons/md'
import {AiFillTwitterCircle,AiFillInstagram, AiFillYoutube} from 'react-icons/ai'
function Footer() {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16 ">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="font-bold text-base mb-2">Shop Categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktops</Link>
            <Link href="#">Watches</Link>
            <Link href="#">Tvs</Link>
            <Link href="#">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="font-bold text-base mb-2">Customers Service</h3>
            <Link href="#">Service</Link>
            <Link href="#">Contact</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Return & Exchanges</Link>
            <Link href="#">Watches</Link>
            <Link href="#">FAQs</Link>
          </FooterList>

          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="font-bold text-base mb-2">About Us</h3>
            <p className="mb-2">
              All our electronic store, we are dedicatedto providing the latest
              and greatest devices and Accessories to our customers.With a wide
              selection of phones. TV's laptops, watches and accessories
            </p>
            <p>
  &apos; {new Date().getFullYear()} E~Commerce. All rights reserved{" "}
</p>

          </div>

          <FooterList>
            <div>
              <h3 className="font-bold text-base mb-2">Follow Us</h3>
              <div className="flex gap-2">
              <Link href="#"><MdFacebook  size={24}/></Link>
              <Link href="#"><AiFillTwitterCircle  size={24}/></Link>
              <Link href="#"><AiFillInstagram size={24}/></Link>
              <Link href="#"><AiFillYoutube size={24}/></Link>
              </div>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
