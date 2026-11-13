import { 
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc
} from "firebase/firestore";

import { db } from "../Firebase";
import { Contact } from "../Models/Contact";


const dbPath = "contactMessages";


class ContactService {

  async add(data){

    const newContact = new Contact();

    newContact.name = data.name;
    newContact.email = data.email;
    newContact.subject = data.subject;
    newContact.message = data.message;


    await addDoc(collection(db, dbPath),{
      ...newContact
    });

    return newContact;
  }



  async all(){

    let snapshot = await getDocs(
      collection(db,dbPath)
    );


    let contacts=[];


    snapshot.forEach((doc)=>{

      contacts.push({
        id:doc.id,
        ...doc.data()
      });

    });


    return contacts;
  }



  async update(id,payload){

    return await updateDoc(
      doc(db,dbPath,id),
      payload
    );

  }



  async delete(id){

    return await deleteDoc(
      doc(db,dbPath,id)
    );

  }

}


export default new ContactService();