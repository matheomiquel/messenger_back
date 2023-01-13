export class UserWithToken {
  id: number;

  name: string;

  email: string;

  token: string;

  constructor({
    id, name, email, token
  }: { id: number, name: string, email: string, token:string }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.token = token;
  }
}
