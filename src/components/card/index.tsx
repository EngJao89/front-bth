export function Card() {
  return (
    <div className="bg-zinc-200 w-10/12 rounded-md mx-3 my-4 p-3">
      <div className="mt-4 mb-2">
        <h1 className="text-zinc-950 font-bold text-sm">Caso:</h1>
      </div>
      <div>
        <h1 className="text-zinc-500 text-xs">Cadelinha Atropelada</h1>
      </div>

      <div className="mt-4 mb-2">
        <h1 className="text-zinc-950 font-bold text-sm">Descrição:</h1>
      </div>
      <div>
        <h1 className="text-zinc-500 text-xs">
          A cadelinha Jolie foi atropelada por um carro no bairro<br/> 
          Santana e teve que passar por uma cirurgia às pressas.
        </h1>
      </div>

      <div className="mt-4 mb-2">
        <h1 className="text-zinc-950 font-bold text-sm">Valor:</h1>
      </div>
      <div className="mb-4">
        <h1 className="text-zinc-500 text-xs">
          R$ 1.200,00
        </h1>
      </div>
    </div>
  )
}