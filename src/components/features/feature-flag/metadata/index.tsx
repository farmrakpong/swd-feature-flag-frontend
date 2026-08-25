import MetadataRow from './metadata-row'
import type { AnyFieldApi } from '@tanstack/react-form'
import type { FeatureFlagForm } from '../feature-flag-form'
// ชื่อ type ชนกับชื่อ component ในไฟล์นี้ เลยต้อง alias
import type { Metadata as MetadataItem } from '../types'

interface MetadataProps {
  form: FeatureFlagForm
}

function Metadata({ form }: MetadataProps) {
  const addNewValue = (field: AnyFieldApi) => {
    const list: Array<MetadataItem> = field.state.value
    const maxId = list.length ? Math.max(...list.map((item) => item.id)) : 0
    field.pushValue({ id: maxId + 1, key: '', value: '' })
  }

  return (
    <div className="pt-4">
      <p className="text-2xl">Metadata</p>

      <form.Field name="metadata" mode="array">
        {(field) => (
          <>
            {/* รายการ key/value */}
            <div className="space-y-2 pt-3">
              {field.state.value.map((item, index) => (
                <MetadataRow
                  key={item.id}
                  form={form}
                  index={index}
                  onRemove={() => field.removeValue(index)}
                />
              ))}
            </div>

            {/* action: เพิ่มแถว */}
            <div
              className="mt-3 grid size-8 place-items-center rounded-full bg-teal-400 text-white"
              onClick={() => addNewValue(field)}
            >
              <i className="fa-solid fa-plus" />
            </div>
          </>
        )}
      </form.Field>
    </div>
  )
}

export default Metadata
