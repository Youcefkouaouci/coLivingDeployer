import Equipment from './equipement.interface';
import Image from './image.interface';
import Reservation from './reservation.interface';
import Service from './service.interface';
import User from './user.interface';

export interface Announcement {
  id: number;
  title: string;
  description: string;
  fullAddress: string;
  address: string;
  city: string;
  dailyPrice: number;
  zipcode: string;
  lattitude: string;
  longitude: string;
  maxClient: number;
  imageCover: string;
  owner: User;
  images: Image[];
  services: Service[];
  equipment: Equipment[];
  reservations: Reservation[];
}
