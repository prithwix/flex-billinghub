import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

export class AppConstants {
  public static readonly apiUrl: string = environment.apiUrl;
  public static readonly environment: string = environment.environmentName;

  public static readonly httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
    }),
    withCredentials: true,
  };
}
