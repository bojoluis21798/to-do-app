import jwt from 'jsonwebtoken';
import userModel from 'models/user.model';
import UserDto from './dto/user.dto';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { Service } from 'typedi';
import { nanoid } from 'nanoid';

@Service()
class AuthService {
  /**
   * Create User
   * @param createUserDto
   * @returns {string} JsonWebToken
   */
  async createUser(createUserDto: UserDto) {
    if (await userModel.findOne({ email: createUserDto.email })) {
      throw new createHttpError.Conflict('User email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    const id = nanoid();
    const newUser = new userModel({ ...createUserDto, _id: id });
    await newUser.save();
  }

  async logInUser(loginUser: UserDto) {
    const existingUser = await userModel
      .findOne({ email: loginUser.email })
      .select('+password');

    if (
      existingUser &&
      (await bcrypt.compare(loginUser.password, existingUser.password))
    ) {
      const { password, ...noPassword } = existingUser.toObject();

      const token = jwt.sign(noPassword, 'jwt-secret');

      return token;
    } else {
      throw new createHttpError.Unauthorized('Incorrect email or password');
    }
  }
}

export default AuthService;
