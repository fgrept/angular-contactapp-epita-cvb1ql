// enum Gender {
//   m = 'Male', 
//   f = 'Female'
// }
export interface User {
  id:number;
  name:string;
  email:string;
  gender:string;
  status: string;
  created_at: Date;
  updated_at: Date;
}