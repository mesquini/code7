<div style="background-color:black;" align="center">
  <img src=".github/logo_branca.svg" alt="App demo"/>
</div>

<h4 align="center">
  Plataforma para controle de devedores
</h4>

<p align="center">
  <a href="#page_with_curl-resumo">Resumo</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-como-codar">Como codar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

## :page_with_curl: Resumo

Este projeto é responsável por cadastrar e controlar os devedores.

| Method     | Endpoint        | Descrição                 |
| ---------- | --------------- | ------------------------- |
| **GET**    | /doc            | Mostrar o Swagger         |
| **POST**   | /sessions       | Faz a autenticação da API |
| **GET**    | /dividends      | Lista todos os devedores  |
| **PUT**    | /dividends      | Atualiza um devedore      |
| **POST**   | /dividends      | Cria um devedor           |
| **DELETE** | /dividends/{id} | Deleta um devedore por ID |

## :rocket: Tecnologias

Este projeto foi desenvolvido para realizar o seguinte desafio ([clique aqui para ver](https://1drv.ms/b/s!AoQ9SDShqewLu2CZEqeiRg1KE7uW)), contém Node e React com as seguintes tecnologias:

- Backend

  - [Yarn][yarn]
  - [Celebrate](https://github.com/arb/celebrate)
  - [Cors](https://github.com/expressjs/cors)
  - [Dotenv](https://github.com/motdotla/dotenv)
  - [Express](https://www.npmjs.com/package/express)
  - [ReactJS](https://reactjs.org/)
  - [Axios](https://github.com/axios/axios)
  - [Helmet](https://www.npmjs.com/package/helmet)
  - [Morgan](https://github.com/expressjs/morgan)
  - [Eslint](https://www.npmjs.com/package/eslint)
  - [Prettier](https://www.npmjs.com/package/prettier)
  - [VS Code][vc]

- Frontend
  - [Axios](https://www.npmjs.com/package/axios)
  - [Yup](https://github.com/jquense/yup)
  - [React Toastify](https://www.npmjs.com/package/react-toastify)
  - [Styled Components](https://www.npmjs.com/package/styled-components)
  - [uuidv4](https://www.npmjs.com/package/uuidv4)
  - [React Spinners Kit](https://www.npmjs.com/package/react-spinners-kit)
  - [React Router Dom](https://www.npmjs.com/package/react-router-dom)
  - [React Icons](https://www.npmjs.com/package/react-icons)
  - [Bootstrap](https://www.npmjs.com/package/bootstrap)
  - [Polished](https://www.npmjs.com/package/polished)
  - [@unform/core](https://www.npmjs.com/package/@unform/core)
  - [@unform/web](https://www.npmjs.com/package/@unform/web)

## :information_source: Como executar

- Clonar o projeto:

  ```sh
  git clone https://github.com/mesquini/code7
  ```

- Abra a pasta:

  ```sh
  cd code7
  ```

- Rodar Docker Compose (se tiver):

  ```sh
  docker-compose up
  ```

- Entrar na pasta da API e rodar:

  ```sh
  cd api && yarn
  ```

- Inicializar os Seeds e rodar:

  - Após rodar o seeds, será criado um usuário para login. Email: admin@debts.com / Senha: 123123

  ```sh
  yarn seeds && yarn dev
  ```

- \*Caso não roudou o docker-compose, entrar na pasta WEB e rodar:

  ```sh
  cd web && yarn
  ```

- Executar o Web:

  ```sh
  cd yarn start
  ```

<br />

**Obs**: Para rodar o docker compose precisa [instalar](https://docs.docker.com/compose/install) ele ou usar a [extensão](https://code.visualstudio.com/docs/containers/overview) no VScode.

---

Feito por Victor Mesquini :wave: [Clique aqui!](https://www.linkedin.com/in/mesquini/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
