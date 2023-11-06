type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
}

async function createUser(user: User) {
  console.log(user)
}

async function getUserByEmail(email: string): Promise<User | null> {
  console.log(email);
  return null;
}

export default {createUser, getUserByEmail};