import React from "react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
interface AvaterProrps {
  src?: string | null | undefined;
}

const Avater: React.FC<AvaterProrps> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Avater"
        className="rounded-full"
        height={30}
        width={30}
      />
    );
  }
  return (
    <div>
      <FaUserCircle />
    </div>
  );
};

export default Avater;
