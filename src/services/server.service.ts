import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private readonly _server: string;

  constructor() {
    this._server = "http://localhost:8080/WadServer";
  }

  get server() {
    return this._server;
  }
}
