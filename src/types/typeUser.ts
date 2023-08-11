import { Address } from './typeAddress';
import { Company } from './typeCompany';

export type User = {
  id: number;
  email: string;
  name: string;
  phone: string;
  username: string;
  website: string;
  company: Company;
  address: Address;
};

export interface IUserInfoProps {
  user: User | null;
}
