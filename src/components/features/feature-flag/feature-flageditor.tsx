import FlagInfo from './flag-info'
import Variations from './variations'
import TargetSpecificUsers from './targeting'
import DefaultRule from './default-rule'
import JsonPreview from './json-preview'
import { useFeatureFlagForm } from './feature-flag-form'

function FeatureFlagEditor() {
  const form = useFeatureFlagForm()

  return (
    <div className="grid grid-cols-[2fr_1fr]">
      <div className="min-h-screen bg-gray-50 p-6">
        {/* FlagInfo */}
        <FlagInfo form={form} />

        {/* Variations */}
        <Variations form={form} />

        {/* TargetSpecificUsers  */}
        <TargetSpecificUsers form={form} />

        {/* DefaultRule */}
        <DefaultRule form={form} />

      </div>
      {/* JsonPreview */}
      <JsonPreview form={form} />
    </div>
  )
}

export default FeatureFlagEditor
