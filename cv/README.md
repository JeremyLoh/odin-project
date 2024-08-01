# CV Application - React Course

Creating a small application where users can input their information and generate a CV/résumé

https://www.theodinproject.com/lessons/node-path-react-new-cv-application

# Assignment

Double rendering - while working on the project, you might notice that some parts of your code execute twice (e.g. console logs appear doubled)
This is due to [React.StrictMode](https://react.dev/reference/react/StrictMode) and is intended behaviour

1. Create a new React project
2. Think about how to structure your application into components. Your application should include:
   1. A section to add general information like name, email and phone number
   2. A section to add your educational experience (school name, title of study and date of study)
   3. A section to add practical experience (company name, position title, main responsibilities of your jobs, date from and until when you worked for that company)
3. Be sure to include an edit and submit button for each section or for the whole CV. The submit button should submit your form and display the value of your input fields in HTML elements. The edit button should add back (display) the input fields, with the previously displayed information as values. In those input fields, you should be able to edit and resubmit the content. You’re going to make heavy use of state and props, so make sure you understood those concepts.
4. Create a `components` directory under your `src` directory and add your components
5. Include a `styles` directory under your `src` directory for your CSS files. You will need to import these in the component files to use them
6. Push the results and deploy them with any of the options mentioned below. At this point of the curriculum, it doesn't matter which platform you choose as long as your project is live on the internet!

# Deploying a React App

While we have been using GitHub Pages to deploy our static webpages till now, and we can definitely continue to do so with hacky ways, it’s far easier to let a PaaS (Platform as a Service) do the same for us! There are a lot of options to host such sites, and the [Vite hosting docs](https://vitejs.dev/guide/static-deploy.html) go over the most popular ones among them

Not only do some of these get rid of additional steps after pushing our code to GitHub as these services have tools that automatically deploy on push, but you also don’t have to worry about other issues further down the curriculum, like routers and build steps. We shall use a few selected options for now. Once you are done with the assignment, choose one of the following options, and deploy!

## Netlify

While there are many ways to deploy to Netlify, like uploading your dist directly or using Netlify’s [`netlify-cli`](https://docs.netlify.com/cli/get-started/) CLI, the most convenient way would be to directly import your GitHub repository to Netlify.

1. Push your React application to GitHub.
2. [Import your project to Netlify](https://app.netlify.com/start) by logging in, and selecting your repository.
3. Select the branch to deploy from (the default setting, from `main`, works) and hit “Deploy site”!
4. You can access more settings here if you need to!

Netlify Links

- [Netlify Homepage](https://www.netlify.com/)
- [Netlify Documentation Website](https://docs.netlify.com/)
- [Vite deployment to Netlify with Git section has a similar brief guide](https://vitejs.dev/guide/static-deploy.html#netlify-with-git)

## Vercel

Similar to Netlify, Vercel also offers a few ways to deploy, but we will be importing our GitHub repository to get benefits like deploy-on-push.

1. Again, push your React application to GitHub.
2. [Import your project to Vercel](https://vercel.com/new)
3. Vercel will automatically detect that you are using Vite. Set your name as you like, and hit “Deploy”!

Vercel Links

- [Vercel Homepage](https://www.vercel.com/)
- [Vercel Documentation Website](https://www.vercel.com/docs)

## Cloudflare pages

1. Yes, push your React application to GitHub.
2. Create a new Cloudflare account and log into it.
3. Under “Account Home”, select “Workers & Pages” > “Pages” > “Connect to Git”.
4. Connect to GitHub and select your GitHub repository.
5. Under “Set up builds and deployments”, set `npm run build` as the build command, and `dist` as the build output directory.
6. Under “Environment variables (advanced)” > “Add variable”, add a variable named `NODE_VERSION` and set its value to be the version number of Node that you are using. You can find this by executing `node -v` in your terminal.
7. Hit “Save and Deploy” and watch it come to life!

Cloudflare Links

- [Cloudflare Pages Homepage](https://pages.cloudflare.com/)
- [Cloudflare Pages documentation website](https://developers.cloudflare.com/pages)
- [Vite deployment to Cloudflare Pages discusses these very steps](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite3-project/)

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
