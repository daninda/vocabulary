import { GetUserInfoOutput } from 'src/shared/dtos/user/get-user-info.dto';

import { User } from 'src/domain/entities/user';

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
