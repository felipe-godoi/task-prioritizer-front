import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}

  apiURL = 'http://localhost:8000';

  async postRequest(url: any, body: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiURL + url, body).subscribe({
        next(res) {
          resolve(res);
        },
        error(err) {
          reject(err);
        },
      });
    });
  }

  public async getRequest(url: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiURL + url).subscribe({
        next(res) {
          resolve(res);
        },
        error(err) {
          reject(err);
        },
      });
    });
  }

  public async deleteRequest(url: any, body: any) {
    return new Promise((resolve, reject) => {
      this.http.request("delete", this.apiURL + url, { body: body }).subscribe({
        next(res) {
          resolve(res);
        },
        error(err) {
          reject(err);
        },
      });
    });
  }
}
