import FieldError from '../field-error'
import type { FeatureFlagForm } from '../feature-flag-form'

interface VariationRowProps {
  form: FeatureFlagForm
  // ตำแหน่งของ flag ที่แถวนี้อยู่
  flagIndex: number
  // ตำแหน่งของแถวใน array variations เอาไว้ประกอบเป็นชื่อ field
  index: number
  onRemove: () => void
}

// 1 row = [dot] [Name] [Flag Value] [ปุ่มลบ]
function VariationRow({ form, flagIndex, index, onRemove }: VariationRowProps) {
  return (
    <div className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-3">
      {/* dot: จุดสีประจำ variation */}
      <div className="size-2.5 rounded-full bg-gray-400" />

      {/* field: Name */}
      <form.Field name={`flags[${flagIndex}].variations[${index}].name`}>
        {(field) => (
          <div>
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Name"
              className="w-full rounded bg-gray-200 px-3 py-2 text-sm outline-none"
            />
            <FieldError field={field} />
          </div>
        )}
      </form.Field>

      {/* field: Flag Value - หน้าตาเปลี่ยนตาม flag type ที่เลือกไว้ด้านบน */}
      <form.Field name={`flags[${flagIndex}].variations[${index}].value`}>
        {(field) => (
          <form.Subscribe
            selector={(state) => state.values.flags[flagIndex]?.type}
          >
            {(flagType) =>
              flagType === 'boolean' ? (
                // boolean มีได้แค่ 2 ค่า เลยใช้ dropdown ปิดโอกาสพิมพ์ผิด
                <select
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="rounded bg-gray-200 px-3 py-2 text-sm outline-none"
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              ) : (
                <div>
                  <input
                    // number = คีย์บอร์ดตัวเลข + เบราว์เซอร์กันตัวอักษรให้
                    type={flagType === 'number' ? 'number' : 'text'}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={
                      flagType === 'json' ? '{ "key": "value" }' : 'Flag Value'
                    }
                    className="w-full rounded bg-gray-200 px-3 py-2 text-sm outline-none"
                  />
                  <FieldError field={field} />
                </div>
              )
            }
          </form.Subscribe>
        )}
      </form.Field>

      {/* action: ลบ variation แถวนี้ */}
      <div
        className="grid size-8 place-items-center rounded-full bg-teal-400 text-white"
        onClick={onRemove}
      >
        <i className="fa-solid fa-minus" />
      </div>
    </div>
  )
}

export default VariationRow
