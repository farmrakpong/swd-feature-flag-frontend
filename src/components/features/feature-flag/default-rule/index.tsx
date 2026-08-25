import type { FeatureFlagForm } from '../feature-flag-form'

interface DefaultRuleProps {
  form: FeatureFlagForm
}

// variation ที่จะคืนเมื่อไม่เข้าเงื่อนไข targeting ข้อไหนเลย
function DefaultRule({ form }: DefaultRuleProps) {
  return (
    <div className="pt-4">
      <p className="text-2xl">Default</p>

      <div className="mt-3 rounded-md border border-teal-400 p-4">
        <div className="flex items-center gap-3">
          <span className="text-sm">Serve</span>

          <form.Field name="defaultRule.variation">
            {(field) => (
              // ดึงชื่อ variation ล่าสุดมาทำ option
              <form.Subscribe selector={(state) => state.values.variations}>
                {(variations) => (
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-56 cursor-pointer rounded-md bg-gray-200 px-3 py-2 text-sm outline-none"
                  >
                    {variations
                      .filter((item) => item.name.trim() !== '')
                      .map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                )}
              </form.Subscribe>
            )}
          </form.Field>
        </div>
      </div>
    </div>
  )
}

export default DefaultRule
