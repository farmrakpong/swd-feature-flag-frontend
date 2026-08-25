import FieldError from '../field-error'
import { operatorOptions } from './operator'
import { dynamicField } from './dynamic-field'
import type { DragSortItem } from './use-drag-sort'
import type { FeatureFlagForm } from '../feature-flag-form'

interface ConditionRowProps {
  form: FeatureFlagForm
  // path เต็มของเงื่อนไขนี้ เช่น targeting[0].conditions[1]
  path: string
  onRemove: () => void
  // ตัวจัดการลากสลับตำแหน่งของแถวนี้
  drag: DragSortItem
}

const dragHandle =
  'fa-solid fa-grip-vertical cursor-grab select-none text-gray-400 active:cursor-grabbing'
const fieldBox = 'rounded-md bg-gray-200 px-3 pt-1.5 pb-2'
const fieldLabel = 'block text-[11px] text-gray-500'
const fieldControl = 'w-full bg-transparent text-sm outline-none'

// 1 row = [drag] [Field] [Operator] [Value] [ปุ่มลบ]
function ConditionRow({ form, path, onRemove, drag }: ConditionRowProps) {
  const Field = dynamicField(form)

  return (
    <div
      {...drag.container}
      className={`grid grid-cols-[auto_1fr_1fr_1fr_auto] items-center gap-3 rounded-md ${
        drag.isDragging ? 'opacity-40' : ''
      } ${drag.isOver ? 'ring-2 ring-teal-400' : ''}`}
    >
      {/* จุดจับลาก กดค้างตรงนี้ก่อนถึงจะลากทั้งแถวได้ */}
      <i {...drag.handle} className={dragHandle} />

      {/* ช่องซ้าย: ชื่อ field ที่จะเอามาเทียบ */}
      <Field name={`${path}.field`}>
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
      </Field>

      {/* ช่องกลาง: ตัวเปรียบเทียบ (eq, ne, ge, ...) */}
      <Field name={`${path}.operator`}>
        {(field) => (
          <select
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            // อย่าใส่ fieldControl ตรงนี้ มันมี bg-transparent จะไปทับจนพื้นหลังหาย
            className={`${fieldBox} w-full cursor-pointer text-sm outline-none`}
          >
            {operatorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </Field>

      {/* ช่องขวา: ค่าที่เอาไปเทียบ */}
      <Field name={`${path}.value`}>
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
      </Field>

      {/* ลบเฉพาะแถวนี้ */}
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
