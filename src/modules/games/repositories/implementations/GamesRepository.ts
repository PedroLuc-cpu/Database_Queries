import { getRepository, Like, Repository, getManager } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    try {
      const games = await this.repository.find({
        where: {
          title: Like(`%${param}%`),
        },
      });

      return games;
    } catch (error) {
      // Tratar erros aqui, se necessário
      throw error;
    }

    // este teste não passou não sei que motivo.

    // tambem não passou
    // return await this.repository
    //   .createQueryBuilder("games")
    //   .where("title ILIKE :param", { param: `%${param}%` })
    //   .getMany();
    //_____________________________________________________________________________
    // nem assim

  //   const entityManager = getManager(); // Obtém o gerenciador de entidades do TypeORM

  //   try {
  //     const query = `
  //     SELECT *
  //     FROM games
  //     WHERE title LIKE ?;
  //   `;

  //     const games = await entityManager.query(query, [`%${param}%`]);

  //     return games;
  //   } catch (error) {
  //     // Tratar erros aqui, se necessário
  //     throw error;
  //   }
  // }
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query('SELECT COUNT(id) as count FROM games');
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder("games")
      .relation(Game, "users")
      .of(id)
      .loadMany();
  }
}
