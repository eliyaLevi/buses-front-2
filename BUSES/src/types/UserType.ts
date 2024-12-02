export interface Iusers extends Document {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  updateAt: Date;
}
