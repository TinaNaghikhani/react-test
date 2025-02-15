
import Reduce from '../reduce/reduce'

import Ref from '../ref/ref'
import ProductList from '../useMemo/productList'

export default function Home() {
  return (
    <div className='w-full top-0'>
      <Ref/>
      <Reduce/>
      <ProductList/>
    </div>
  )
}
