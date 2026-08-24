import Variations from './variations'
import TargetSpecificUsers from './targeting'
import { useFeatureFlagForm } from './feature-flag-form'

function FeatureFlagEditor() {
  const form = useFeatureFlagForm()

  return (
    <div className="grid grid-cols-[2fr_1fr]">
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="grid grid-cols-2">
          {/* field: Flag Name = key นอกสุดของ JSON */}
          <form.Field name="name">
            {(field) => (
              <div className="rounded bg-gray-200 px-3 py-1">
                <label className="block text-[11px] text-gray-500">
                  Flag Name
                </label>
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="my-first-flag"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            )}
          </form.Field>

          <div className="grid grid-cols-2">
            {/* field: disable */}
            <form.Field name="disable">
              {(field) => (
                <label className="flex items-center gap-2 px-3 text-sm">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                  />
                  Disable
                </label>
              )}
            </form.Field>

            {/* field: trackEvents */}
            <form.Field name="trackEvents">
              {(field) => (
                <label className="flex items-center gap-2 px-3 text-sm">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                  />
                  Track event
                </label>
              )}
            </form.Field>
          </div>

          <div>Flag type</div>
          <div>Version</div>
        </div>

        {/* Variations */}
        <Variations form={form} />
       <TargetSpecificUsers form={form} />
      </div>
      <div>JSON Preview</div>
    </div>
  )
}

export default FeatureFlagEditor
