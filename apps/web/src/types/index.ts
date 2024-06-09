export interface Province {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}

export interface LocationBoxProps {
  location: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  password: string; 
};

export interface Tenant {
  id: number;
  email: string;
  username: string;
  password: string; 
};