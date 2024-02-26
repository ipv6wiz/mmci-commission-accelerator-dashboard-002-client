import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {NavigationItem} from "../entities/navigation-item.interface";
import {arrayUnion} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
    private dbPath = '/navigation';
    navRef: AngularFirestoreCollection<NavigationItem>;
  constructor(private afs: AngularFirestore) {
      this.navRef = afs.collection(this.dbPath);
  }

  async getAllFilteredByRole(userRoles: string[]) {
      // console.log('userRoles: ', userRoles);
    const res = await this.navRef.ref
        .where('roles', "array-contains-any", userRoles).get();
    let data: any[] = [];
    res.docs.forEach(doc => {
        const navTree = doc.data();
        const cleanTree = this.cleanNavTree(navTree, userRoles);
        // console.log('cleanTree: ', cleanTree);
        data.push(cleanTree)
    });
    return data;
  }

  createMenuSection(section: NavigationItem) {
      section.children = [];
      return this.navRef.add({...section});
  }

  updateParent(parentId: string, data: any) {
      return this.navRef.doc(parentId).update(data);
  }

  createMenuChild(parentId: string, childItem: NavigationItem) {
      const addArrayItem = {children: arrayUnion(childItem)};
      return this.updateParent(parentId, addArrayItem);
  }

  cleanNavTree(navTreeItem: NavigationItem, userRoles: string[]) {
      // console.log('navTreeItem: ', navTreeItem);
      // console.log('userRoles: ', userRoles);
      const okRole = (!!navTreeItem.roles) ? navTreeItem.roles.some((r: string) => userRoles.includes(r)) : false;
      // console.log('okRole: ', okRole);
      if(!okRole) {
          return null;
      }
      if(okRole && navTreeItem.children && navTreeItem.children.length > 0) {
          let i = 0;
          while (i < navTreeItem.children.length) {
              let res = this.cleanNavTree(navTreeItem.children[i], userRoles)
              if (res === null) {
                  navTreeItem.children.splice(i, 1);
              } else {
                  i++;
              }
          }
      }
      if(okRole) {
          return navTreeItem;
      } else {
          return null;
      }
  }
}
