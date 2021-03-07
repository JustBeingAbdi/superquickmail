import express from "express";
import {Api} from "./../Api/start";

export class Core {
    public async init(): Promise<any> {
        this.start();
    }

    private async start(): Promise<any> {
        new Api().init();

    }
    
}