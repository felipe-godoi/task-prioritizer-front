export interface Itask {
  description: string;
  impact: Elevel;
  complexity: Elevel;
  relevance: Elevel;
  priority?: Elevel;
};

export function ParseLevelToIndex(param?:Elevel){
  if(param == Elevel.highest) return 5;
  else if(param == Elevel.high) return 4;
  else if(param == Elevel.medium) return 3;
  else if(param == Elevel.low) return 2;
  else if(param == Elevel.lowest) return 1;
  else return 0;
}

export function ParseLevelToString(param?:Elevel){
  if(param == Elevel.highest) return 'highest';
  else if(param == Elevel.high) return 'high';
  else if(param == Elevel.medium) return 'medium';
  else if(param == Elevel.low) return 'low';
  else return 'lowest';
}

export function ParseStringToLevel(param?:string){
  if(param == 'highest') return Elevel.highest;
  else if(param == 'high') return Elevel.high;
  else if(param == 'medium') return Elevel.medium;
  else if(param == 'low') return Elevel.low;
  else return Elevel.lowest;
}

export enum Elevel {
  lowest,
  low,
  medium,
  high,
  highest
};

export function getLevelLabelFeminino(param:Elevel){
  if(param == Elevel.highest) return 'Muito Alta';
  else if(param == Elevel.high) return 'Alta';
  else if(param == Elevel.medium) return 'Média';
  else if(param == Elevel.low) return 'Baixa';
  else if(param == Elevel.lowest) return 'Muito Baixa';
  else return "error";
}

export function getLevelLabelMasculino(param:Elevel){
  if(param == Elevel.highest) return 'Muito Alto';
  else if(param == Elevel.high) return 'Alto';
  else if(param == Elevel.medium) return 'Médio';
  else if(param == Elevel.low) return 'Baixo';
  else if(param == Elevel.lowest) return 'Muito Baixo';
  else return "error";
}
