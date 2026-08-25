import type { ReactNode } from 'react'
import type { AnyFieldApi } from '@tanstack/react-form'
import type { FeatureFlagForm } from '../feature-flag-form'

// กลุ่มเงื่อนไขซ้อนกันได้ไม่จำกัดชั้น path เลยยาวไม่เท่ากัน
// เช่น targeting[0].conditions[2].children[1].field
// TypeScript ไล่ path แบบนี้ล่วงหน้าไม่ได้ เลยห่อ form.Field ให้รับ name เป็น string
export function dynamicField(form: FeatureFlagForm) {
  return form.Field as unknown as (props: {
    name: string
    mode?: 'array'
    children: (field: AnyFieldApi) => ReactNode
  }) => ReactNode
}
