import React, { createContext, useState } from "react";
import  all_product from '../Components/Assets/all_product'



export const ShopContext=createContext(null);

const getDefaultCart=()=>{
    let cart={}
    for (let index = 0; index < all_product.length+1; index++) {
        cart[index]=0;
        
    }
    return cart;
}
const ShopContextProvider=(props)=>{

   
const[cartItems,setCartItems]=useState(getDefaultCart());

const addToCart=(ItemId)=>{
setCartItems((prev)=>({...prev,[ItemId]:prev[ItemId]+1}))
console.log(cartItems);
}
const removeFromCart=(ItemId)=>{
    setCartItems((prev)=>({...prev,[ItemId]:prev[ItemId]-1}))
    }
  
  const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems){
        if(cartItems[item]>0){
           let itemInfo=all_product.find((product)=>product.id===Number(item))
           totalAmount+=cartItems[item]*itemInfo.new_price*10;
        }
      
    }
    return totalAmount;
  }
  const getTotalCartItems=()=>{
    let totalItem=0;
    for(const item in cartItems){
        if(cartItems[item]>0){
            totalItem+=cartItems[item];
        }
    }
    return totalItem;
  }  
    
    const contextValue={getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};


    return(
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>)
}
export default ShopContextProvider;