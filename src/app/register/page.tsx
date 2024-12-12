import Image from "next/image";
import logo from "../../../public/Logo.png"

export default function Register() {
  return (
    <div className="flex justify-around items-center h-screen">
      <div>
        <Image src={logo} alt="Logo"/>
      </div>
    </div>
  )
}
