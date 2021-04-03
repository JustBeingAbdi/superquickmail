import {Api} from "./Api/start";
import {App} from "./App/start";
import {Server} from "./Policy";
import {ServerConfig } from "./lib";
let ApiServer = new Api();
let AppServer = new App();
let PolicyServer = new Server();

if(ServerConfig.multiservers){
ServerConfig.ports.forEach(x => {
ApiServer.init(x);
})
} else {
    ApiServer.init(ServerConfig.defaultport)
}


AppServer.init(ServerConfig.appport);

PolicyServer.init(ServerConfig.port);
