import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { dbUsers } from "../../../database"
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Credentials({
            name: 'Custom Login',
            credentials: {
                email: { label: 'Correo', type: 'email', placeholder: 'correo@google.com' },
                password: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña' },
            },
            async authorize(credentials) {

                // return { name: 'Beto', correo: 'beto@google.com', role: 'admin' };
                return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password)
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            authorization: { params: { scope: 'identify guilds' } },
        }),
        // ...add more providers here

    ],

    //Custom pages 
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register'
    },
    session: {
        maxAge: 259200, // 30d
        strategy: 'jwt',
        updateAge: 86400 // 1d
    },

    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token
                switch (account.type) {
                    case 'credentials':
                        token.user = user
                        break;
                    case 'oauth':
                        // Verify if the user exist
                        token.user = await dbUsers.oAuthToDbUser(user!.email || '', user!.name || '')
                        break;

                    default:
                        break;
                }
            }
            return token
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken

            session.user = token.user as any;
            return session
        },
    },

})