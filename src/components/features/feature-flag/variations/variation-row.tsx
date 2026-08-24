import type { FeatureFlagForm } from '../feature-flag-form'

interface VariationRowProps {
  form: FeatureFlagForm
  // ตำแหน่งของแถวใน array variations เอาไว้ประกอบเป็นชื่อ field
  index: number
  onRemove: () => void
}

// 1 row = [dot] [Name] [Flag Value] [ปุ่มลบ]
function VariationRow({ form, index, onRemove }: VariationRowProps) {
  return (
    <div className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-3">
      {/* dot: จุดสีประจำ variation */}
      <div className="size-2.5 rounded-full bg-gray-400" />

      {/* field: Name */}
      <form.Field name={`variations[${index}].name`}>
        {(field) => (
          <input
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder="Name"
            className="rounded bg-gray-200 px-3 py-2 text-sm outline-none"
          />
        )}
      </form.Field>

      {/* field: Flag Value */}
      <form.Field name={`variations[${index}].value`}>
        {(field) => (
          <input
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder="Flag Value"
            className="rounded bg-gray-200 px-3 py-2 text-sm outline-none"
          />
        )}
      </form.Field>

      {/* action: ลบ variation แถวนี้ */}
      <div className="size-8 rounded-full bg-gray-300" onClick={onRemove} />
    </div>
  )
}

export default VariationRow
