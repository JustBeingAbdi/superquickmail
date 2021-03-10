import {Api} from "./Api/start";
import {App} from "./App/start";
import {ServerConfig } from "./lib";
let ApiServer = new Api();
let AppServer = new App();

if(ServerConfig.multiservers){
ServerConfig.ports.forEach(x => {
ApiServer.init(x);
})
} else {
    ApiServer.init(ServerConfig.defaultport)
}


AppServer.init(ServerConfig.appport);
