import type { AnyFieldApi } from '@tanstack/react-form'

interface FieldErrorProps {
  field: AnyFieldApi
}

// ข้อความ error ใต้ช่องกรอก โชว์เฉพาะช่องที่ผู้ใช้แตะแล้ว
// จะได้ไม่ขึ้นแดงพรืดตั้งแต่เปิดหน้ามา
function FieldError({ field }: FieldErrorProps) {
  const error = field.state.meta.errors[0]
  if (!field.state.meta.isTouched || !error) return null

  return (
    <p className="mt-1 text-xs text-red-500">
      {typeof error === 'string' ? error : error.message}
    </p>
  )
}

export default FieldError
