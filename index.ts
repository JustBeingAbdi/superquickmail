import {Api} from "./Api/start";
import {ServerConfig } from "./lib";
let Webserver = new Api();
if(ServerConfig.multiservers){
ServerConfig.ports.forEach(x => {
Webserver.init(x);
})
} else {
    Webserver.init(ServerConfig.defaultport).then(z => {
        console.log("WebServer is Online on port " + x);
    })
}