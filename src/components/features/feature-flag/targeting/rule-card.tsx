import { operatorOptions } from './operator'
import type { Operator } from './operator'
import type { FeatureFlagForm } from '../feature-flag-form'

interface RuleCardProps {
  form: FeatureFlagForm
  // ตำแหน่งของ rule ใน array targeting เอาไว้ประกอบเป็นชื่อ field
  index: number
  onRemove: () => void
}

const fieldBox = 'rounded-md bg-gray-200 px-3 pt-1.5 pb-2'
const fieldLabel = 'block text-[11px] text-gray-500'
const fieldControl = 'w-full bg-transparent text-sm outline-none'

// 1 การ์ด = [Rule name] + [กล่องเงื่อนไข] + [Serve] และปุ่มลบอยู่นอกการ์ดด้านขวา
function RuleCard({ form, index, onRemove }: RuleCardProps) {
  return (
    <div className="flex items-start gap-3 pt-3">
      <div className="flex-1 rounded-md border border-teal-400 p-4">
        {/* field: Rule name */}
        <form.Field name={`targeting[${index}].name`}>
          {(field) => (
            <div>
              <label className={fieldLabel}>Rule name</label>
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder={`Rule ${index + 1}`}
                className="w-full bg-transparent text-xl outline-none"
              />
            </div>
          )}
        </form.Field>

        {/* กล่องเงื่อนไข - ตอนนี้เป็น UI ล้วน ยังไม่ผูกกับ form */}
        <div className="mt-3 rounded-md border border-gray-300 p-3">
          <div className="flex items-center gap-2">
            {/* select: AND / OR */}
            <select className={`${fieldBox} w-32 cursor-pointer py-2 text-sm`}>
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>

            {/* action: เพิ่มเงื่อนไขระดับเดียวกัน */}
            <button type="button" className="rounded bg-gray-300 px-3 py-2 text-sm">
              +Rule
            </button>

            {/* action: เพิ่มกลุ่มเงื่อนไขซ้อนข้างใน (recursive) */}
            <button type="button" className="rounded bg-gray-300 px-3 py-2 text-sm">
              +Group
            </button>
          </div>

          {/* 1 row = [drag] [Field] [Operator] [Value] [ปุ่มลบ] */}
          <div className="mt-3 grid grid-cols-[auto_1fr_1fr_1fr_auto] items-center gap-3">
            {/* จุดจับลาก */}
            <i className="fa-solid fa-grip-vertical text-gray-400" />

            {/* ช่องซ้าย: ชื่อ field ที่จะเอามาเทียบ */}
            <form.Field name={`targeting[${index}].field`}>
              {(field) => (
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Field"
                  className={`${fieldBox} ${fieldControl}`}
                />
              )}
            </form.Field>

            {/* ช่องกลาง: ตัวเปรียบเทียบ (eq, ne, ge, ...) */}
            <form.Field name={`targeting[${index}].operator`}>
              {(field) => (
                <select
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(e.target.value as Operator)
                  }
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

            {/* ช่องขวา: ค่าที่เอาไปเทียบ -> รวม 3 ช่องได้ query "1 ne 1" */}
            <form.Field name={`targeting[${index}].value`}>
              {(field) => (
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Value"
                  className={`${fieldBox} ${fieldControl}`}
                />
              )}
            </form.Field>

            {/* ลบเฉพาะแถวเงื่อนไขนี้ (ไม่ใช่ลบทั้ง rule) - ยังไม่ได้ต่อ */}
            <button
              type="button"
              className="grid size-8 place-items-center rounded-full bg-teal-400 text-white"
            >
              <i className="fa-solid fa-minus" />
            </button>
          </div>
        </div>

        {/* field: Serve - variation ที่จะคืนเมื่อเงื่อนไขเป็นจริง */}
        <div className="mt-3 flex items-center gap-3">
          <span className="text-sm">Serve</span>
          <form.Field name={`targeting[${index}].variation`}>
            {(field) => (
              // ดึงรายชื่อ variation ล่าสุดมาทำ option
              <form.Subscribe selector={(state) => state.values.variations}>
                {(variations) => (
                  <select
                    value={field.state.value?.name ?? ''}
                    onChange={(e) =>
                      // form เก็บ variation เป็น object ทั้งก้อน เลยต้องหาตัวเต็มจากชื่อ
                      field.handleChange(
                        variations.find((item) => item.name === e.target.value),
                      )
                    }
                    className={`${fieldBox} w-56 cursor-pointer text-sm`}
                  >
                    {variations
                      .filter((item) => item.name.trim() !== '')
                      .map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                )}
              </form.Subscribe>
            )}
          </form.Field>
        </div>
      </div>

      {/* action: ลบ rule ทั้งการ์ด */}
      <button
        type="button"
        onClick={onRemove}
        className="mt-4 grid size-8 shrink-0 place-items-center rounded-full bg-teal-400 text-white"
      >
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  )
}

export default RuleCard
