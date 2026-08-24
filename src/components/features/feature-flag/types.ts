export interface Variations {
  id: number
  name: string
  value: string
}

export interface targeting{
    id:number
    query:string
    variation:Variations
    percentage?:Variations
}


