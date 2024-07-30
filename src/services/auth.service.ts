import { AxiosError } from "axios";
import { tesloApi } from "../api";

export interface LoginResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

export class AuthService {
  static login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const { data } = await tesloApi.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data);
        throw new Error(e.response?.data);
      }
      console.log(e);
      throw new Error("Error 500");
    }
  };

  static checkStatus = async (): Promise<LoginResponse> => {
    console.log("Se llama este metodo => checkStatus");
    try {
      const { data } = await tesloApi.get<LoginResponse>("/auth/check-status");
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data);
        throw new Error(e.response?.data);
      }
      console.log(e);
      throw new Error("Error 500");
    }
  };
}
