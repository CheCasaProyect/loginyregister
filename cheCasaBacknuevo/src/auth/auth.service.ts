import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/entities/users.entity";
import { Role } from "src/utils/user.enum";
import { UserGoogleDto } from "src/dtos/userGoogleDto";

@Injectable()
export class AuthService {
    private userId: string;
    private readonly SALT_ROUNDS = 10;
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService){}
    
    async signUp(user:Partial<User>) {
        const {email, password} = user;
        if(!email || !password) throw new BadRequestException('Required');

        const foundUser = await this.userRepository.getUserByEmail(user.email)
        if(foundUser) throw new BadRequestException('Email already exists');

        const hashedPassword = await bcrypt.hash(user.password, 10);
        if(!hashedPassword) throw new BadRequestException('Password could not hashed');

        console.log(hashedPassword);

        await this.userRepository.createUser({...user, password:hashedPassword})

            return 'User created successfully!'
    }


    async login(email: string, password: string) {
        if(!email || !password) 
            throw new BadRequestException('Required')
    
    const user = await this.userRepository.getUserByEmail(email);
   
    if(!user) throw new NotFoundException('Invalid Credentials');

    const passwordValidation = await bcrypt.compare(password, user.password)

    if(!passwordValidation) throw new BadRequestException('Invalid Credentials')

        const payload = {
            id: user.id,
            email: user.email,
            roles: [user.isAdmin ? Role.Admin : Role.User]
        }

        const token = this.jwtService.sign(payload)

    return {
        message:'Loggin successfully!',
        token,
    }
  }

  async googleAuthRedirect(user: UserGoogleDto, res: any) {
    if (!user) return new NotFoundException('User google account not found');
    this.userId = (await this.userRepository.getUserByEmail(user.email))?.id;
    if (!this.userId)
      this.userId = (await this.userRepository.createUser(user)).id;

    const refreshToken = await this.generateRefreshToken(this.userId);
    const accessToken = await this.generateAccessToken(this.userId);
    const hashedRefreshToken = await bcrypt.hash(
      refreshToken,
      this.SALT_ROUNDS,
    );

    await this.userRepository.updateRefreshToken(this.userId, hashedRefreshToken);
    res.cookie('token', refreshToken, {
      maxAge: 3 * 24 * 60 * 60,
      httpOnly: true,
    });
    res.json({
      status: 'success',
      message: 'Login successfully',
      data: {
        accessToken: accessToken,
      },
    });
  }

  private async generateAccessToken(userId: string): Promise<string> {
    return await this.jwtService.signAsync(
      { sub: userId },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '20m',
      },
    );
  }
  private async generateRefreshToken(userId: string): Promise<string> {
    return await this.jwtService.signAsync(
      { sub: userId },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '3d',
      },
    );
  }

//   async googleLogin(user: UserGoogleDto) {
//     const foundUser = await this.userRepository.getUserByEmail(user.email);
//     if (!foundUser) {
//       const newUser = await this.signUp(user);
//       return newUser;
//     }

//     const payload = {
//       id: user.id,
//       email: user.email,
//     };
//     const token = this.jwtService.sign(payload);
//     return {
//       message: 'Loggin successfully!',
//       token,
//     };
//   }

  
}