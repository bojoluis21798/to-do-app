import jwt from 'jsonwebtoken';
import userModel from 'models/user.model';
import CreateUserDto from './dto/create-user.dto';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

const AuthService = {
  /**
   * Create User
   * @param createUserDto
   * @returns {string} JsonWebToken
   */
  createUser: async function (createUserDto: CreateUserDto) {
    if (await userModel.findOne({ email: createUserDto.email })) {
      throw new createHttpError.Conflict('User email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    const newUser = new userModel(createUserDto);
    await newUser.save();

    const { password, ...rest } = createUserDto;

    const token = jwt.sign(rest, 'jwt-secret');

    return token;
  },
  logInUser: async function (loginUser: CreateUserDto) {
    const existingUser = await userModel.findOne({ email: loginUser.email });

    if (
      existingUser &&
      (await bcrypt.compare(loginUser.password, existingUser.password))
    ) {
      const { password, ...rest } = loginUser;

      const token = jwt.sign(rest, 'jwt-secret');

      return token;
    } else {
      throw new createHttpError.Unauthorized('Incorrect email or password');
    }
  },
};

export default AuthService;
