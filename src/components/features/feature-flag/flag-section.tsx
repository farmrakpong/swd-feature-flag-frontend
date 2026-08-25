import FlagInfo from './flag-info'
import Variations from './variations'
import TargetSpecificUsers from './targeting'
import DefaultRule from './default-rule'
import Metadata from './metadata'
import type { FeatureFlagForm } from './feature-flag-form'

interface FlagSectionProps {
  form: FeatureFlagForm
  // ตำแหน่งของ flag นี้ใน array flags ทุก section ข้างในต้องอ้างผ่านตัวนี้
  index: number
  // flag แรกลบไม่ได้ อย่างน้อยต้องเหลือไว้ 1 ตัว
  onRemove?: () => void
}

// editor 1 ชุด = flag 1 ตัว กดเพิ่มได้เรื่อยๆ แต่ละชุดแยกค่ากันคนละ index
function FlagSection({ form, index, onRemove }: FlagSectionProps) {
  return (
    <div className="relative mb-6 rounded-md border border-gray-300 bg-white p-5">
      {/* action: ลบ flag ทั้งชุด */}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-teal-400 text-white"
        >
          <i className="fa-solid fa-xmark" />
        </button>
      )}

      {/* FlagInfo */}
      <FlagInfo form={form} index={index} />

      {/* Variations */}
      <Variations form={form} index={index} />

      {/* TargetSpecificUsers  */}
      <TargetSpecificUsers form={form} index={index} />

      {/* DefaultRule */}
      <DefaultRule form={form} index={index} />

      {/* Metadata */}
      <Metadata form={form} index={index} />
    </div>
  )
}

export default FlagSection
