import FieldError from '../field-error'
import { operatorOptions } from './operator'
import type { Operator } from './operator'
import type { FeatureFlagForm } from '../feature-flag-form'

interface ConditionRowProps {
  form: FeatureFlagForm
  // ตำแหน่งของ rule ใน targeting
  ruleIndex: number
  // ตำแหน่งของเงื่อนไขใน rule นั้น
  index: number
  onRemove: () => void
}

const fieldBox = 'rounded-md bg-gray-200 px-3 pt-1.5 pb-2'
const fieldLabel = 'block text-[11px] text-gray-500'
const fieldControl = 'w-full bg-transparent text-sm outline-none'

// 1 row = [drag] [Field] [Operator] [Value] [ปุ่มลบ]
function ConditionRow({ form, ruleIndex, index, onRemove }: ConditionRowProps) {
  const path = `targeting[${ruleIndex}].conditions[${index}]` as const

  return (
    <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] items-center gap-3">
      {/* จุดจับลาก */}
      <i className="fa-solid fa-grip-vertical text-gray-400" />

      {/* ช่องซ้าย: ชื่อ field ที่จะเอามาเทียบ */}
      <form.Field name={`${path}.field`}>
        {(field) => (
          <div>
            <div className={fieldBox}>
              <label className={fieldLabel}>Field</label>
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className={fieldControl}
              />
            </div>
            <FieldError field={field} />
          </div>
        )}
      </form.Field>

      {/* ช่องกลาง: ตัวเปรียบเทียบ (eq, ne, ge, ...) */}
      <form.Field name={`${path}.operator`}>
        {(field) => (
          <select
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value as Operator)}
            className={`${fieldBox} ${fieldControl} cursor-pointer`}
          >
            {operatorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </form.Field>

      {/* ช่องขวา: ค่าที่เอาไปเทียบ */}
      <form.Field name={`${path}.value`}>
        {(field) => (
          <div>
            <div className={fieldBox}>
              <label className={fieldLabel}>Value</label>
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className={fieldControl}
              />
            </div>
            <FieldError field={field} />
          </div>
        )}
      </form.Field>

      {/* ลบเฉพาะแถวนี้ ไม่ใช่ลบทั้ง rule */}
      <button
        type="button"
        onClick={onRemove}
        className="grid size-8 place-items-center rounded-full bg-teal-400 text-white"
      >
        <i className="fa-solid fa-minus" />
      </button>
    </div>
  )
}

export default ConditionRow
