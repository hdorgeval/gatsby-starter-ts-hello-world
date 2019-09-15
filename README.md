<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Typescript Starter with the bare essentials needed for a Gatsby site
</h1>

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the hello-world starter.

    ```sh
    # create a new Gatsby site using the hello-world starter
    gatsby new my-hello-world-starter https://github.com/hdorgeval/gatsby-starter-ts-hello-world
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```sh
    cd my-hello-world-starter/
    npm start
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Open the `my-hello-world-starter` directory in your code editor of choice and edit `src/pages/index.tsx`. Save your changes and the browser will update in real time!

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## CSS file usage

Run script:

```sh
npm run css-watch
```

This will automatically create/update a `.d.ts` typings file whenever you add or modify a `.css` file.

This will enable you to import `.css` file in any `.tsx` file, like for example:

```sh
import styles from './index.module.css';
```

Plus added support of IntelliSense in VSCode ;

To update/create all `.css.d.ts` files in one shot:

```sh
npm run create-types-for-css-modules
```

## SASS file usage

Run script:

```sh
npm run sass-watch
```

This will automatically create/update a `.d.ts` typings file whenever you add or modify a `.scss` file.

This will enable you to import `.scss` file in any `.tsx` file, like for example:

```sh
import styles from './index.module.scss';
```

Plus added support of IntelliSense in VSCode ;

To update/create all `.scss.d.ts` files in one shot:

```sh
npm run create-types-for-sass-modules
```

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/hdorgeval/gatsby-starter-ts-hello-world)
