import { generateUniqueId } from '@/store/id_gen.js';

export const localStorageStore = {
  
  //Setter and Getters for the Users Profile
  setName(name) {
    try {
      localStorage.setItem('name', name);

    } catch (error) {
      console.error('Error setting name in localStorage:', error);
    }
  },

  getName() {
    try {
      const name = localStorage.getItem('name');
      return name;
    } catch (error) {
      console.error('Error getting name from localStorage:', error);
      return false;
    }
  },

  setAge(age) {
    try {
      localStorage.setItem('age', age);
    } catch (error) {
      console.error('Error setting age in localStorage:', error);
    }
  },

  getAge() {
    try {
      const age = localStorage.getItem('age');
      return age ? parseInt(age) : null; // Parse age as an integer if available
    } catch (error) {
      console.error('Error getting age from localStorage:', error);
      return false;
    }


  },

  setID() {
    try {
      const id = generateUniqueId();
      localStorage.setItem('ID', id);
    } catch (error) {
      console.error('Error setting ID:', error);
      return false;

    }
  },
  getID() {
    try {
      return localStorage.getItem('ID');
    } catch (error) {
      console.error('Error getting ID:', error);
      return false;
    }
  }

}
