import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create.user.dto";
import { AuthService } from "../auth/auth.service";
import { User } from "src/entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();

        if (createUserDto.password !== createUserDto.retypedPassword) {
            throw new BadRequestException(['Passwords are not identical']);
        }

        const existingUsername = await this.userRepository.findOne({
            where: [{ username: createUserDto.username }]
        });

        if (existingUsername) {
            throw new BadRequestException(['Username is already taken'])
        }

        user.username = createUserDto.username;
        user.password = await this.authService.hashPassword(createUserDto.password);

        return await this.userRepository.save(user);
    }
}