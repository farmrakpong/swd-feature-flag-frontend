import FlagSection from './flag-section'
import JsonPreview from './json-preview'
import { createFlag, useFeatureFlagForm } from './feature-flag-form'
import type { AnyFieldApi } from '@tanstack/react-form'
import type { FeatureFlagValues } from './feature-flag-form'

function FeatureFlagEditor() {
  const form = useFeatureFlagForm()

  // flag ใหม่เป็นของเปล่าๆ ไม่ได้ก๊อปค่าของตัวข้างบนมา
  const addFlag = (field: AnyFieldApi) => {
    const list: Array<FeatureFlagValues> = field.state.value
    const maxId = list.length ? Math.max(...list.map((item) => item.id)) : 0
    field.pushValue(createFlag(maxId + 1))
  }

  return (
    <div className="grid grid-cols-[2fr_1fr]">
      <div className="min-h-screen bg-gray-50 p-6">
        {/* ฟอร์มถือหลาย flag ได้ แต่ละตัวเป็น editor เต็มชุดของตัวเอง */}
        <form.Field name="flags" mode="array">
          {(field) => (
            <>
              {field.state.value.map((flag, index) => (
                <FlagSection
                  key={flag.id}
                  form={form}
                  index={index}
                  onRemove={
                    field.state.value.length > 1
                      ? () => field.removeValue(index)
                      : undefined
                  }
                />
              ))}

              {/* action: เพิ่ม flag ใหม่ต่อท้าย */}
              <button
                type="button"
                onClick={() => addFlag(field)}
                className="flex items-center gap-2"
              >
                <span className="grid size-8 place-items-center rounded-full bg-teal-400 text-white">
                  <i className="fa-solid fa-plus" />
                </span>
                <span className="text-sm">Add another flag</span>
              </button>
            </>
          )}
        </form.Field>
      </div>
      {/* JsonPreview */}
      <JsonPreview form={form} />
    </div>
  )
}

export default FeatureFlagEditor
