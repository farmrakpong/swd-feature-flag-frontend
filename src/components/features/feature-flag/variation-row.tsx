import { useState } from 'react'
import type { Variation } from './types'

interface VariationRowProps {
  variation: Variation
  // ส่ง id กลับขึ้นไปให้ Variations เป็นคนลบ (เจ้าของ state)
  onRemove: (id: number) => void
}

// 1 row = [dot] [Name] [Flag Value] [ปุ่มลบ]
function VariationRow({ variation, onRemove }: VariationRowProps) {

  const delVariationItem = (id:number)=>{
    onRemove(id)
  }

  return (
    <div className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-3">
      {/* dot: จุดสีประจำ variation */}
      <div className="size-2.5 rounded-full bg-gray-400" />

      {/* field: Name */}
      <div className="rounded bg-gray-200 px-3 py-2 text-sm">
        {variation.name}
      </div>

      {/* field: Flag Value */}
      <div className="rounded bg-gray-200 px-3 py-2 text-sm">
        {variation.value}
      </div>

      {/* action: ลบ variation แถวนี้ */}
      <div className="size-8 rounded-full bg-gray-300"  onClick={() => delVariationItem(variation.id)}/>
    </div>
  )
}

export default VariationRow
