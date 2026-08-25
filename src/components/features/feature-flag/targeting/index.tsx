import type { AnyFieldApi } from '@tanstack/react-form'
import type { FeatureFlagForm } from '../feature-flag-form'
import type { Targeting } from '../types'

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
          id: maxId + 1,
          name: `Rule ${maxId + 1}`,
          query: '',
          variation: firstVariation,
        })
        console.log(field);
        
  }
  return (
    <div className="pt-4">
      <p className="text-2xl">Target specific users</p>
         <form.Field name="targeting" mode="array">
          {(field) => ( 
                    <div className="mt-3 grid size-8 place-items-center rounded-full bg-teal-400 text-white" onClick={()=>addTargetSpecificUsersValue(field)}>
                      <i className="fa-solid fa-plus" />
                    </div> 

          )}
          </form.Field>
      {/* 1 rule = การ์ด 1 ใบ + ปุ่มลบ rule อยู่นอกการ์ดด้านขวา */}
      

      {/* action: เพิ่ม rule */}
      <button
        type="button"
        className="mt-3 grid size-8 place-items-center rounded-full bg-teal-400 text-white"
      >
        <i className="fa-solid fa-plus" />
      </button>
    </div>
  )
}

export default TargetSpecificUsers
