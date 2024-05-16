import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  callbacks: {
    signIn: async ({ account }) => {
      const { providerAccountId: id } = account || {};
      const headers = new Headers({
        Authorization: `Bearer ${process.env.GITHUB_API}`,
        "X-GitHub-Api-Version": "2022-11-28",
        Accept: "application/vnd.github+json",
      });
      const username = await fetch(`https://api.github.com/user/${id}`, {
        headers,
      }).then((res) => res.json().then((data) => data.login));
      const orgCheck = await fetch(
        `https://api.github.com/orgs/z1g-project/members/${username}`,
        {
          headers,
        },
      );
      console.log(
        `User ${username} is trying to log in, status: ${orgCheck.status}`,
      );
      if (orgCheck.status === 204) {
        return true;
      }
      return false;
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
});
