import { useRef, useState } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import type { AnyFieldApi } from '@tanstack/react-form'

// ลากสลับตำแหน่งของ array field
// ไม่ได้ใช้ drag ของ html เพราะมันเลือกเองว่าอะไรลากได้ลากไม่ได้ คุมยาก
// อันนี้ฟังจากเมาส์ตรงๆ แล้วเทียบตำแหน่งบนจอเอาว่าตอนนี้อยู่บนแถวไหน
//
// เรียกที่ระดับ component แล้วค่อยส่ง field + index ตอน render แต่ละแถว
// (เรียกในนี้ไม่ได้ เพราะ field โผล่มาจาก children ของ form.Field)
export function useDragSort() {
  // element ของแต่ละแถว เอาไว้วัดตำแหน่งตอนลาก
  const rows = useRef(new Map<number, HTMLElement | null>())

  // ที่ต้องมี ref คู่กับ state เพราะตอนปล่อยเมาส์ต้องอ่านค่าล่าสุดให้ทัน
  // ส่วน state มีไว้สั่งให้ re-render โชว์ผลตอนลาก
  const dragField = useRef<AnyFieldApi | null>(null)
  const fromRef = useRef<number | null>(null)
  const overRef = useRef<number | null>(null)
  const startY = useRef(0)

  const [fromIndex, setFromIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)
  const [shiftY, setShiftY] = useState(0)

  const stop = () => {
    dragField.current = null
    fromRef.current = null
    overRef.current = null
    setFromIndex(null)
    setOverIndex(null)
    setShiftY(0)
  }

  // เมาส์อยู่ที่ y นี้ ทับแถวไหนอยู่
  // ข้ามแถวที่กำลังลาก เพราะมันขยับตามเมาส์ ไม่งั้นเจอตัวเองตลอด
  const rowAt = (y: number, skip: number) => {
    for (const [index, el] of rows.current) {
      if (index === skip || !el?.isConnected) continue
      const box = el.getBoundingClientRect()
      if (y >= box.top && y <= box.bottom) return index
    }
    return null
  }

  return (field: AnyFieldApi, index: number) => {
    const dragging = fromIndex === index

    return {
      isDragging: dragging,
      isOver: overIndex === index && fromIndex !== index,

      // แปะที่กล่องนอกสุดของแถว
      container: {
        ref: (el: HTMLElement | null) => {
          rows.current.set(index, el)
        },
        // ตอนลากให้แถวลอยตามเมาส์ไปด้วย จะได้เห็นว่ากำลังลากอะไรอยู่
        style: (dragging
          ? {
              transform: `translateY(${shiftY}px)`,
              opacity: 0.7,
              position: 'relative',
              zIndex: 20,
            }
          : undefined) as CSSProperties | undefined,
      },

      // แปะที่ไอคอนจุดจับ ต้องกดตรงนี้เท่านั้นถึงจะลาก
      // ไม่งั้นคลิกเลือกข้อความในช่อง Field / Value ไม่ได้
      handle: {
        onPointerDown: (e: PointerEvent<HTMLElement>) => {
          // กันไม่ให้เบราว์เซอร์ลากเป็นการเลือกข้อความแทน
          e.preventDefault()
          e.stopPropagation()
          // ล็อกเมาส์ไว้ที่จุดจับ ลากออกนอกแถวแล้วยังตามอยู่
          e.currentTarget.setPointerCapture(e.pointerId)

          dragField.current = field
          fromRef.current = index
          overRef.current = index
          startY.current = e.clientY
          setFromIndex(index)
          setOverIndex(index)
          setShiftY(0)
        },

        onPointerMove: (e: PointerEvent<HTMLElement>) => {
          if (fromRef.current !== index) return

          setShiftY(e.clientY - startY.current)
          // ลอยอยู่ในช่องว่าง = ยังไม่เล็งแถวไหน ให้ถือว่าอยู่ที่เดิม
          const hit = rowAt(e.clientY, index) ?? index
          overRef.current = hit
          setOverIndex(hit)
        },

        onPointerUp: () => {
          const from = fromRef.current
          const to = overRef.current
          // moveValue = ดึงออกจากตำแหน่งเดิมแล้วยัดกลับที่ใหม่ ลำดับที่เหลือเลื่อนตาม
          if (from !== null && to !== null && from !== to) {
            dragField.current?.moveValue(from, to)
          }
          stop()
        },

        onPointerCancel: stop,
        // กันหน้าจอเลื่อนตอนลากบนมือถือ
        style: { touchAction: 'none' } as CSSProperties,
      },
    }
  }
}

export type DragSortItem = ReturnType<ReturnType<typeof useDragSort>>
