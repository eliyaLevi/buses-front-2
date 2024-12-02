export interface IBuses extends Document {
  licensePlate: string;
  busmodel: string;
  capacity: number;
  status: string;
  driverId: object;
  routId: object;
  updateAt: Date;
}
