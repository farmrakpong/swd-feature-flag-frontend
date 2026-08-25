import ToggleField from './toggle-field'
import FieldError from '../field-error'
import { defaultValueForType, flagTypeOptions } from '../feature-flag-form'
import type { FeatureFlagForm, FlagType } from '../feature-flag-form'

interface FlagInfoProps {
  form: FeatureFlagForm
}

// สไตล์กลางของช่องกรอก: พื้นเทา + label เล็กด้านบน
const fieldBox = 'rounded-md bg-gray-200 px-3 pt-1.5 pb-2'
const fieldLabel = 'block text-[11px] text-gray-500'
const fieldControl = 'w-full bg-transparent text-sm outline-none'

// ข้อมูลระดับ flag: ชื่อ / type / version / disable / trackEvents
function FlagInfo({ form }: FlagInfoProps) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
      {/* field: Flag Name = key นอกสุดของ JSON */}
      <form.Field name="name">
        {(field) => (
          <div>
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
            <FieldError field={field} />
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
  )
}

export default FlagInfo
