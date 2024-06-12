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
  setLocation: any;
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

export interface HeaderProps {
  loggedIn: boolean;
  user: User | null;
  onOpen: () => void;
  handleLogout: () => void;
}

export interface UserMenuProps {
  loggedIn: boolean;
  user: User | null;
  onOpen: () => void;
  handleLogout: () => void;
}