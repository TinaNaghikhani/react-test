import MiniProject from '../miniProject/miniProject';
import QuestionNo4 from '../questionNo4/questionNo4';
import Reduce from '../reduce/reduce'
import Ref from '../ref/ref'
// import ProductList from '../useMemo/productList'

const user = {
  name: "Tina naghikhani",
  email: "tinankh123@gmail.com",
  age: 22,
};

export default function Home() {
  return (
    <div className='w-full top-0 flex flex-col justify-center gap-2'>
      <Ref/>
      <Reduce/>
      {/* <ProductList/> */}
      <QuestionNo4 name={user.name} email={user.email} age={user.age}/>
      <MiniProject/>
    </div>
  )
}
