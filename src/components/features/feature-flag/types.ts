export interface Variations {
  id: number
  name: string
  value: string
}

export interface Targeting{
    id:number
    query:string
    variation?:Variations
    percentage?:Variations
}


