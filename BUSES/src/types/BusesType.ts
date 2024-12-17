export interface IBuses extends Document {
  _id?: string;
  licensePlate: string;
  busmodel: string;
  capacity: number;
  status: string;
  driverId: object;
  routId: object;
  updateAt: Date;
}
