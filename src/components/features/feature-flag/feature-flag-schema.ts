import { z } from 'zod'
import { operatorOptions } from './targeting/operator'
import type { Operator } from './targeting/operator'

// เอา operator ทั้งหมดมาทำเป็น enum ให้ zod จะได้ไม่ต้องพิมพ์ซ้ำ
const operatorValues = operatorOptions.map((item) => item.value) as [
  Operator,
  ...Array<Operator>,
]

const variationSchema = z.object({
  id: z.number(),
  name: z.string().trim().min(1, 'ต้องมีชื่อ variation'),
  value: z.string().trim().min(1, 'ต้องใส่ค่า'),
})

const conditionSchema = z.object({
  id: z.number(),
  field: z.string().trim().min(1, 'ต้องระบุ field'),
  operator: z.enum(operatorValues),
  value: z.string().trim().min(1, 'ต้องระบุค่าที่จะเทียบ'),
})

const targetingSchema = z.object({
  id: z.number(),
  name: z.string().trim().min(1, 'ต้องมีชื่อ rule'),
  logic: z.enum(['AND', 'OR']),
  conditions: z.array(conditionSchema).min(1, 'ต้องมีอย่างน้อย 1 เงื่อนไข'),
  variation: variationSchema.optional(),
  percentage: variationSchema.optional(),
})

const metadataSchema = z.object({
  id: z.number(),
  key: z.string().trim().min(1, 'ต้องมี key'),
  value: z.string(),
})

const defaultRuleSchema = z.object({
  kind: z.enum(['variation', 'percentage']),
  variation: z.string(),
  percentage: z.record(z.string(), z.number()),
})

export const featureFlagSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'ต้องมีชื่อ flag')
    // ชื่อนี้ถูกใช้เป็น key ใน JSON เลยไม่ควรมีช่องว่าง
    .regex(/^\S+$/, 'ชื่อ flag ห้ามมีเว้นวรรค'),
  type: z.enum(['boolean', 'string', 'number', 'json']),
  version: z.string(),
  disable: z.boolean(),
  trackEvents: z.boolean(),
  variations: z.array(variationSchema).min(1, 'ต้องมีอย่างน้อย 1 variation'),
  targeting: z.array(targetingSchema),
  defaultRule: defaultRuleSchema,
  metadata: z.array(metadataSchema),
})
