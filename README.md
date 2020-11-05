#Fullstack IBM Node Starter Template

We needed a full stack node app starter that can run sepcifically on the IBMi. As we evaluated options, loopback was a clear choice because it's maintained by IBM and has built in support for the DB2 database via juggler. We wanted to use React on the frontend, because it's widely used, has a lot of supporting libraries, and we would be able to share components with a react-native app. The choice there was next.js which provides SSR, and an excellent developer experience.

I wanted a monorepo to showcase what a fullstack Node app running on the IBMi would look like. I decided to use Yarn workspaces to create the monorepo, and keep the frontend builds separate from the backend builds. The frontend is using Chakra (pre-release at the time of this writing), for it's focus on accessibility flexibility (I also like that it took some queues from tailwind). We are also using typescript.

The app has built-in authentication, login and registration pages. We're using 2 different JWT, a long-lived http-only refresh token and a short-lived access token. It also has dockerfiles included for local development (IBM DB2 database). It also has a todo app based off the Loopback tutorial. The database tables are not included, and you will have to create them based off the models in packages/backend/models. The api is proxed through Next.js to the /api suffix, but could be easily changed to make the api api.example.com with the frontend at example.com. Both the frontend and backend can be started concurrently using the scripts in the parent directory.

###Packages Included:
- [Loopback](https://loopback.io/doc/en/lb4/) for the backend 
- [Next.js](https://nextjs.org/docs/getting-started) for the frontend
- [Chakra ui](https://next.chakra-ui.com/docs/getting-started) for the UI
- [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) for typing and compilation
- [SWR](https://swr.vercel.app/) for caching
- [KY universal](https://github.com/sindresorhus/ky) for http requests
- [Yarn](https://yarnpkg.com/) as the package manager
- [Formik](https://formik.org/docs/overview) for forms
- [Yup](https://github.com/jquense/yup) form validation
- [Docker](https://www.docker.com/) for local dev (as it's not supported on IBMi yet)
- [Docker DB2](https://hub.docker.com/r/ibmcom/db2) DB2 database