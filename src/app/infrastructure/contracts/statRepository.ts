import { Observable } from 'rxjs';


export interface StatRepository {
 getTopCategorie():any;
  
 getAllCategories():any;
  
 getCategorie(id:number):any;
}
