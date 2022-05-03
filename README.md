# Backstage

Check out our demo at [Backstage Demo](https://www.youtube.com/watch?v=MDHjMw_INnw&feature=youtu.be).

# Project Summary

Backstage originated as a project for COS 495, but rapidly developed into a startup that has been accepted into the Neo accelerator program, and is currently valued at $5 million. As such, for this COS 495 project, we have forked off of our company's Github repository and are submitting a more limited feature set of our product for this class. This is largely because we don't wish to share our company's repository with others. We would like to acknowledge both Quinn Donohue and Jorge Zreik for conducting development work for the startup, much of which contributed to the product’s overall development. Nonetheless, the feature set being submitted for this class has largely been developed by Alberto Rigail, Aryaman Khandelwal, and David Lipman.

## Dependencies

- `yarn`
- `Node.js`
- Several yarn dependencies.

## Development

Run `yarn install` to install all dependencies.

Run `yarn dev` to run the development server.

Run `yarn prisma studio` to view the database UI.

Run `yarn prisma generate` to regenerate the prisma client (needed after modifying the schema).

Run `yarn prisma db push` to prototype a new schema or a new feature for an existing schema.

## File Map

- `/.vscode`: VS Code settings
  - **_NOTE:_** Currently adds Tailwind tags to CSS linting rules
- `/components`: Reusable React components
- `/interfaces`: Reusable Typescript interfaces (types)
- `/pages`: Page endpoint components and API endpoint components
  - **_NOTE:_** Endpoints are autogenerated by Next using the file names, and any file in the api directory is an API endpoint that has `api/` prepended to its endpoint
  - `_app.js`: The root of our app where we import CSS, render other pages, and (rarely) insert global content (like Head, etc.)
- `/prisma`: Database files
  - `schema.prisma`: Defines the prisma schema
- `/public`: Static resources like fonts, images, etc.
  - `/fonts`: Fonts
  - `/images`: Images, icons, etc.
    - `backstage-icon.png`: Our favicon
  - `manifest.json`: Specifies stylistic details for browsers to do things like "Add to Homescreen" or show an icon in the bookmarks library
- `/utils`: General purpose scripts
- `.gitignore`: Tells git to ignore files
- `next-env.d.ts`: [Autogenerated] Used by next to assist in typescript compilation
  - **_NOTE:_** Don't touch at all
- `package.json`: Npm configuration
- `postcss.config.js`: Postcss (CSS autoprefixer) configuration
- `README.md`: This.
- `styles.css`: Global stylesheet
  - **_NOTE:_** This is only used to load Tailwind, load fonts, provide css defaults, and add custom tailwind tags
- `tailwind.config.js`: Tailwind configuration
- `tsconfig.json`: Typescript project configuration
- `yarn.lock`: [Autogenerated] Yarn dependency list
