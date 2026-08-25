import FieldError from '../field-error'
import type { FeatureFlagForm } from '../feature-flag-form'

interface MetadataRowProps {
  form: FeatureFlagForm
  // ตำแหน่งของ flag ที่แถวนี้อยู่
  flagIndex: number
  // ตำแหน่งของแถวใน array metadata เอาไว้ประกอบเป็นชื่อ field
  index: number
  onRemove: () => void
}

// 1 row = [Key] [Value] [ปุ่มลบ]
function MetadataRow({ form, flagIndex, index, onRemove }: MetadataRowProps) {
  return (
    <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-3">
      {/* ช่องซ้าย: key ที่จะไปเป็นชื่อ property ใน JSON */}
      <form.Field name={`flags[${flagIndex}].metadata[${index}].key`}>
        {(field) => (
          <div>
            <div className="rounded-md bg-gray-200 px-3 pt-1.5 pb-2">
              <label className="block text-[11px] text-gray-500">Key</label>
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            <FieldError field={field} />
          </div>
        )}
      </form.Field>

      {/* ช่องขวา: ค่าของ key นั้น */}
      <form.Field name={`flags[${flagIndex}].metadata[${index}].value`}>
        {(field) => (
          <div className="rounded-md bg-gray-200 px-3 pt-1.5 pb-2">
            <label className="block text-[11px] text-gray-500">Value</label>
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        )}
      </form.Field>

      {/* ลบแถวนี้ */}
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

export default MetadataRow
