export interface Auth {
  email: string;
  password: string;
}

export interface AuthRegister {
  name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface Payload {
  id: string;
  name: string;
  last_name: string;
  email: string;
}