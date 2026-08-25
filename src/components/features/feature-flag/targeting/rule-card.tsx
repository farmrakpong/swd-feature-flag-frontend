import ConditionRow from './condition-row'
import FieldError from '../field-error'
import type { AnyFieldApi } from '@tanstack/react-form'
import type { FeatureFlagForm } from '../feature-flag-form'
import type { Condition } from '../types'

interface RuleCardProps {
  form: FeatureFlagForm
  // ตำแหน่งของ rule ใน array targeting เอาไว้ประกอบเป็นชื่อ field
  index: number
  onRemove: () => void
}

const fieldBox = 'rounded-md bg-gray-200 px-3 pt-1.5 pb-2'
const fieldLabel = 'block text-[11px] text-gray-500'

// 1 การ์ด = [Rule name] + [กล่องเงื่อนไข] + [Serve] และปุ่มลบอยู่นอกการ์ดด้านขวา
function RuleCard({ form, index, onRemove }: RuleCardProps) {
  // ปุ่ม +Rule = เพิ่มอีก 1 บรรทัดเงื่อนไขในกฎเดียวกัน
  const addCondition = (field: AnyFieldApi) => {
    const list: Array<Condition> = field.state.value
    const maxId = list.length ? Math.max(...list.map((item) => item.id)) : 0
    field.pushValue({ id: maxId + 1, field: '', operator: 'EQUALS', value: '' })
  }

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
              <FieldError field={field} />
            </div>
          )}
        </form.Field>

        {/* กล่องเงื่อนไขของ rule นี้ */}
        <div className="mt-3 rounded-md border border-gray-300 p-3">
          <form.Field name={`targeting[${index}].conditions`} mode="array">
            {(conditionsField) => (
              <>
                <div className="flex items-center gap-2">
                  {/* ตัวเชื่อมระหว่างเงื่อนไข -> " and " / " or " ใน query */}
                  <form.Field name={`targeting[${index}].logic`}>
                    {(field) => (
                      <select
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(e.target.value as 'AND' | 'OR')
                        }
                        className={`${fieldBox} w-32 cursor-pointer py-2 text-sm`}
                      >
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                    )}
                  </form.Field>

                  {/* action: เพิ่มเงื่อนไขระดับเดียวกัน */}
                  <button
                    type="button"
                    onClick={() => addCondition(conditionsField)}
                    className="rounded bg-gray-300 px-3 py-2 text-sm"
                  >
                    +Rule
                  </button>

                  {/* action: เพิ่มกลุ่มเงื่อนไขซ้อนข้างใน (recursive) - ยังไม่ได้ต่อ */}
                  <button
                    type="button"
                    className="rounded bg-gray-300 px-3 py-2 text-sm"
                  >
                    +Group
                  </button>
                </div>

                {/* รายการเงื่อนไขของ rule นี้ */}
                <div className="mt-3 space-y-3">
                  {conditionsField.state.value.map((condition, conditionIndex) => (
                    <ConditionRow
                      key={condition.id}
                      form={form}
                      ruleIndex={index}
                      index={conditionIndex}
                      onRemove={() => conditionsField.removeValue(conditionIndex)}
                    />
                  ))}
                </div>
              </>
            )}
          </form.Field>
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
