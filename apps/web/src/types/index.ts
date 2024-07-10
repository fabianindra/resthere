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
  foto: string;
}

export interface Tenant {
  id: number;
  email: string;
  username: string;
  password: string;
}

export interface Booking {
  id: string;
  room_name: string;
  property_name: string;
  date: string;
  status: string;
}

export type BookingTenant = {
  id: string;
  username: string;
  email: string;
  room_name: string;
  property_name: string;
  check_in: Date;
  check_out: Date;
  status: string;
};

export interface HeaderProps {
  loggedIn: boolean;
  user: User | null;
  onOpenUserModal?: () => void;
  onOpenTenantModal?: () => void;
  handleLogout: () => void;
}

export interface UserMenuProps {
  loggedIn: boolean;
  user: User | null;
  onOpenUserModal?: () => void;
  onOpenTenantModal?: () => void;
  handleLogout: () => void;
}
