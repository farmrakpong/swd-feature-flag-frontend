import { useForm } from '@tanstack/react-form'
import { featureFlagSchema } from './feature-flag-schema'
import type { Variations,Targeting,DefaultRule,Metadata } from './types'

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
  // id ไม่ได้ลง JSON มีไว้ทำ key ตอน map เฉยๆ เหมือน variations
  id: number
  // ชื่อ flag = key นอกสุดของ JSON เช่น "my-first-flag"
  name: string
  type: FlagType
  version: string
  disable: boolean
  trackEvents: boolean
  variations: Array<Variations>
  targeting:Array<Targeting>
  defaultRule:DefaultRule
  metadata:Array<Metadata>
}

// ค่าเริ่มต้นของ flag 1 ตัว
export const defaultFeatureFlagValues: FeatureFlagValues = {
  id: 1,
  name: 'my-first-flag',
  type: 'boolean',
  version: '1',
  disable: true,
  trackEvents: false,
  variations: [
    { id: 1, name: 'Variation_1', value: 'true' },
    { id: 2, name: 'Variation_2', value: 'false' },
  ],
  targeting:[],
  defaultRule:{ kind: 'variation', variation: 'Variation_1', percentage: {} },
  metadata:[]
}

// flag ที่เพิ่งกดเพิ่ม = ของตั้งต้นเปล่าๆ เปลี่ยนแค่ id กับชื่อ
// ต้อง copy array/object ข้างในด้วย ไม่งั้นทุก flag จะแก้ค่าเดียวกันหมด
export function createFlag(id: number): FeatureFlagValues {
  return {
    ...defaultFeatureFlagValues,
    id,
    // ตัวแรก id 1 เป็น my-first-flag ตัวถัดไปเลยเริ่มนับที่ new-flag-1
    name: `new-flag-${id - 1}`,
    variations: defaultFeatureFlagValues.variations.map((item) => ({ ...item })),
    targeting: [],
    defaultRule: { ...defaultFeatureFlagValues.defaultRule, percentage: {} },
    metadata: [],
  }
}

// ฟอร์มเก็บได้หลาย flag JSON ข้างขวาถึงมีหลาย key นอกสุด
export interface FeatureFlagFormValues {
  flags: Array<FeatureFlagValues>
}

// ค่าเริ่มต้นของฟอร์มทั้งก้อน
export const defaultFormValues: FeatureFlagFormValues = {
  flags: [defaultFeatureFlagValues],
}

export function useFeatureFlagForm() {
  return useForm({
    defaultValues: defaultFormValues,
    // เช็คทุกครั้งที่ค่าเปลี่ยน error จะเด้งใต้ช่องที่ผิดทันที
    validators: {
      onChange: featureFlagSchema,
    },
  })
}

// type ของ form instance เอาไว้ส่งเป็น props ให้ลูก
export type FeatureFlagForm = ReturnType<typeof useFeatureFlagForm>
