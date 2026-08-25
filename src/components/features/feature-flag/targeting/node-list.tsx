import ConditionRow from './condition-row'
import GroupBox from './group-box'
import { dynamicField } from './dynamic-field'
import { useDragSort } from './use-drag-sort'
import type { AnyFieldApi } from '@tanstack/react-form'
import type { FeatureFlagForm } from '../feature-flag-form'
import type { RuleNode } from '../types'

interface NodeListProps {
  form: FeatureFlagForm
  // path ของ array ที่เก็บ node ชั้นนี้ เช่น targeting[0].conditions
  arrayPath: string
  // path ของช่อง AND/OR ที่คุมชั้นนี้
  logicPath: string
  // มีเฉพาะกลุ่มที่ซ้อนอยู่ ชั้นบนสุดของ rule ลบตัวเองไม่ได้
  onRemoveGroup?: () => void
}

const fieldBox = 'rounded-md bg-gray-200 px-3 pt-1.5 pb-2'

// id ใหม่ = id มากสุดในชั้นเดียวกัน + 1
function nextId(list: Array<RuleNode>) {
  return list.length ? Math.max(...list.map((item) => item.id)) + 1 : 1
}

// เงื่อนไข 1 ชั้น = [AND/OR] [+Rule] [+Group] + รายการข้างใน
// ข้างในมีได้ทั้งเงื่อนไขเดี่ยวและกลุ่มที่ซ้อนตัวเองลงไปอีก
function NodeList({
  form,
  arrayPath,
  logicPath,
  onRemoveGroup,
}: NodeListProps) {
  const Field = dynamicField(form)
  // แต่ละชั้นมีตัวลากของตัวเอง เลยลากสลับได้เฉพาะในชั้นเดียวกัน
  const dragItem = useDragSort()

  const addCondition = (field: AnyFieldApi) => {
    field.pushValue({
      kind: 'condition',
      id: nextId(field.state.value),
      field: '',
      operator: 'EQUALS',
      value: '',
    })
  }

  const addGroup = (field: AnyFieldApi) => {
    field.pushValue({
      kind: 'group',
      id: nextId(field.state.value),
      logic: 'AND',
      // กลุ่มใหม่เริ่มด้วยเงื่อนไขเปล่า 1 บรรทัด
      children: [
        { kind: 'condition', id: 1, field: '', operator: 'EQUALS', value: '' },
      ],
    })
  }

  return (
    <Field name={arrayPath} mode="array">
      {(field) => (
        <>
          <div className="flex items-center gap-2">
            {/* ตัวเชื่อมของชั้นนี้ -> " and " / " or " ใน query */}
            <Field name={logicPath}>
              {(logicField) => (
                <select
                  value={logicField.state.value}
                  onChange={(e) => logicField.handleChange(e.target.value)}
                  className={`${fieldBox} w-32 cursor-pointer py-2 text-sm`}
                >
                  <option value="AND">AND</option>
                  <option value="OR">OR</option>
                </select>
              )}
            </Field>

            {/* เพิ่มเงื่อนไขในชั้นเดียวกัน */}
            <button
              type="button"
              onClick={() => addCondition(field)}
              className="rounded bg-gray-300 px-3 py-2 text-sm"
            >
              +Rule
            </button>

            {/* เพิ่มกลุ่มซ้อนเข้าไปอีกชั้น */}
            <button
              type="button"
              onClick={() => addGroup(field)}
              className="rounded bg-gray-300 px-3 py-2 text-sm"
            >
              +Group
            </button>

            {/* ลบทั้งกลุ่มนี้ */}
            {onRemoveGroup && (
              <button
                type="button"
                onClick={onRemoveGroup}
                className="grid size-8 place-items-center rounded-full bg-teal-400 text-white"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            )}
          </div>

          <div className="mt-3 space-y-3">
            {(field.state.value as Array<RuleNode>).map((node, nodeIndex) =>
              node.kind === 'group' ? (
                <GroupBox
                  key={node.id}
                  form={form}
                  path={`${arrayPath}[${nodeIndex}]`}
                  onRemove={() => field.removeValue(nodeIndex)}
                  drag={dragItem(field, nodeIndex)}
                />
              ) : (
                <ConditionRow
                  key={node.id}
                  form={form}
                  path={`${arrayPath}[${nodeIndex}]`}
                  onRemove={() => field.removeValue(nodeIndex)}
                  drag={dragItem(field, nodeIndex)}
                />
              ),
            )}
          </div>
        </>
      )}
    </Field>
  )
}

export default NodeList
