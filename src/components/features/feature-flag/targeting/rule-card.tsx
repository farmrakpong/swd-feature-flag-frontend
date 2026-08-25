import NodeList from './node-list'
import FieldError from '../field-error'
import type { DragSortItem } from './use-drag-sort'
import type { FeatureFlagForm } from '../feature-flag-form'

interface RuleCardProps {
  form: FeatureFlagForm
  // ตำแหน่งของ rule ใน array targeting เอาไว้ประกอบเป็นชื่อ field
  index: number
  onRemove: () => void
  // ตัวจัดการลากสลับลำดับ rule
  drag: DragSortItem
}

const dragHandle =
  'fa-solid fa-grip-vertical cursor-grab select-none text-gray-400 active:cursor-grabbing'
const fieldBox = 'rounded-md bg-gray-200 px-3 pt-1.5 pb-2'
const fieldLabel = 'block text-[11px] text-gray-500'

// 1 การ์ด = [Rule name] + [กล่องเงื่อนไข] + [Serve] และปุ่มลบอยู่นอกการ์ดด้านขวา
function RuleCard({ form, index, onRemove, drag }: RuleCardProps) {
  return (
    <div
      {...drag.container}
      className={`flex items-start gap-3 pt-3 ${
        drag.isDragging ? 'opacity-40' : ''
      }`}
    >
      {/* จุดจับลาก ลำดับ rule มีผลกับลำดับใน JSON เลยต้องสลับได้ */}
      <i {...drag.handle} className={`${dragHandle} mt-7`} />

      <div
        className={`flex-1 rounded-md border p-4 ${
          drag.isOver ? 'border-teal-400 ring-2 ring-teal-400' : 'border-teal-400'
        }`}
      >
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
              <FieldError field={field} />
            </div>
          )}
        </form.Field>

        {/* กล่องเงื่อนไขชั้นบนสุดของ rule นี้ */}
        <div className="mt-3 rounded-md border border-gray-300 p-3">
          <NodeList
            form={form}
            arrayPath={`targeting[${index}].conditions`}
            logicPath={`targeting[${index}].logic`}
          />
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
        className="mt-7 grid size-8 shrink-0 place-items-center rounded-full bg-teal-400 text-white"
      >
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  )
}

export default RuleCard
