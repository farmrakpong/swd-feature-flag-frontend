import { useForm } from '@tanstack/react-form'
import type { Variations,Targeting } from './types'

// ชนิดของค่าที่ flag นี้จะคืน - เป็นตัวกำหนดว่า Flag Value กรอกอะไรได้
export type FlagType = 'boolean' | 'string' | 'number' | 'json'

export const flagTypeOptions: Array<FlagType> = [
  'boolean',
  'string',
  'number',
  'json',
]

// ค่าตั้งต้นของช่อง Flag Value เมื่อสลับ flag type
export function defaultValueForType(type: FlagType): string {
  switch (type) {
    case 'boolean':
      return 'true'
    case 'number':
      return '0'
    case 'json':
      return '{}'
    default:
      return ''
  }
}

export interface FeatureFlagValues {
  // ชื่อ flag = key นอกสุดของ JSON เช่น "my-first-flag"
  name: string
  type: FlagType
  version: string
  disable: boolean
  trackEvents: boolean
  variations: Array<Variations>
  targeting:Array<Targeting>
}

// ค่าเริ่มต้นของฟอร์มทั้งก้อน 
export const defaultFeatureFlagValues: FeatureFlagValues = {
  name: 'my-first-flag',
  type: 'boolean',
  version: '1',
  disable: true,
  trackEvents: false,
  variations: [
    { id: 1, name: 'Variation_1', value: 'true' },
    { id: 2, name: 'Variation_2', value: 'false' },
  ],
  targeting:[]
}

export function useFeatureFlagForm() {
  return useForm({
    defaultValues: defaultFeatureFlagValues,
  })
}

// type ของ form instance เอาไว้ส่งเป็น props ให้ลูก
export type FeatureFlagForm = ReturnType<typeof useFeatureFlagForm>
