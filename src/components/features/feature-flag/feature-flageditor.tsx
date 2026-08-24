import { useState } from "react"

function FeatureFlagEditor() {
  // const form = useForm(...)
  const [variations, setVariations] = useState([
    { id: 1, name: 'Variation_1', value: 'true' },
    { id: 2, name: 'Variation_2', value: 'false' },
  ])
  
  return (
    <div className="grid grid-cols-[2fr_1fr]">
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="grid grid-cols-2">
          <div>flag Name</div>
          <div className="grid grid-cols-2">
            <div>Disable</div>
            <div>Track event</div>
          </div>
          <div>Flag type</div>
          <div>Version</div>
        </div>

        {/* ---------- Variations ---------- */}
        <div className="pt-4">
          <p className="text-2xl">Variations</p>

          {/* รายการ variation: 1 row = [dot] [Name] [Flag Value] [ปุ่มลบ] */}
          <div className="space-y-2 pt-3">
            {variations.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-3"
              >
                {/* dot: จุดสีประจำ variation */}
                <div className="size-2.5 rounded-full bg-gray-400" />

                {/* field: Name */}
                <div className="rounded bg-gray-200 px-3 py-2 text-sm">
                  {item.name}
                </div>

                {/* field: Flag Value */}
                <div className="rounded bg-gray-200 px-3 py-2 text-sm">
                  {item.value}
                </div>

                {/* action: ลบ variation แถวนี้ */}
                <div className="size-8 rounded-full bg-gray-300" />
              </div>
            ))}
          </div>

          {/* action: เพิ่ม variation */}
          <div className="mt-3 size-8 rounded-full bg-gray-300" />
        </div>
      </div>
      <div>2</div>
    </div>
  )
}

export default FeatureFlagEditor
