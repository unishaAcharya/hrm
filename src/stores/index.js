import {getMenu } from '../actions'

const  initialState={
   menu:[],
   open:true
}

const reducers=(state=initialState,action)=>{
  console.log(getMenu);
    switch(action.type){

    case "getMenu":
    return{
      ...state,
      menu:action.menu
    }
      console.log(initialState+"hh")
      break;
    case "MENU_SET":
    console.log(action.res.data.content);
    return{
      ...state,
      menu:action.menu
    }
    console.log(state.menu);
    break;
    case "Remove_Menu":
    let menu=state.menu.filter(menu=>(action)=>(!action.id === menu.id))
    return{
      ...state,
      menu:menu
    }
    break;
    case "Update_Menu":
    let updatemenu=state.menu.filter(menu=>{
      console.log(menu);
      if(menu.id === action.id){
        menu.menuName = action.menuName;
        menu.redirectUrl = action.redirectUrl;
      }
      return menu
    })
    return{
      ...state,
      menu:updatemenu,
      open:false
    }
    console.log(state.menu);
    break;
    default:
    return state;
  }
}
export default reducers
