export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  alias: string;
  email: string;
  [propName: string]: any;
}
