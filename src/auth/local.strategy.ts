import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { User } from "src/entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    private readonly logger = new Logger(LocalStrategy.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        super();
    }

    public async validate(username: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({
            where: { username }
        });

        if (!user) {
            this.logger.debug(`User ${username} not found`);
            throw new UnauthorizedException();
        }

        if (!(await bcrypt.compare(password, user.password))) {
            this.logger.debug(`Invalid password for user ${username}`);
            throw new UnauthorizedException();
        }

        return user;
    }
}