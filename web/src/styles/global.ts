import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

*:focus{
  outline: 0;
}

html, body, #root {
  height: 100%;
}

body {
  background: #f1f1f1;
  color: #2e2e2e;
  transition: all 0.25s linear;
  -webkit-font-smoothing: antialiased;
}

body, input, button {
  font: 14px 'Roboto', sans-serif;
}

footer {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
}

a {
  text-decoration: none;
  color: #2e2e2e;
}

ul {
  list-style: none;
}

button {
  cursor: pointer;
}

.css-2b097c-container {
  margin-top: 10px;

  .css-b8ldur-Input {
    margin-top: 10px;
  }
}

.css-14jk2my-container {
  margin-top: 10px;
}

.table td, .table th {
  vertical-align: middle;
  border-top: 0;
}



.form {
  background: #fff;
  border-radius: 6px;
  padding: 25px;
  margin-top: 25px;
}
`;
