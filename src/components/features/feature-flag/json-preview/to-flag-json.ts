import type { FeatureFlagValues, FlagType } from '../feature-flag-form'

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

  return {
    [flagName]: {
      variations,
      ...(values.disable ? { disable: true } : {}),
      ...(values.trackEvents ? { trackEvents: true } : {}),
      ...(values.version.trim() ? { version: values.version.trim() } : {}),
      // TODO: ต่อกับฟอร์ม targeting เมื่อขึ้นโครง rule เสร็จ
      targeting: [],
      defaultRule: {
        variation: values.variations[0]?.name ?? '',
      },
    },
  }
}
