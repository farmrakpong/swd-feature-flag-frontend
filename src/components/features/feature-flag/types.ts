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

// JSON ออกมาเป็น "metadata": { "key": "value" }
// ฟอร์มเก็บเป็น array เพราะต้องมี id ไว้ทำ key ตอน map / ลบแถว
export interface Metadata{
    id: number
    key: string
    value: string
}

// serve ได้ 2 แบบ เลือกอย่างใดอย่างหนึ่ง
// variation  -> "defaultRule": { "variation": "Variation_1" }
// percentage -> "defaultRule": { "percentage": { "Variation_1": 1, "Variation_2": 0 } }
export interface DefaultRule{
    kind: 'variation' | 'percentage'
    variation: string
    // key = ชื่อ variation, value = เปอร์เซ็นต์
    percentage: Record<string, number>
}