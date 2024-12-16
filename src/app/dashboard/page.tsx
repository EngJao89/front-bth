import { Card } from "@/components/card";
import { Header } from "@/components/header";

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="m-8">
        <div className="mt-20 ml-16">
          <h5 className="font-bold text-zinc-950 text-xl">Casos Cadastrados</h5>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-6 ml-16">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  )
}
