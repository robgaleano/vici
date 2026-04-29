export interface User {
  id: string;
  email: string;
  username: string | null;
}

export type PublicUser = Pick<User, 'id' | 'username'>;

export type UserPatch = Partial<Pick<User, 'email' | 'username'>>;
