import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepositories = getRepository(User);

    const checkUserExists = await usersRepositories.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepositories.create({
      // No método create não precisamos utilizar o await pq ele não irá salvar diretamente no banco de dados, mas só criará a instância
      name,
      email,
      password: hashedPassword,
    });

    await usersRepositories.save(user);
    // Já no metodo save precisamos usar o await

    return user;
  }
}

export default CreateUserService;
