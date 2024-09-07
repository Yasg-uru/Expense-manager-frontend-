export interface User {
 
  isLoggedin: boolean  ;
  role: "user" | "admin"  | '';
  imageurl?:string ;
  email:string;
  name:string;
  isLoading:boolean;
  

}
