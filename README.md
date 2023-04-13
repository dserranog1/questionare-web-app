# Questionare Web App

This project is a questionnare app built with React and TypeScript, and styled with Tailwind CSS, and uses Chakra UI. Previously registered admins can create questions and students, which can then answer these questions. Data is managed with Tanstack Query and Pocketbase, and the project includes icons from Heroicons. Admins can create, read, update, and delete questions and students.

## Getting Started

To get started with this project, clone the repository and install the dependencies using npm:

```
git clone https://github.com/your-username/questionare-web-app.git
cd questionare-web-app
npm install
```

Once the dependencies are installed, start the development server:

```
npm run dev
```

The app will be running at [http://localhost:5173](http://localhost:5173).

## Features

- Role based access
- Ability to register new students (admin only)
- Ability to update/delete students (admin only)
- Ability to create new questions (admin only)
- Ability to update/delete questions (admin only)
- Questions can have any number of answers
- Students can answer the previously created questions
- Client-side routing using React Router

## Technologies Used

This project was built with:

- React
- TypeScript
- Tailwind CSS
- Tanstack Query
- React Select
- Formik
- Chakra UI
- Vite
- Pocketbase
- React router

## Contributing

Contributions are welcome! If you have any suggestions or find any bugs, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Linting

This project uses ESLint for linting. To run linting, use the following command:

```
npm run lint
```

## Building for Production

To build the project for production, use the following command:

```
npm run build
```

The built files will be located in the `dist` folder. Note that you'll need to configure your Pocketbase account credentials in order to connect to the database in production.
