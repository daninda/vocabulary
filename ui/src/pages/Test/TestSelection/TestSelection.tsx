import { FC } from 'react'
import { TestType } from '../types'
import Button from './Button'

interface Props {
    disabled?: boolean,
    testTypes: TestType[],
    id?: number,
}

const TestSelection: FC<Props> = ({disabled, testTypes, id}) => {

 return (
   <div className="flex flex-col items-center w-full gap-y-8">
     <p className="text-2xl font-bold text-slate-800">Выберите тип теста:</p>

     <div className="flex flex-row gap-x-4">
       {testTypes.map((item) => (
         <Button
           onClick={item.onClick}
           key={item.id}
           id={item.id}
           title={item.name}
           selected={item.id === id}
           disabled={disabled}
         />
       ))}
     </div>
   </div>
 );
}

export default TestSelection