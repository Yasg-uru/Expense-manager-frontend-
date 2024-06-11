export interface User {
 
  isLoggedin: boolean  ;
  role: "user" | "admin" | '';
  imageurl?:string ;

}
