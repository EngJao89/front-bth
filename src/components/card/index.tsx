'use client';

interface IncidentData {
  title: string;
  description: string;
  value: string;
}

interface CardProps {
  incident: IncidentData;
}

export function Card({ incident }: CardProps) {
  return (
    <div className="bg-zinc-200 w-10/12 rounded-md mx-3 my-4 p-3">
      <div className="mt-4 mb-2">
        <h1 className="text-zinc-950 font-bold text-sm">Caso:</h1>
      </div>
      <div>
        <h1 className="text-zinc-500 text-xs">{incident.title}</h1>
      </div>

      <div className="mt-4 mb-2">
        <h1 className="text-zinc-950 font-bold text-sm">Descrição:</h1>
      </div>
      <div>
        <h1 className="text-zinc-500 text-xs">{incident.description}</h1>
      </div>

      <div className="mt-4 mb-2">
        <h1 className="text-zinc-950 font-bold text-sm">Valor:</h1>
      </div>
      <div className="mb-4">
        <h1 className="text-zinc-500 text-xs">R$ {incident.value}</h1>
      </div>
    </div>
  );
}
