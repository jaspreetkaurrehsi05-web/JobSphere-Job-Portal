import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../Firebase";
import { User } from "../Models/User";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AuthService from "./AuthService";

const dbPath = "users";

class UserService {
  async register(data) {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    );

    const newUser = new User();

    newUser.name = data.name;
    newUser.contact = data.contact;
    newUser.email = data.email;
    newUser.uid = userCredential.user.uid;

    const docRef = await setDoc(doc(db, dbPath, userCredential.user.uid), {
      ...newUser,
    });

    return newUser;
  }

  async login(data) {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    );
    const docRef = doc(db, dbPath, userCredential.user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let user = docSnap.data();

      if (user.status === "blocked") {
        throw new Error("Your account has been blocked by Admin");
      }

      let authData = {
        name: user.name,
        email: user.email,
        uid: user.uid,
        userType: user.userType,
      };

      AuthService.setData(authData);

      return user;
    } else {
      toast.error("No such document!");
      console.log("No such document!");
      return false;
    }
  }

  async add(data) {
    const newUser = new User();

    newUser.name = data.name;
    newUser.email = data.email;
    newUser.contact = data.contact;
    newUser.address = data.address;
    newUser.skills = data.skills;
    newUser.profileImage = data.profileImage;

    const docRef = await addDoc(collection(db, dbPath), {
      ...newUser,
    });

    return newUser;
  }
  async all() {
    const q = query(collection(db, dbPath), where("userType", "==", "user"));

    const querySnapshot = await getDocs(q);

    let users = [];

    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return users;
  }
  async single(id) {
    const docRef = doc(db, dbPath, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      toast.error("No such document!");
      console.log("No such document!");
      return false;
    }
  }

  async update(id, payload) {
    const userRef = doc(db, dbPath, id);
    return await updateDoc(userRef, payload);
  }

  async delete(id) {
    return await deleteDoc(doc(db, dbPath, id));
  }
}

export default new UserService();
