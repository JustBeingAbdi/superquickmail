import express from "express";
import {Api} from "./../Api/start";

export class Core {
    public async init(): Promise<any> {
         new Api().init();
    }

    
    
}