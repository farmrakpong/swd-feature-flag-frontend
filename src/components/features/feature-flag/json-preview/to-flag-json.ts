import type { FeatureFlagValues } from '../feature-flag-form'

// input คืนค่าเป็น string เสมอ เลยต้องแปลงกลับตามที่ผู้ใช้พิมพ์
// "true"/"false" -> boolean, "1.5" -> number, นอกนั้นเก็บเป็น string
export function parseFlagValue(raw: string): boolean | number | string {
  const text = raw.trim()
  if (text === 'true') return true
  if (text === 'false') return false
  if (text !== '' && !Number.isNaN(Number(text))) return Number(text)
  return raw
}

// แปลงค่าจากฟอร์ม -> โครง JSON ของ GoFeatureFlag
export function toFlagJson(values: FeatureFlagValues) {
  // ฟอร์มเก็บ variations เป็น array (เพราะต้องมี id ไว้ทำ key)
  // แต่ JSON ใช้ชื่อ variation เป็น key ของ object
  const variations: Record<string, boolean | number | string> = {}
  for (const item of values.variations) {
    const key = item.name.trim()
    if (key) variations[key] = parseFlagValue(item.value)
  }

  const flagName = values.name.trim() || 'my-first-flag'

  return {
    [flagName]: {
      variations,
      ...(values.disable ? { disable: true } : {}),
      ...(values.trackEvents ? { trackEvents: false } : {}),
      // TODO: ต่อกับฟอร์ม targeting เมื่อขึ้นโครง rule เสร็จ
      targeting: [],
      defaultRule: {
        variation: values.variations[0]?.name ?? '',
      },
    },
  }
}
