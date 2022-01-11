import { useState , Fragment, useCallback, useMemo } from "react"
import produce from "immer";
const formatter = Intl.NumberFormat('ko-kr')
const coffee = [
    {name : "에스프레소" , price: 2900},
    {name : "아메리카노" , price: 3500},
    {name : "카페라떼" , price: 5600},
    {name : "카페모카" , price: 4500},
    {name : "카푸치노" , price: 5600},
  ]


function sum(array){
    return array.reduce((acc, num) => {
     acc += num
     return acc
   }, 0)
 }
export default function CoffeeList({title}){
    const [data , setDate] = useState(coffee.map((item , index) => ({...item , count : 0 })))


    const addCoffee = useCallback((name) => {
        setDate(produce(data , draft => {
          const index = data.findIndex(item => item.name === name)
          draft[index].count++
        }))
    }, [data])

    const removeCoffee = useCallback((name) => {
        setDate(produce(data , draft => {
            const index = data.findIndex(item => item.name === name)
            if(draft[index].count > 0){
                draft[index].count--
            }
        }))
    },[data])


    const coffeeTotal = sum(data.map(item => item.price * item.count));
    console.log(coffeeTotal)
    
    const total = useMemo(() => {
        return coffeeTotal
    }, [data])
    return(
        <div className="container">
            <h1>{title}</h1>

            <div className="row">
                              <div className="col">
                                <p className="fs-3 fw-bold">커피를 담아주세요</p>
                                  <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                      <a className="nav-link active" data-toggle="tab" href="#qwe">커피</a>
                                    </li>
                                  </ul>
                                  <div className="tab-content" style={{marginBottom : '300px'}}>
                                  <div className="tab-pane fade show active" id="qwe">
                                    <dl className="row py-3 px-2">
                                        {data.map((item , index) => (
                                            <Fragment key={index}>
                                            <dt>
                                            <label htmlFor="coffee1">
                                                {item.name}
                                            </label>
                                            </dt>
                                            <dd className="flex justify-between">
                                            <div>
                                                {formatter.format(item.price)}원
                                            </div>
                                            <div className="mt-1">
                                            <button type="button" 
                                            className="btn btn-outline-secondary btn-xs"
                                                onClick={() => addCoffee(item.name)}
                                            >담기</button>
                                            </div>
                                            </dd> 
                                        </Fragment>
                                        ))}
                                            
                                    </dl>
                                </div>

                                <hr />
                                <h2>주문서</h2>           
                                <dl>
                                            
                               

                                {data.map((item , index) => ( item.count > 0 && (
                                    <Fragment key={index}>
                                         <dt>{item.name} &times; {item.count} </dt>
                                         <dd className="flex justify-between items-end">
                                         <div>{formatter.format(item.price)}원</div>
                                         <div>
                                         <button type="button" 
                                               className="btn btn-outline-secondary btn-xs"
                                                onClick={() => removeCoffee(item.name)}
                                               >뺴기</button>
                                         </div>
                                     </dd>
                                     </Fragment>
                                     )
                                ))}
                           
                                             
                               
                                </dl>  

                                <div>
                                    합계 : {formatter.format(total)}
                                </div>

                        </div>
                </div>
            </div>
            
        </div>
    )
}