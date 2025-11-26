import { IAuthRepository, LoginCredentials, AuthResponse } from "../repositories/IAuthRepository"

export class AuthenticateUserUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<AuthResponse> {
    if (!credentials.email || !credentials.password) {
      throw new Error("Email e senha são obrigatórios")
    }

    return this.authRepository.login(credentials)
  }
}

