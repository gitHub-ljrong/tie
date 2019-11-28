import { Injectable } from '@tiejs/common'
import { InjectRepository, Repository } from '@tiejs/typeorm'
// import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserRepository {
  @InjectRepository(User)
  private userRepository: Repository<User>

  async findAll(): Promise<User[]> {
    console.log('--------------hahah');
    console.log('this.userRepository:', this.userRepository)
    return await this.userRepository.find()
  }
}
