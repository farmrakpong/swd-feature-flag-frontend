import type { FeatureFlagValues, FlagType } from '../feature-flag-form'
import { buildQuery } from '../targeting/operator'

export type FlagValue = boolean | number | string | object

// input คืนค่าเป็น string เสมอ เลยต้องแปลงกลับตาม flag type ที่เลือกไว้
// คืน undefined = ค่ายังใช้ไม่ได้ ให้ข้ามไม่ต้องใส่ลง JSON
export function parseFlagValue(
  raw: string,
  type: FlagType,
): FlagValue | undefined {
  const text = raw.trim()

  switch (type) {
    case 'boolean':
      return text === 'true'

    case 'number': {
      const num = Number(text)
      return text !== '' && !Number.isNaN(num) ? num : 0
    }

    case 'json':
      if (text === '') return {}
      try {
        // JSON.parse ทำให้ preview ออกมาเป็น object จริง ไม่ใช่ string ครอบ ""
        return JSON.parse(text)
      } catch {
        // JSON ยังพิมพ์ไม่ครบ / ผิดรูป -> ไม่ต้องโชว์ใน preview
        return undefined
      }

    default:
      return raw
  }
}

// แปลงค่าจากฟอร์ม -> โครง JSON ของ GoFeatureFlag
export function toFlagJson(values: FeatureFlagValues) {
  // ฟอร์มเก็บ variations เป็น array (เพราะต้องมี id ไว้ทำ key)
  // แต่ JSON ใช้ชื่อ variation เป็น key ของ object
  const variations: Record<string, FlagValue> = {}
  for (const item of values.variations) {
    const key = item.name.trim()
    const parsed = parseFlagValue(item.value, values.type)
    // ข้ามแถวที่ยังไม่มีชื่อ หรือค่ายังใช้ไม่ได้
    if (key && parsed !== undefined) variations[key] = parsed
  }

  const flagName = values.name.trim() || 'my-first-flag'

  const metadataEntries = values.metadata.filter(
    (item) => item.key.trim() !== '',
  )
  const metadata = metadataEntries.length
    ? Object.fromEntries(
        metadataEntries.map((item) => [item.key.trim(), item.value]),
      )
    : undefined

  return {
    [flagName]: {
      variations,
      ...(values.disable ? { disable: true } : {}),
      ...(values.trackEvents ? { trackEvents: true } : {}),
      ...(values.version.trim() ? { version: values.version.trim() } : {}),
       // ไม่มี rule เลยก็ไม่ต้องมี key นี้ใน JSON
      // ฟอร์มเก็บ variation เป็น object ทั้งก้อน แต่ JSON ใช้แค่ "ชื่อ"
      ...(values.targeting.length
        ? {
            targeting: values.targeting.map((rule) => ({
              name: rule.name,
              // query ไม่ได้เก็บในฟอร์ม แต่ประกอบจากทุกเงื่อนไขต่อด้วย and/or
              query: buildQuery(rule.conditions, rule.logic),
              ...(rule.variation ? { variation: rule.variation.name } : {}),
            })),
          }
        : {}),
     defaultRule:
        values.defaultRule.kind === 'percentage'
          ? // ไล่ตาม variation ที่มีอยู่จริง ตัวไหนยังไม่กรอกนับเป็น 0
            {
              percentage: Object.fromEntries(
                values.variations
                  .filter((item) => item.name.trim() !== '')
                  .map((item) => [
                    item.name.trim(),
                    values.defaultRule.percentage[item.name] ?? 0,
                  ]),
              ),
            }
          : { variation: values.defaultRule.variation },
      // array ของฟอร์ม -> object โดยใช้ key ที่กรอกเป็นชื่อ property
      // ไม่มีแถว หรือยังไม่ได้ใส่ key เลย ก็ไม่ต้องมี key นี้ใน JSON
      ...(metadata !== undefined ? { metadata } : {}),
    },
  }
}
