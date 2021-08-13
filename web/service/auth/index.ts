import service from "..";

type AuthRequest = {
  email: string;
  password: string;
};

class AuthService {
  static async register(payload: AuthRequest) {
    const { data } = await service.post("/auth/register", payload);

    return data;
  }

  static async login(payload: AuthRequest) {
    const { data } = await service.post("/auth/login", payload);

    return data;
  }
}

export default AuthService;
