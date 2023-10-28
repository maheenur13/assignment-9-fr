export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
export type ILoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type IServiceCategory = {
  id: string;
  categoryName: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type IVehicle = {
  id: string;
  images: string[];
  model: string;
  vehicleType: string;
  weight: number | null;
  cc: number;
  brand: string;
};

export type IVehicleType = {
  id: string;
  type: string;
};

export type IServiceVehicle = {
  id: string;
  serviceId: string;
  vehicleId: string;
  vehicle: IVehicle;
};

export type IService = {
  id: string;
  title: string;
  details: string;
  description: string;
  price: number;
  rating: number;
  categoryId: string;
  imageUrl?: string;
  vehicleIds: string[];
  specification: string;
  serviceVehicles: IServiceVehicle[];
};

export type IUser = {
  id: string;
  name: string;
  profileImage: string;
  email: string;
  contactNo: string;
  gender: "Male" | "Female" | "Other";
  bloodGroup: string;

  userId: string;
};

export type IBookingPayload = {
  bookingDate?: string;
  serviceAvailDate: string;
  serviceAvailTime: string;
  paymentStatus?: "PAID" | "PENDING";
  orderPlaceAt: "SERVICE_POINT" | "AT_HOME";
  address: string;
  phoneNumber: string;
  total: number;
  bookingStatus?: "PENDING" | "COMPLETE";
  additionalInfo: string;
  customerId: string;
  serviceId: string;
  vehicleId: string;
};
