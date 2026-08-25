import type { Variations } from '../types'

// แปลงสิ่งที่พิมพ์มาเป็นตัวเลข 0 ถึง 100
export function clampPercent(raw: string) {
  const num = Number(raw)
  if (raw === '' || Number.isNaN(num)) return 0

  return Math.min(100, Math.max(0, Math.trunc(num)))
}

// บวก % ของทุก variation เข้าด้วยกัน
export function totalPercent(
  percentage: Record<string, number>,
  variations: Array<Variations>,
) {
  return variations
    .filter((item) => item.name.trim() !== '')
    .reduce((sum, item) => sum + (percentage[item.name] ?? 0), 0)
}

// เซ็ตตัวเลขที่โชว์ในช่องให้เป็นค่าที่ส่งเข้ามา
export function syncPercentInput(input: HTMLInputElement, percent: number) {
  if (input.value !== String(percent)) input.value = String(percent)
}
