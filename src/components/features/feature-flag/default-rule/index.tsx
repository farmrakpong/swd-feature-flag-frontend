import type { FeatureFlagForm } from '../feature-flag-form'

interface DefaultRuleProps {
  form: FeatureFlagForm
}

// ค่าใน <select> ที่ไม่ใช่ชื่อ variation ใช้บอกว่าเลือกโหมดแบ่ง %
const PERCENTAGE_OPTION = '__percentage__'

// variation ที่จะคืนเมื่อไม่เข้าเงื่อนไข targeting ข้อไหนเลย
function DefaultRule({ form }: DefaultRuleProps) {
  // อัปเดต % ของ variation ตัวเดียว โดยไม่ทับตัวอื่น
  const setPercentage = (name: string, percent: number) => {
    form.setFieldValue('defaultRule.percentage', {
      ...form.getFieldValue('defaultRule.percentage'),
      [name]: percent,
    })
  }

  return (
    <div className="pt-4">
      <p className="text-2xl">Default</p>

      <div className="mt-3 rounded-md border border-teal-400 p-4">
        {/* ดึงชื่อ variation ล่าสุดมาทำ option และทำรายการ % */}
        <form.Subscribe selector={(state) => state.values.variations}>
          {(variations) => (
            <form.Field name="defaultRule.kind">
              {(kindField) => (
                <>
                  <div className="flex items-center gap-3">
                    <span className="text-sm">Serve</span>

                    <form.Field name="defaultRule.variation">
                      {(variationField) => (
                        <select
                          value={
                            kindField.state.value === 'percentage'
                              ? PERCENTAGE_OPTION
                              : variationField.state.value
                          }
                          onChange={(e) => {
                            if (e.target.value === PERCENTAGE_OPTION) {
                              kindField.handleChange('percentage')
                              return
                            }
                            kindField.handleChange('variation')
                            variationField.handleChange(e.target.value)
                          }}
                          className="w-56 cursor-pointer rounded-md bg-gray-200 px-3 py-2 text-sm outline-none"
                        >
                          {variations
                            .filter((item) => item.name.trim() !== '')
                            .map((item) => (
                              <option key={item.id} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          <option value={PERCENTAGE_OPTION}>
                            a percentage rollout
                          </option>
                        </select>
                      )}
                    </form.Field>
                  </div>

                  {/* โหมดแบ่ง % เท่านั้นที่มีส่วนนี้ */}
                  {kindField.state.value === 'percentage' && (
                    <form.Field name="defaultRule.percentage">
                      {(percentageField) => (
                        <div className="mt-3">
                          <p className="text-sm italic">
                            A percentage rollout means that your users are
                            divided in different buckets and you serve different
                            variations to them. Note that a user will always
                            have the same variation.
                          </p>

                          {/* ช่องกรอก % ของแต่ละ variation */}
                          <ul className="mt-3 space-y-2">
                            {variations
                              .filter((item) => item.name.trim() !== '')
                              .map((item) => (
                                <li
                                  key={item.id}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={percentageField.state.value[item.name] ?? 0}
                                    onChange={(e) =>
                                      setPercentage(
                                        item.name,
                                        Number(e.target.value),
                                      )
                                    }
                                    className="w-20 rounded bg-gray-200 px-2 py-1 text-sm outline-none"
                                  />
                                  <span className="text-sm">%</span>
                                  <span className="size-2.5 rounded-full bg-gray-400" />
                                  <span className="text-sm">{item.name}</span>
                                </li>
                              ))}
                          </ul>

                          {/* แถบเลื่อนคุม % ของ variation ตัวแรก */}
                          {variations[0] && (
                            <div className="mt-4 flex items-center gap-3">
                              <input
                                type="range"
                                min={0}
                                max={100}
                                value={
                                  percentageField.state.value[
                                    variations[0].name
                                  ] ?? 0
                                }
                                onChange={(e) =>
                                  setPercentage(
                                    variations[0].name,
                                    Number(e.target.value),
                                  )
                                }
                                className="flex-1"
                              />
                              <span className="text-xs">
                                {percentageField.state.value[
                                  variations[0].name
                                ] ?? 0}
                                %
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </form.Field>
                  )}
                </>
              )}
            </form.Field>
          )}
        </form.Subscribe>
      </div>
    </div>
  )
}

export default DefaultRule
