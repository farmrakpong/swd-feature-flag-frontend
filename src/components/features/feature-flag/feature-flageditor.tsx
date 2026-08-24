import Variations from './variations'
import TargetSpecificUsers from './target-specific-users'
import { useFeatureFlagForm } from './feature-flag-form'

function FeatureFlagEditor() {
  const form = useFeatureFlagForm()

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

        {/* Variations */}
        <Variations form={form} />
       <TargetSpecificUsers />
      </div>
      <div>2</div>
    </div>
  )
}

export default FeatureFlagEditor
