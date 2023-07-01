import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
// import { Dropdown, DropdownButton } from 'react-bootstrap';
export default function Card(props) {
  let data = useCart();
  // console.log("data"+data);
  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  // const [btnEnable, setBtnEnable] = useState(false);
  // let totval = 0
  // let price = Object.values(options).map((value) => {
  //   return parseInt(value, 10);
  // });
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  const handleAddToCart = async () => {
    let food = []
    console.log("data"+data);
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    // console.log(food)
    // console.log(new Date())
    if (food !== []) {
      // console.log("FoodSize"+ food.size);
      if (food.size === size) {
        console.log("Size is equal so update the current list")
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.foodItem.img })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
    
    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })

    return
    // setBtnEnable(true)

  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = qty * parseInt(options[size]);   //This is where Price is changing
  // totval += finalPrice;
  // console.log(totval)
  return (
    <div>

      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          {/* <p className="card-text">This is some random text. This is description.</p> */}
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onChange={handleQty}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} ref={priceRef} onChange={handleOptions}>
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
            </select>
            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
              ₹{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        </div>
      </div>
    </div>
  )
}


// import React, { useEffect, useRef, useState } from 'react'
// import { useCart, useDispatchCart } from './ContextReducer';

// function Card(props) {
//     let dispatch = useDispatchCart();
//     let data =useCart();
//     const priceRef = useRef();
//     var option = props.options;
//     var priceOptions = Object.keys(option); 
//     // console.log(priceOptions);
//     const [qty,setQty] = useState(1);
//     const [size,setSize] = useState("");
//     let finalPrice = qty * parseInt(option[size]);
//     const handleAddtoCart= async ()=>{
        
//         let food = []
//         for (const item of data){
//             // console.log(item);   
//             if(item.id === props.foodItem._id){
//                 food = item;
//                 break;
//             }
//         }
//         if(food!==[]){
//             if(food.size === size){
//                 await dispatch({type:"UPDATE",id: props.foodItem._id,price:finalPrice,qty:qty})
//                 return 
//             }
//             else if(food.size !== size){
//                 await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,qty:qty,size:size,price:finalPrice})
//                 return
//             }
//             return
//         }
//         await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,qty:qty,size:size,price:finalPrice});
//         console.log(data);
//     }
//     // console.log(option);
    
//     useEffect(()=>{
//         setSize(priceRef.current.value)
//     },[]   )
//     return (
//         <div>
//             <div className="card m-5" style={{ "width": "22rem", "maxHeight": "600px" }}>
//                 <img src={props.foodItem.img} style={{height:"12rem", objectFit:"fill"}} />
//                 <div className="card-body" style={{}} >
//                     <h5 className="card-title">{props.foodItem.name}</h5>
//                     {/* <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6> */}
//                     <p className="card-text">{props.foodItem.description}</p>
//                     <div className='container w-100'>
//                         <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
//                             {Array.from(Array(6), (e, i) => {
//                                 return (
//                                     <option key={i + 1} value={i + 1}>{i + 1}</option>
//                                 )
//                             })}
//                         </select>
//                         <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
//                             {/* {console.log(priceOptions)} */}
//                             {priceOptions.map((data)=>{
//                                 return <option key={data} value={data}>{data}</option>
//                             })}
//                         </select>
//                         <div className='d-inline h-100 fs-5'>
//                             {finalPrice}/-
//                         </div>
//                     </div>
//                 </div>
//                 <hr></hr>
//                 <button className='btn btn-success justify-center mx-5 me-5 mb-4 my-2' onClick={handleAddtoCart}>Add to Cart</button>
//             </div>
//         </div>
//     )
// }

// export default Card