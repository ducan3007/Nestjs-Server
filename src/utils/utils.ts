import * as bcrypt from 'bcrypt';

export class Utils {
   /**
    * @param password
    * @returns
    */
   static hashPassword(password: string) {
      return bcrypt.hashSync(password, 10);
   }
}
