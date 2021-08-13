import service from "..";

type AuthRequest = {
  email: string;
  password: string;
};

class AuthService {
  static async register(payload: AuthRequest) {
    try {
      const { data } = await service.post("/auth/register", payload);

      return data;
    } catch (e) {
      throw e;
    }
  }
}

export default AuthService;
