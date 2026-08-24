import VariationRow from './variation-row'
import type { Variation } from './types'
import { useState } from 'react'

interface VariationsProps {
  variations: Array<Variation>
}


function Variations({ variations }: VariationsProps) {
  const [listVariations, setListVariations] = useState<Array<Variation>>(variations)

  const addVariationValue = ()=>{
    // let MaxId= Math.max(...variations.map(item => item.id))
    // const data = {id:MaxId ,name:'NewName',value:'newValue'}
    setListVariations((prev)=>{
       const MaxId =  Math.max(...prev.map(item => item.id))
       const data = {id:MaxId + 1  ,name:'NewName',value:'newValue'}
       const lastPrev = [...prev,data]
       return lastPrev
    })
  }
  const removeVariation = (id:number)=>{
    setListVariations((prev)=> prev.filter(item => item.id !== id))
  }

  return (
    <div className="pt-4">
      <p className="text-2xl">Variations</p>

      {/* รายการ variation */}
      <div className="space-y-2 pt-3">
        {listVariations.map((item) => (
          <VariationRow key={item.id} variation={item} onRemove={removeVariation} />
        ))}
      </div>

      {/* action: เพิ่ม variation */}
      <div className="mt-3 size-8 rounded-full bg-gray-300"  onClick={addVariationValue}/>
    </div>
  )
}

export default Variations
