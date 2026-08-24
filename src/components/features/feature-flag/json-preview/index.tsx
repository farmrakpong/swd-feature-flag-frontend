import { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import { toFlagJson } from './to-flag-json'
import type { FeatureFlagForm } from '../feature-flag-form'

interface JsonPreviewProps {
  form: FeatureFlagForm
}

function JsonPreview({ form }: JsonPreviewProps) {
  // monaco ทำงานได้เฉพาะฝั่ง browser หน้านี้ render จาก server ด้วย
  // เลยรอให้ mount ก่อนค่อยโหลด ระหว่างนั้นโชว์ <pre> ไปก่อน
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="min-h-screen bg-neutral-900 p-4">
      <div className="mb-3 rounded bg-neutral-700 px-4 py-2 text-sm text-teal-300">
        JSON
      </div>

      {/* Subscribe ทั้ง values = ค่าไหนเปลี่ยนก็อัปเดต preview ทันที */}
      <form.Subscribe selector={(state) => state.values}>
        {(values) => {
          const json = JSON.stringify(toFlagJson(values), null, 2)

          if (!mounted) {
            return (
              <pre className="rounded bg-neutral-800 p-4 text-sm text-neutral-300">
                {json}
              </pre>
            )
          }

          return (
            <div className="overflow-hidden rounded bg-neutral-800 py-3">
              <Editor
                height="70vh"
                defaultLanguage="json"
                theme="vs-dark"
                value={json}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: 'off',
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                }}
              />
            </div>
          )
        }}
      </form.Subscribe>
    </div>
  )
}

export default JsonPreview
