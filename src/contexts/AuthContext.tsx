import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';
import Router from 'next/router';


type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    //signUp: (credentials: SignUpProps) => Promise<void>;
} 

type UserProps = {
    id: string;
    name: string;
    email: string;
    password: string;
}


type SignInProps = {
    email: string;
    password: string;
}


type AuthProviderProps = {
    children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps){
   
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const isAuthenticated = !!user;

    

    async function signIn({ email, password }: SignInProps) {
        try {
          const response = await api.get('/users'); // realiza a requisição GET para a rota /users
          const users = response.data.ctRoot; // obtém os usuários do JSON retornado pela API
      
          // busca o usuário com o email e password informados
          const user = users.find((user: UserProps) => user.email === email && user.password === password);

      
          if (user) {
            setUser(user); // atualiza o estado do usuário autenticado
            Router.push('/dashboard'); //redireciona para a página de dashboard
            console.log('Sucesso')
          } else {
            console.log('Email ou senha incorretos');
          }
        } catch (error) {
          console.log(error);
        }
      }

      function signOut() {
        setUser({} as UserProps); // limpa o estado do usuário autenticado
        Router.push('/'); // redireciona para a página de login
      }
      

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}