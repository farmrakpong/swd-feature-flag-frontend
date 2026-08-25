import type { Operator } from './targeting/operator'

export interface Variations {
  id: number
  name: string
  value: string
}

export type Logic = 'AND' | 'OR'

// 1 บรรทัดเงื่อนไข = [Field] [Operator] [Value]
export interface Condition{
    kind:'condition'
    id:number
    field:string
    operator:Operator
    value:string
}

// กลุ่มเงื่อนไข = วงเล็บใน query ข้างในมีได้ทั้งเงื่อนไขและกลุ่มซ้อนกลุ่ม
// children ประกาศเป็น unknown เพราะถ้าให้ชี้กลับมาที่ RuleNode ตรงๆ
// TypeScript จะไล่ type ซ้อนไม่รู้จบจนพัง (DeepKeys ของ TanStack Form ระเบิด)
// เวลาใช้งานจริงค่อย cast กลับเป็น Array<RuleNode>
export interface Group{
    kind:'group'
    id:number
    logic:Logic
    children:Array<unknown>
}

// เช็ค node.kind แล้ว TypeScript จะรู้เองว่าเป็นตัวไหน
export type RuleNode = Condition | Group

// 1 rule = หลาย node ต่อกันด้วย and/or + variation ที่จะ serve
// ตัว query string จะถูกประกอบตอนแปลงเป็น JSON ไม่ได้เก็บซ้ำในฟอร์ม
export interface Targeting{
    id:number
    name:string
    logic:Logic
    conditions:Array<RuleNode>
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