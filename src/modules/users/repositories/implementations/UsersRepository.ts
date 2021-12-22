import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.findOne({ where: { id: user_id }, relations: ["games"] })

    if(!user) {
      throw new Error('User not found!')
    }

    return user
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query(`SELECT * FROM users ORDER BY users.first_name`); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return await this.repository.query(`SELECT * FROM users WHERE upper(users.first_name) = $1 AND upper(users.last_name) = $2`, [first_name.toUpperCase(), last_name.toUpperCase()]);
  }
}
