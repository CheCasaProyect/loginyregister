// import {
//   BadRequestException,
//   Inject,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { UserRepository } from 'src/user/user.repository';
// import { FirebaseApp } from 'firebase/app';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from 'firebase/auth';
// import { UserDto } from 'src/dtos/userDto';
// import * as bcrypt from 'bcrypt';
// import { devNull } from 'os';
// import { transporter } from 'src/config/mailer';
// import { console } from 'inspector';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly userRepository: UserRepository,
//     @Inject('FIREBASE_APP') private readonly firebaseApp: FirebaseApp,
//   ) {}

//   async signUp(user: UserDto) {
//     const { email, password, firstname, lastname, phone, birthdate } = user;
//     if (!email || !password) throw new BadRequestException('Required');

//     const existinUser = await this.userRepository.getUserByEmail(user.email);
//     if (existinUser) throw new BadRequestException('Email already exists');

//     const hashedPassword = await bcrypt.hash(user.password, 10);
//     if (!hashedPassword)
//       throw new BadRequestException('Password could not hashed');

//     const auth = getAuth(this.firebaseApp);
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password,
//     );
//     const firebaseUid = userCredential.user.uid;

//     // console.log(hashedPassword);

//     await this.userRepository.createUser({
//       id: firebaseUid,
//       email,
//       password: hashedPassword,
//       firstname,
//       lastname,
//       phone,
//       birthdate,
//       active: true,
//     });
//     await transporter.sendMail({
//       from: '"Te Registraste en CheCasa ✍" <che.casa.proyect@gmail.com>',
//       to: user.email, //Prueba
//       subject: 'Registro existoso',
//       html: `
//       <b>Te has registrado en la página CheCasa correctamente, ahora solo debes iniciar sesión si deseas reservar una propiedad.</b>
//       <b>Toca aquí para dirigirte directamente al inicio de sesión en CheCasa: <a href="https://checasafront.onrender.com/login">Ir a Iniciar Sesión</a></b>
//       `,
//     });

//     return 'User created successfully!';
//   }

//   async login(email: string, password: string) {
//     if (!email || !password) throw new BadRequestException('Required');

//     const user = await this.userRepository.getUserByEmail(email);
//     if (!user) throw new NotFoundException('User not found');

//     const passwordValidation = await bcrypt.compare(password, user.password);
//     if (!passwordValidation)
//       throw new BadRequestException('Invalid Credentials');

//     const auth = await getAuth(this.firebaseApp);
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password,
//     );

//     const token = await userCredential.user.getIdToken();

//     await transporter.sendMail({
//       from: '"Iniciaste Sesión en CheCasa 👌" <che.casa.proyect@gmail.com>',
//       to: user.email,
//       subject: 'Inicio de sesión exitoso',
//       html: `
//       <b>Has iniciado sesión en la página de CheCasa con éxito, para poder reservar solo debes completar todos los datos de tu perfil.</b>
//       <b>Toca aquí para dirigirte directamente al Home de CheCasa: <a href="https://checasafront.onrender.com/">Ir al Home</a></b>
//       `,
//     });

//     return {
//       message: 'Loggin successfully!',
//       token,
//     };
//   }

//   async googleLogin() {
//     const auth = getAuth(this.firebaseApp);
//     const provider = new GoogleAuthProvider();
//     const userCredential = await signInWithPopup(auth, provider);
//     const { user } = userCredential;
//     const firebaseUid = user.uid;
//     const existingUser = await this.userRepository.getUserByEmail(user.email);
//     if (existingUser) {
//       return existingUser;
//     } else {
//       await this.userRepository.createUser({
//         id: firebaseUid,
//         email: user.email,
//         firstname: '',
//         lastname: '',
//         phone: '',
//         birthdate: null,
//         active: true,
//       });
//       await transporter.sendMail({
//         from: '"Iniciaste Sesión en CheCasa 👌" <che.casa.proyect@gmail.com>',
//         to: user.email,
//         subject: 'Inicio de sesión exitoso',
//         html: `
//         <b>Has iniciado sesión en la página de CheCasa con éxito, para poder reservar solo debes completar todos los datos de tu perfil.</b>
//         <b>Toca aquí para dirigirte directamente al Home de CheCasa: <a href="https://checasafront.onrender.com/">Ir al Home</a></b>
//         `,
//       });
//       return 'Loggin successfully!';
//     }
//   }

//   async completeProfile(userDto: UserDto) {
//     const existingUser = await this.userRepository.getUserByEmail(
//       userDto.email,
//     );
//     if (!existingUser) throw new NotFoundException('User not found');

//     const updateData = {
//       firstname: userDto.firstname || existingUser.firstname,
//       lastname: userDto.lastname || existingUser.lastname,
//       phone: userDto.phone || existingUser.phone,
//       birthdate:
//         userDto.birthdate !== undefined
//           ? userDto.birthdate
//           : existingUser.birthdate,
//     };

//     return this.userRepository.userUpdate(existingUser.id, updateData);
//   }
// }
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

  async googleAuthRedirect(user: UserGoogleDto, res: Response) {
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
    // res.cookie('token', refreshToken, {
    //   maxAge: 3 * 24 * 60 * 60,
    //   httpOnly: true,
    // });
    // res.json({
    //   status: 'success',
    //   message: 'Login successfully',
    //   data: {
    //     accessToken: accessToken,
    //   },
    // });
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