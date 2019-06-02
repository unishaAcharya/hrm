import Axios from 'axios';
import Configuration from "../configuration/server";

export function getMenu(){
  return(dispatch)=>{
    return Axios.get(`${Configuration.domain}/hrm/MenuDetails`)
    .then(res => {
      console.log("hello")
   dispatch(menu(res.data.content))
    })
    .catch(err => {
      dispatch(menu("data",+  err))
      });
     }
   }
export function menu(menu){
  console.log(menu);
  return {
    type :'MENU_SET',
    menu
  }
}

export const remove=(id)=>({
  type:'Remove_Menu',
  id
})

export const updatemenu=(menu)=>({
  type:'Update_Menu',
  menu
})
export const fetchMenu=(getMenu)=>({
  type:'Get_Menu',
  getMenu
})
