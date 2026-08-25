import ProgressiveRollout, { toDateTimeInput } from './progressive-rollout'
import { clampPercent, syncPercentInput, totalPercent } from './percent'
import type { FeatureFlagForm } from '../feature-flag-form'

interface DefaultRuleProps {
  form: FeatureFlagForm
  // ตำแหน่งของ flag ที่ default rule นี้อยู่
  index: number
}

// ค่าใน <select> ที่ไม่ใช่ชื่อ variation ใช้บอกว่าเลือกโหมดไหน
const PERCENTAGE_OPTION = '__percentage__'
const PROGRESSIVE_OPTION = '__progressive__'

// ช่วงเวลาตั้งต้นตอนเพิ่งเลือก progressive
const DEFAULT_RAMP_DAYS = 10

// variation ที่จะคืนเมื่อไม่เข้าเงื่อนไข targeting ข้อไหนเลย
function DefaultRule({ form, index }: DefaultRuleProps) {
  // อัปเดต % ของ variation ตัวเดียว โดยไม่ทับตัวอื่น
  const setPercentage = (name: string, percent: number) => {
    form.setFieldValue(`flags[${index}].defaultRule.percentage`, {
      ...form.getFieldValue(`flags[${index}].defaultRule.percentage`),
      [name]: percent,
    })
  }

  // ค่าตั้งต้นของ progressive เพิ่งมาเติมตอนนี้ ไม่ได้ใส่ไว้ตั้งแต่แรก
  // เพราะ new Date() ตอน SSR จะได้คนละค่ากับฝั่ง browser
  const fillRolloutDates = () => {
    const start = new Date()
    const end = new Date(start)
    end.setDate(end.getDate() + DEFAULT_RAMP_DAYS)

    const rolloutPath = `flags[${index}].defaultRule.progressive` as const
    // ถ้าเคยกรอกไว้แล้วก็ไม่ต้องไปทับของเดิม
    if (!form.getFieldValue(`${rolloutPath}.initial.date`)) {
      form.setFieldValue(`${rolloutPath}.initial.date`, toDateTimeInput(start))
    }
    if (!form.getFieldValue(`${rolloutPath}.end.date`)) {
      form.setFieldValue(`${rolloutPath}.end.date`, toDateTimeInput(end))
    }
  }

  return (
    <div className="pt-4">
      <p className="text-2xl">Default</p>

      <div className="mt-3 rounded-md border border-teal-400 p-4">
        {/* ดึงชื่อ variation ล่าสุดมาทำ option และทำรายการ % */}
        <form.Subscribe selector={(state) => state.values.flags[index]?.variations ?? []}>
          {(variations) => (
            <form.Field name={`flags[${index}].defaultRule.kind`}>
              {(kindField) => (
                <>
                  <div className="flex items-center gap-3">
                    <span className="text-sm">Serve</span>

                    <form.Field name={`flags[${index}].defaultRule.variation`}>
                      {(variationField) => (
                        <select
                          value={
                            kindField.state.value === 'percentage'
                              ? PERCENTAGE_OPTION
                              : kindField.state.value === 'progressive'
                                ? PROGRESSIVE_OPTION
                                : variationField.state.value
                          }
                          onChange={(e) => {
                            if (e.target.value === PERCENTAGE_OPTION) {
                              kindField.handleChange('percentage')
                              return
                            }
                            if (e.target.value === PROGRESSIVE_OPTION) {
                              kindField.handleChange('progressive')
                              fillRolloutDates()
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
                          <option value={PROGRESSIVE_OPTION}>
                            a progressive rollout
                          </option>
                        </select>
                      )}
                    </form.Field>
                  </div>

                  {/* โหมดแบ่ง % เท่านั้นที่มีส่วนนี้ */}
                  {kindField.state.value === 'percentage' && (
                    <form.Field name={`flags[${index}].defaultRule.percentage`}>
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
                                    onChange={(e) => {
                                      const percent = clampPercent(
                                        e.target.value,
                                      )
                                      syncPercentInput(e.currentTarget, percent)
                                      setPercentage(item.name, percent)
                                    }}
                                    className="w-20 rounded bg-gray-200 px-2 py-1 text-sm outline-none"
                                  />
                                  <span className="text-sm">%</span>
                                  <span className="size-2.5 rounded-full bg-gray-400" />
                                  <span className="text-sm">{item.name}</span>
                                </li>
                              ))}
                          </ul>

                          {/* แถบสรุปว่าตอนนี้ทุกช่องรวมกันได้กี่ % ลากไม่ได้ */}
                          {variations[0] && (
                            <div className="mt-4 flex items-center gap-3">
                              <input
                                type="range"
                                min={0}
                                max={100}
                                value={Math.min(
                                  100,
                                  totalPercent(percentageField.state.value, variations),
                                )}
                                readOnly
                                tabIndex={-1}
                                className="pointer-events-none flex-1"
                              />
                              <span className="text-xs">
                                {totalPercent(
                                  percentageField.state.value,
                                  variations,
                                )}
                                %
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </form.Field>
                  )}

                  {/* โหมดไล่ % ตามเวลา */}
                  {kindField.state.value === 'progressive' && (
                    <ProgressiveRollout
                      form={form}
                      index={index}
                      variations={variations}
                    />
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
