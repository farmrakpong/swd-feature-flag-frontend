interface ToggleFieldProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

// สวิตช์เปิด/ปิด: ปิด = ปุ่มสีแดงอยู่ซ้าย, เปิด = เลื่อนไปขวาเป็นสีเขียว
function ToggleField({ label, checked, onChange }: ToggleFieldProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm">
      <span>{label}</span>
      <span className="relative inline-flex">
        {/* ซ่อน checkbox จริงไว้ แต่ยังกด Tab/Space ได้ตามปกติ */}
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

export default ToggleField
