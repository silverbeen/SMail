import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { bcryptConstant } from '../../constants';
import { User } from '../../entities/User';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<any> {
    const isExist = await this.userRepository.findOne({
      userId: createUserDto.userId,
    });

    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이미 등록된 사용자입니다.`],
        error: 'Forbidden',
      });
    }
    createUserDto.userPassword = await bcrypt.hash(
      createUserDto.userPassword,
      bcryptConstant.saltOrRounds,
    );
    const { userPassword, ...result } = await this.userRepository.save(
      createUserDto,
    );

    return await result;
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['userId', 'userName'],
    });
  }

  public async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne(
      { userId: id },
      {
        select: ['userId', 'userName'],
      },
    );
  }
}
