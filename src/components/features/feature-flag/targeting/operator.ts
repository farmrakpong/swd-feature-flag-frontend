import type { Condition, Logic, RuleNode } from '../types'
export type Operator =
  | 'EQUALS'
  | 'NOT_EQUALS'
  | 'LESS_THAN'
  | 'GREATER_THAN'
  | 'LESS_THAN_EQUAL'
  | 'GREATER_THAN_EQUAL'
  | 'CONTAINS'
  | 'STARTS_WITH'
  | 'ENDS_WITH'
  | 'IN_LIST'
  | 'PRESENT'
  | 'NOT'



export interface OperatorOption {
  label: string
  value: Operator
}

export const operatorOptions: OperatorOption[] = [
  {
    label: 'Equals To',
    value: 'EQUALS',
  },
  {
    label: 'Not Equals To',
    value: 'NOT_EQUALS',
  },
  {
    label: 'Less Than',
    value: 'LESS_THAN',
  },
  {
    label: 'Greater Than',
    value: 'GREATER_THAN',
  },
  {
    label: 'Less Than Equal To',
    value: 'LESS_THAN_EQUAL',
  },
  {
    label: 'Greater Than Equal To',
    value: 'GREATER_THAN_EQUAL',
  },
  {
    label: 'Contains',
    value: 'CONTAINS',
  },
  {
    label: 'Starts With',
    value: 'STARTS_WITH',
  },
  {
    label: 'Ends With',
    value: 'ENDS_WITH',
  },
  {
    label: 'In a List',
    value: 'IN_LIST',
  },
  {
    label: 'Present',
    value: 'PRESENT',
  },
  {
    label: 'Not',
    value: 'NOT',
  },
]

// ตัวย่อที่ GoFeatureFlag ใช้ใน query string เช่น "1 ne 1"
export const operatorToken: Record<Operator, string> = {
  EQUALS: 'eq',
  NOT_EQUALS: 'ne',
  LESS_THAN: 'lt',
  GREATER_THAN: 'gt',
  LESS_THAN_EQUAL: 'le',
  GREATER_THAN_EQUAL: 'ge',
  CONTAINS: 'co',
  STARTS_WITH: 'sw',
  ENDS_WITH: 'ew',
  IN_LIST: 'in',
  PRESENT: 'pr',
  NOT: 'not',
}

// ประกอบ 3 ช่องในแถวเงื่อนไขเป็นข้อความเดียว เช่น "f eq 5"
// ยังกรอกไม่ครบ = คืนค่าว่าง ไม่ต้องเดาให้
function conditionToText(condition: Condition): string {
  const left = condition.field.trim()
  const right = condition.value.trim()
  if (left === '' || right === '') return ''

  return `${left} ${operatorToken[condition.operator]} ${right}`
}

// กลุ่มจะเรียกตัวเองซ้ำลงไปเรื่อยๆ ตามชั้นที่ซ้อนกัน แล้วครอบวงเล็บ
function nodeToText(node: RuleNode): string {
  if (node.kind === 'condition') return conditionToText(node)

  const inner = joinNodes(node.children as Array<RuleNode>, node.logic)
  return inner === '' ? '' : `(${inner})`
}

// ต่อ node ในชั้นเดียวกันด้วย and/or และข้ามตัวที่ยังว่าง
function joinNodes(nodes: Array<RuleNode>, logic: Logic): string {
  return nodes
    .map(nodeToText)
    .filter((text) => text !== '')
    .join(` ${logic.toLowerCase()} `)
}

// "f eq 5 and a eq 5 and (u eq 8 and i eq 7)"
export function buildQuery(nodes: Array<RuleNode>, logic: Logic): string {
  return joinNodes(nodes, logic)
}