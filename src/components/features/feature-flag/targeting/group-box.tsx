import NodeList from './node-list'
import type { DragSortItem } from './use-drag-sort'
import type { FeatureFlagForm } from '../feature-flag-form'

interface GroupBoxProps {
  form: FeatureFlagForm
  // path ของกลุ่มนี้ เช่น targeting[0].conditions[2]
  path: string
  onRemove: () => void
  // ตัวจัดการลากสลับตำแหน่งของกล่องนี้
  drag: DragSortItem
}

const dragHandle =
  'fa-solid fa-grip-vertical cursor-grab select-none text-gray-400 active:cursor-grabbing'

// กลุ่มเงื่อนไขที่ซ้อนอยู่ = กล่องมีขอบ ข้างในเป็น NodeList อีกชุด
// ตรงนี้แหละที่ทำให้ซ้อนได้ไม่จำกัดชั้น (GroupBox -> NodeList -> GroupBox -> ...)
function GroupBox({ form, path, onRemove, drag }: GroupBoxProps) {
  return (
    <div
      {...drag.container}
      className={`flex items-start gap-3 rounded-md border p-3 ${
        drag.isOver ? 'border-teal-400 ring-2 ring-teal-400' : 'border-gray-300'
      } ${drag.isDragging ? 'opacity-40' : ''}`}
    >
      {/* จุดจับลาก ลากได้ทั้งกล่องพร้อมของข้างใน */}
      <i {...drag.handle} className={`${dragHandle} mt-2.5`} />

      <div className="flex-1">
        <NodeList
          form={form}
          arrayPath={`${path}.children`}
          logicPath={`${path}.logic`}
          onRemoveGroup={onRemove}
        />
      </div>
    </div>
  )
}

export default GroupBox
