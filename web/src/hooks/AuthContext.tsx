import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface ICredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: IUser;
  signIn(credentials: ICredentials): Promise<void>;
  signOut(): void;
  updateUser(user: IUser): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@Debts:token');
    const user = localStorage.getItem('@Debts:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post<IAuthState>('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@Debts:token', token);
    localStorage.setItem('@Debts:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const updateUser = useCallback(
    (user: IUser) => {
      localStorage.setItem('@Debts:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@Debts:token');
    localStorage.removeItem('@Debts:user');

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
