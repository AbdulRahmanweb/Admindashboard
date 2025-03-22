import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "./firebaseConfig";
import { useDispatch } from "react-redux";
import { logoutUser } from "../Redux/Features/authSlice";

const auth = getAuth(app);

//Signup function
export const signup = (email, password) => {
	return createUserWithEmailAndPassword(auth, email, password);
}

//Login function
export const login = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password);
}

//Logout function
export const logout = () => {
	const dispatch = useDispatch();
	signOut(auth).then(() => {
		dispatch(logoutUser());
	});
}