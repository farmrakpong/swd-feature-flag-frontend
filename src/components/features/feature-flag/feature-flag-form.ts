import { useForm } from '@tanstack/react-form'
import type { Variation } from './types'

export interface FeatureFlagValues {
  variations: Array<Variation>
}

// ค่าเริ่มต้นของฟอร์มทั้งก้อน (เดิมคือ useState ใน editor)
export const defaultFeatureFlagValues: FeatureFlagValues = {
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
