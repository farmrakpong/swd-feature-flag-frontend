import type { Operator } from './targeting/operator'

export interface Variations {
  id: number
  name: string
  value: string
}

// 1 rule = 1 เงื่อนไข (field/operator/value) + variation ที่จะ serve
// ตัว query string จะถูกประกอบตอนแปลงเป็น JSON ไม่ได้เก็บซ้ำในฟอร์ม
export interface Targeting{
    id:number
    name:string
    field:string
    operator:Operator
    value:string
    variation?:Variations
    percentage?:Variations
}

// JSON ออกมาเป็น "defaultRule": { "variation": "Variation_1" }
export interface DefaultRule{
    variation: string
}
