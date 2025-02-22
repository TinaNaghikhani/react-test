import Input from '../base/input/input'
import Button from '../base/button/button'
import { useRef, useState } from 'react'
import { MouseEvent } from 'react'

interface IProps {
  task: string;
}

export default function Ref({ task }: IProps) {

  const refName = useRef<HTMLInputElement>(null)
  const [tasksList, setTasksList] = useState<string>(task)


  const btnHandler = (e: MouseEvent) => {
    e.preventDefault()

    if (refName.current && refName.current.value) {
      setTasksList(refName.current.value)

    }
  }

  return (
    <div className='w-full bg-gray-200 p-10 flex gap-10 justify-around'>
      <form className='w-1/2 flex flex-col gap-4 justify-start'>
        <Input name='tasks' placeholder='running' type='text' label='TasksTitle:' id='tasks' className='mt-4 p-2 bg-pink-200 rounded-2xl text-pink-600 border-2 boder-pink ' error='' ref={refName} />
        <Button label='Add' type='submit' className='w-16 h-16 p-1 text-center rounded-full text-pink-500 font-bold shadow-lg bg-zinc-300' onClick={(e: MouseEvent<HTMLButtonElement>) => btnHandler(e)} />
      </form>
      <div className='w-1/2'>
        <h2 className='font-bold text-2xl text-pink-500'>TASKS</h2>
        <div className='flex flex-col gap-5 '>
          <p className='font-semibold text-stone-700'>{tasksList}</p>
        </div>
      </div>
    </div>
  )
}
