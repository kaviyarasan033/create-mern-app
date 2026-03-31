import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  getIdToken
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import api from '../api/apiClient';
import MernToast from '../utils/MernToast';

class FirebaseAuthService {
  
  // Sign in with Google
  async signInWithGoogle() {
    if (!auth) {
      MernToast('Google authentication is not configured', 'error');
      throw new Error('Firebase Auth not initialized');
    }
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
      MernToast(error.message || 'Google authentication failed', 'error');
      throw error;
    }
  }
  
  // Sign out
  async signOut() {
    if (!auth) return;
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      MernToast('Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      MernToast('Failed to sign out', 'error');
      throw error;
    }
  }
  
  // Listen for auth state changes
  onAuthStateChange(callback) {
    if (!auth) {
      // Return a dummy unsubscribe function if auth is not initialized
      return () => {};
    }
    return onAuthStateChanged(auth, callback);
  }
  
  // Get current user
  getCurrentUser() {
    return auth ? auth.currentUser : null;
  }
  
  // Get ID token
  async getIdToken() {
    if (!auth) return null;
    const user = auth.currentUser;
    if (user) {
      return await getIdToken(user);
    }
    return null;
  }
}


const firebaseAuthService = new FirebaseAuthService();
export default firebaseAuthService;
