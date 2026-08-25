import type { AnyFieldApi } from '@tanstack/react-form'
import type { FeatureFlagForm } from '../feature-flag-form'
import type { Targeting } from '../types'
import RuleCard from './rule-card'

interface TargetSpecificUsersProps {
  form: FeatureFlagForm
}

function TargetSpecificUsers({ form }: TargetSpecificUsersProps) {

  const addTargetSpecificUsersValue = (field: AnyFieldApi)=>{
        const list: Array<Targeting> = field.state.value
        const maxId = list.length ? Math.max(...list.map((item) => item.id)) : 0

        // ตั้งต้นให้ serve variation ตัวแรกไว้ก่อน (เหมือน GoFeatureFlag)
        const firstVariation = form.getFieldValue('variations')[0]

        field.pushValue({
          variation: firstVariation,
          id: maxId + 1,
          name: `Rule ${maxId + 1}`,
          logic: 'AND',
          // rule ใหม่เริ่มด้วยเงื่อนไขเปล่า 1 บรรทัด
          conditions: [
            { kind: 'condition', id: 1, field: '', operator: 'EQUALS', value: '' },
          ],
        })
        // console.log(field.state.value);
        
  }
  return (
    <div className="pt-4">
      <p className="text-2xl">Target specific users</p>
         <form.Field name="targeting" mode="array">
          {(field) => ( 
            <>
                {field.state.value.map((rule, index) => (
                   <RuleCard
                     key={rule.id}
                     form={form}
                     index={index}
                     onRemove={() => field.removeValue(index)}
                   />
                ))}
                <div className="mt-3 grid size-8 place-items-center rounded-full bg-teal-400 text-white" onClick={()=>addTargetSpecificUsersValue(field)}>
                  <i className="fa-solid fa-plus" />
                </div> 

                 </>

          )}
          </form.Field>
    </div>
  )
}

export default TargetSpecificUsers
