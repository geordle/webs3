import ComponentModule from './components/componentModule'
import { activateModules } from "./utils/register";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppComponent } from "./components/app";


activateModules([ComponentModule]);

function component() {
    return new AppComponent();
}

document.body.appendChild(component());
