export interface IRoutes extends Document {
  _id?: string;
  lineNumber: string;
  name: string;
  stations: [string];
  schedule: [{ departureTime: string; arrivalTime: string; station: string }];
  updateAt: Date;
}
