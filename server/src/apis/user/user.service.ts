import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/User';
import { AuthUserDto, CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import HttpError from '../../error/HttpError';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 회원가입
  async create(createUserDto: CreateUserDto): Promise<any> {
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
      10,
    );

    return await this.userRepository.save(createUserDto);
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne(
      { userId: id },
      { select: ['userId', 'userName'] },
    );
  }

  // 로그인
  async login(authUserDto: AuthUserDto) {
    const user = await this.userRepository.findOne({
      userId: authUserDto.userId,
    });

    if (await this.isExistAndIsPasswordMatch(authUserDto, user)) {
      return { access_token: this.signToken(authUserDto.userId) };
    } else {
      throw new HttpError(400, '로그인 오류');
    }
  }

  private async isExistAndIsPasswordMatch(
    authUserDto: AuthUserDto,
    createUserDto: CreateUserDto,
  ): Promise<boolean> {
    return await bcrypt.compare(
      authUserDto.userPassword,
      createUserDto.userPassword,
    );
  }

  private signToken(userId: string) {
    return this.jwtService.sign({ userId: userId });
  }
}
