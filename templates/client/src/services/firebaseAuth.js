import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  getIdToken
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import api from './apiService';
import toast from 'react-hot-toast';

class FirebaseAuthService {
  
  // Sign in with Google
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Get Firebase ID token
      const firebaseToken = await getIdToken(user);
      
      // Send to backend for JWT token generation
      const response = await api.post('/api/auth/google', {
        firebaseToken,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL
      });
      
      if (response.data.success) {
        return {
          token: response.data.data.token,
          user: response.data.data.user
        };
      }
      
      throw new Error('Failed to authenticate with backend');
      
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast.error(error.message || 'Google authentication failed');
      throw error;
    }
  }
  
  // Sign out
  async signOut() {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
      throw error;
    }
  }
  
  // Listen for auth state changes
  onAuthStateChange(callback) {
    return onAuthStateChanged(auth, callback);
  }
  
  // Get current user
  getCurrentUser() {
    return auth.currentUser;
  }
  
  // Get ID token
  async getIdToken() {
    const user = auth.currentUser;
    if (user) {
      return await getIdToken(user);
    }
    return null;
  }
}

const firebaseAuthService = new FirebaseAuthService();
export default firebaseAuthService;