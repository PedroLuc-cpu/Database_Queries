import { getRepository, Repository } from "typeorm";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    // Complete usando ORM
    try {
      return await this.repository.findOneOrFail({ where: { id: user_id } })
    } catch (error) {
      return undefined
    }
    
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query(
      "SELECT * FROM users ORDER BY first_name"
    );
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[]> {
    // Complete usando raw query
    return await this.repository.query(
      `SELECT * FROM  users WHERE LOWER(first_name)=LOWER('${first_name}') AND LOWER(last_name)=LOWER('${last_name}')`
    );
  }
}