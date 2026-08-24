import Variations from './variations'
import TargetSpecificUsers from './targeting'
import JsonPreview from './json-preview'
import {
  defaultValueForType,
  flagTypeOptions,
  useFeatureFlagForm,
} from './feature-flag-form'
import type { FlagType } from './feature-flag-form'

// สไตล์กลางของช่องกรอก: พื้นเทา + label เล็กด้านบน
const fieldBox = 'rounded-md bg-gray-200 px-3 pt-1.5 pb-2'
const fieldLabel = 'block text-[11px] text-gray-500'
const fieldControl = 'w-full bg-transparent text-sm outline-none'

// สวิตช์เปิด/ปิด: ปิด = ปุ่มสีแดง, เปิด = ปุ่มสีเขียว
function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm">
      <span>{label}</span>
      <span className="relative inline-flex">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span className="block h-6 w-11 rounded-full bg-gray-200" />
        <span className="pointer-events-none absolute top-0.5 left-0.5 size-5 rounded-full bg-red-400 transition-transform peer-checked:translate-x-5 peer-checked:bg-teal-400" />
      </span>
    </label>
  )
}

function FeatureFlagEditor() {
  const form = useFeatureFlagForm()

  return (
    <div className="grid grid-cols-[2fr_1fr]">
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {/* field: Flag Name = key นอกสุดของ JSON */}
          <form.Field name="name">
            {(field) => (
              <div className={fieldBox}>
                <label className={fieldLabel}>Flag Name</label>
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="my-first-flag"
                  className={fieldControl}
                />
              </div>
            )}
          </form.Field>

          <div className="grid grid-cols-2 items-center">
            {/* field: disable */}
            <form.Field name="disable">
              {(field) => (
                <ToggleField
                  label="Disable"
                  checked={field.state.value}
                  onChange={field.handleChange}
                />
              )}
            </form.Field>

            {/* field: trackEvents */}
            <form.Field name="trackEvents">
              {(field) => (
                <ToggleField
                  label="Track event"
                  checked={field.state.value}
                  onChange={field.handleChange}
                />
              )}
            </form.Field>
          </div>

          {/* field: Flag Type - คุมว่า Flag Value ของทุกแถวกรอกอะไรได้ */}
          <form.Field name="type">
            {(field) => (
              <div className={`${fieldBox} w-2/3`}>
                <label className={fieldLabel}>Flag type</label>
                <select
                  value={field.state.value}
                  onChange={(e) => {
                    const nextType = e.target.value as FlagType
                    field.handleChange(nextType)

                    // ค่าเก่าใช้กับ type ใหม่ไม่ได้ (เช่น "true" ตอนเปลี่ยนไป json)
                    // เลยรีเซ็ต Flag Value ทุกแถวให้ตรงกับ type ที่เพิ่งเลือก
                    form.getFieldValue('variations').forEach((_, i) => {
                      form.setFieldValue(
                        `variations[${i}].value`,
                        defaultValueForType(nextType),
                      )
                    })
                  }}
                  className={`${fieldControl} cursor-pointer`}
                >
                  {flagTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </form.Field>

          {/* field: Version */}
          <form.Field name="version">
            {(field) => (
              <div className={`${fieldBox} w-2/3`}>
                <label className={fieldLabel}>Version</label>
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="1"
                  className={fieldControl}
                />
              </div>
            )}
          </form.Field>
        </div>

        {/* Variations */}
        <Variations form={form} />
        <TargetSpecificUsers form={form} />
      </div>
      <JsonPreview form={form} />
    </div>
  )
}

export default FeatureFlagEditor
