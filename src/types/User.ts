export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  street_address: string | null;
  country: string | null;
  state: string | null;
  zip_code: string | null;
  phone: number | null;
  avatar_url: string | null;
  created_at: number;
  updated_at: number;
};

export type UserRegister = Pick<
  User,
  "first_name" | "last_name" | "email" | "password"
>;
