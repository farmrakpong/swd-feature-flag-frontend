import NodeList from './node-list'
import type { FeatureFlagForm } from '../feature-flag-form'

interface GroupBoxProps {
  form: FeatureFlagForm
  // path ของกลุ่มนี้ เช่น targeting[0].conditions[2]
  path: string
  onRemove: () => void
}

// กลุ่มเงื่อนไขที่ซ้อนอยู่ = กล่องมีขอบ ข้างในเป็น NodeList อีกชุด
// ตรงนี้แหละที่ทำให้ซ้อนได้ไม่จำกัดชั้น (GroupBox -> NodeList -> GroupBox -> ...)
function GroupBox({ form, path, onRemove }: GroupBoxProps) {
  return (
    <div className="rounded-md border border-gray-300 p-3">
      <NodeList
        form={form}
        arrayPath={`${path}.children`}
        logicPath={`${path}.logic`}
        onRemoveGroup={onRemove}
      />
    </div>
  )
}

export default GroupBox
