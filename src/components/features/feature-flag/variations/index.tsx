import VariationRow from './variation-row'
import type { AnyFieldApi } from '@tanstack/react-form'
import type { FeatureFlagForm } from '../feature-flag-form'
// ชื่อ type ชนกับชื่อ component ในไฟล์นี้ เลยต้อง alias
import type { Variations as VariationItem } from '../types'

interface VariationsProps {
  form: FeatureFlagForm
}

function Variations({ form }: VariationsProps) {
  
  const addNewValue = (field:AnyFieldApi)=>{
                const list: Array<VariationItem> = field.state.value
                const maxId = list.length ? Math.max(...list.map((item) => item.id)) : 0
                field.pushValue({ id: maxId + 1, name: '', value: '' })
  }
  return (
    <div className="pt-4">
      <p className="text-2xl">Variations</p>

      {/* mode="array" = บอก form ว่า field นี้เป็น array มี pushValue / removeValue ให้ใช้ */}
      <form.Field name="variations" mode="array">
        {(field) => (
          <>
            {/* รายการ variation */}
            <div className="space-y-2 pt-3">
              {field.state.value.map((item, index) => (
                <VariationRow
                  key={item.id}
                  form={form}
                  index={index}
                  onRemove={() => field.removeValue(index)}
                />
              ))}
            </div>

            {/* action: เพิ่ม variation */}
            <div
              className="mt-3 size-8 rounded-full bg-gray-300"
              onClick={() => addNewValue(field)}
            />
          </>
        )}
      </form.Field>
    </div>
  )
}

export default Variations
