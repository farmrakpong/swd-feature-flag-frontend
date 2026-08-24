import { useForm } from '@tanstack/react-form'
import type { Variations } from './types'

export interface FeatureFlagValues {
  // ชื่อ flag = key นอกสุดของ JSON เช่น "my-first-flag"
  name: string
  disable: boolean
  trackEvents: boolean
  variations: Array<Variations>
}

// ค่าเริ่มต้นของฟอร์มทั้งก้อน (เดิมคือ useState ใน editor)
export const defaultFeatureFlagValues: FeatureFlagValues = {
  name: 'my-first-flag',
  disable: true,
  trackEvents: false,
  variations: [
    { id: 1, name: 'Variation_1', value: 'true' },
    { id: 2, name: 'Variation_2', value: 'false' },
  ],
}

export function useFeatureFlagForm() {
  return useForm({
    defaultValues: defaultFeatureFlagValues,
  })
}

// type ของ form instance เอาไว้ส่งเป็น props ให้ลูก
export type FeatureFlagForm = ReturnType<typeof useFeatureFlagForm>
