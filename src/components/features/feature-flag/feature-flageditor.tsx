import { useState } from 'react'
import Variations from './variations'
import type { Variation } from './types'
import TargetSpecificUsers from './target-specific-users'

function FeatureFlagEditor() {
  // const form = useForm(...)
  const [variations, setVariations] = useState<Array<Variation>>([
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

        {/* Variations */}
        <Variations variations={variations} />
       <TargetSpecificUsers />
      </div>
      <div>2</div>
    </div>
  )
}

export default FeatureFlagEditor
