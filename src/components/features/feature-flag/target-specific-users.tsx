// import VariationRow from './variation-row'
// import type { Variation } from './types'

// interface VariationsProps {
//   variations: Array<Variation>
// }

import { GripVertical, Minus, Plus, X } from 'lucide-react'

function TargetSpecificUsers() {
  return (
    <div className="pt-4">
      <p className="text-2xl">Target specific users</p>

      {/* 1 rule = การ์ด 1 ใบ + ปุ่มลบ rule อยู่นอกการ์ดด้านขวา */}
      <div className="flex items-start gap-3 pt-3">
        <div className="flex-1 rounded border border-gray-300 p-4">
          {/* field: Rule name */}
          <div>
            <label className="block text-[11px] text-gray-500">Rule name</label>
            <input
              defaultValue="Rule 1"
              className="w-full bg-transparent text-2xl outline-none"
            />
          </div>

          {/* กล่องเงื่อนไขของ rule นี้ */}
          <div className="mt-3 rounded border border-gray-300 p-3">
            {/* toolbar: AND/OR + ปุ่มเพิ่ม */}
            <div className="flex items-center gap-2">
              <select
                defaultValue="AND"
                className="w-32 rounded bg-gray-200 px-3 py-2 text-sm outline-none"
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>

              <button
                type="button"
                className="rounded bg-gray-300 px-3 py-2 text-sm"
              >
                +Rule
              </button>
              <button
                type="button"
                className="rounded bg-gray-300 px-3 py-2 text-sm"
              >
                +Group
              </button>
            </div>

            {/* 1 row = [drag] [Field] [Operator] [Value] [ปุ่มลบ] */}
            <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] items-center gap-3 pt-3">
              <GripVertical className="size-4 text-gray-400" />

              <input
                placeholder="Field"
                className="rounded bg-gray-200 px-3 py-2 text-sm outline-none"
              />

              <select
                defaultValue="eq"
                className="rounded bg-gray-200 px-3 py-2 text-sm outline-none"
              >
                <option value="eq">Equals To</option>
                <option value="ne">Not Equals To</option>
                <option value="contains">Contains</option>
              </select>

              <input
                placeholder="Value"
                className="rounded bg-gray-200 px-3 py-2 text-sm outline-none"
              />

              <button
                type="button"
                className="grid size-8 place-items-center rounded-full bg-teal-400 text-white"
              >
                <Minus className="size-4" />
              </button>
            </div>

            {/* จุดวาง group ซ้อน (recursive) ทีหลัง */}
          </div>

          {/* select: Serve - variation ที่จะคืนเมื่อเงื่อนไขเป็นจริง */}
          <div className="mt-3 flex items-center gap-3">
            <span className="text-sm">Serve</span>
            <select className="w-56 rounded bg-gray-200 px-3 py-2 text-sm outline-none">
              <option value="Variation_1">Variation_1</option>
              <option value="Variation_2">Variation_2</option>
            </select>
          </div>
        </div>

        {/* action: ลบ rule ทั้งการ์ด */}
        <button
          type="button"
          className="grid size-8 place-items-center rounded-full bg-teal-400 text-white"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* action: เพิ่ม rule */}
      <button
        type="button"
        className="mt-3 grid size-8 place-items-center rounded-full bg-teal-400 text-white"
      >
        <Plus className="size-4" />
      </button>
    </div>
  )
}

export default TargetSpecificUsers
