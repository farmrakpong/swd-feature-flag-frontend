export interface Variation {
  id: number
  name: string
  value: string
}

export interface targeting{
    id:number
    query:string
    variation:string
    percentage?:Variation
}


