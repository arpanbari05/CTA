export interface Store {
  id: string;
  name: string;
  type: string;
  address: string;
  email: string;
  phone: string;
  category: {
    name: string;
    type: string[];
  };
}
