function FeatureFlagEditor() {
  // const form = useForm(...)

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

        <div className="grid grid-cols-2 pt-4">
          <div>
            <p className="text-2xl">Variations</p>
          </div>
        </div>
      </div>
      <div>2</div>
    </div>
  )
}

export default FeatureFlagEditor
