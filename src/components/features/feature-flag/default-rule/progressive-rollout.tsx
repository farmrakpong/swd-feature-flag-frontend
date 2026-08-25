import FieldError from '../field-error'
import type { FeatureFlagForm } from '../feature-flag-form'
import type { Variations } from '../types'

interface ProgressiveRolloutProps {
  form: FeatureFlagForm
  // ตำแหน่งของ flag ที่ rollout ชุดนี้อยู่
  index: number
  // รายชื่อ variation ล่าสุด เอามาทำ option
  variations: Array<Variations>
}

const inputBox = 'rounded bg-gray-200 px-3 py-2 text-sm outline-none'

// input type="datetime-local" กินได้แค่รูปแบบ 2026-08-25T15:31 เท่านั้น
// toISOString ใช้ไม่ได้เพราะมันเด้งไปเป็นเวลา UTC
export function toDateTimeInput(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  const day = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

  return `${day}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

// ค่อยๆ ไล่ % ขึ้นจากวันเริ่มไปถึงวันจบ ไม่ได้สลับทีเดียว
function ProgressiveRollout({
  form,
  index,
  variations,
}: ProgressiveRolloutProps) {
  const rolloutPath = `flags[${index}].defaultRule.progressive` as const
  const usableVariations = variations.filter((item) => item.name.trim() !== '')

  // 2 แถวหน้าตาเหมือนกัน ต่างแค่ป้ายกับ path เลยทำเป็นตัวเดียวแล้วเรียกซ้ำ
  const renderStep = (step: 'initial' | 'end', label: string) => (
    <div className="flex items-center gap-3">
      <span className="w-24 text-sm">{label}</span>

      {/* วันเวลาที่จะเริ่ม / หยุดไล่ % */}
      <form.Field name={`${rolloutPath}.${step}.date`}>
        {(field) => (
          <div>
            <input
              type="datetime-local"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className={`${inputBox} w-56`}
            />
            <FieldError field={field} />
          </div>
        )}
      </form.Field>

      <span className="text-sm">and serve</span>

      {/* variation ที่จะ serve ณ จุดนี้ */}
      <form.Field name={`${rolloutPath}.${step}.variation`}>
        {(field) => (
          <select
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            className={`${inputBox} w-44 cursor-pointer`}
          >
            {usableVariations.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        )}
      </form.Field>

      <span className="text-sm">to</span>

      {/* % ณ จุดนี้ ต้นทางปกติ 0 ปลายทาง 100 */}
      <form.Field name={`${rolloutPath}.${step}.percentage`}>
        {(field) => (
          <div>
            <input
              type="number"
              min={0}
              max={100}
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              onBlur={field.handleBlur}
              className={`${inputBox} w-20`}
            />
            <FieldError field={field} />
          </div>
        )}
      </form.Field>

      <span className="text-sm">%</span>
    </div>
  )

  return (
    <div className="mt-3">
      <p className="text-sm italic">
        A progressive rollout allows you to increase the percentage of your flag
        over time.
      </p>
      <p className="text-sm italic">
        You can select a release ramp where the percentage of your flag will
        increase progressively between the start date and the end date.
      </p>

      <div className="mt-3 space-y-3">
        {renderStep('initial', 'Start on the')}
        {renderStep('end', 'Stop on the')}
      </div>
    </div>
  )
}

export default ProgressiveRollout
