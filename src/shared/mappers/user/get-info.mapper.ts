import { User } from '@domain/user';
import { GetUserInfoOutput } from '@dtos/user/get-info.dto';

export class GetUserInfoOutputMapper {
  static mapTo(dictionary: User): GetUserInfoOutput {
    return {
      id: dictionary.id,
      email: dictionary.email,
      name: dictionary.name,
      createAt: dictionary.createAt,
      updateAt: dictionary.updateAt,
    };
  }
}
