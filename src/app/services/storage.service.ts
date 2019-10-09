import { Injectable } from '@angular/core';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';
import{Plugins} from '@capacitor/core';
const {Storage} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
// //NATIVE STORAGE NOT WORKING, IMPLEMENTED STORAGE WITH CAPACITOR
//   constructor(private Storage: NativeStorage) { 
//   }
//   async store(storageKey: string, value: any){
//     const encryptedValue = btoa(escape(JSON.stringify(value)));
//     await this.Storage.setItem ('storageKey', encryptedValue)
//     .then(
  //     () => console.log('Token Stored!'),
  //     error => console.error('Error storing Token', error)
  //   );
  // }  
  // async get(storageKey: string){
  //   return await this.Storage.getItem('storageKey')
  //   .then(
  //     data => { 
  //       JSON.parse(unescape(atob(data.value)));
  //     },
  //     error => { 
  //       return false;
  //     }
  //   );
  // }


  // async removeItem(storageKey: string){
  //   await this.Storage.remove("storageKey");
  // }
  
  // async clear() {
  //   await this.Storage.clear();
  // }


  constructor() {    
  }

  async store(storageKey: string, value: any){
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    await Storage.set({key :storageKey,
      value: encryptedValue});
    }

    async get(storageKey: string){
      const res = await Storage.get({key: storageKey});
    
      if (res.value){
        return JSON.parse(unescape(atob(res.value)));
      }else {
        return false;
      }
    }

        async removeItem(storageKey: string){
      await Storage.remove({key: storageKey});
    }
  
  async clear() {
    await Storage.clear();
  }


  }