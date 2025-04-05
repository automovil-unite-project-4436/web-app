
import {RoleEnum} from '../enums/role-enum';

export interface UserInterface {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  enabled: boolean;
  emailVerified: boolean;
  roles: RoleEnum[];
  profilePhotoUrl: string;
  idCardPhotoUrl: string;
  criminalRecordUrl: string;
  driverLicenseUrl: string;
  banned: boolean;
  averageRating: string;
  reportCount: number;
}
