export interface UserType {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

export interface InputType {
  username: string;
  password: string;
}

export interface ContactType {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  userId: number;
}

export enum Status {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  IDLE = "IDLE"
}
