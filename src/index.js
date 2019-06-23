import ComponentModule from './components/componentModule'
import './fullScreen.js';
import {
    activateModules
} from "./utils/register";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    AppComponent
} from "./components/app";

activateModules([ComponentModule]);

function component() {
    return new AppComponent();
}
const link = document.createElement('link');
link.href = "https://fonts.googleapis.com/css?family=Roboto&display=swap";
link.rel="stylesheet";
document.head.appendChild(link);

document.body.appendChild(component());