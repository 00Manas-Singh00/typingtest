class UserManager {
  constructor() {
    this.currentUser = null;
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        // Verify that the user still exists in the users database
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        if (users[parsedData.username]) {
          this.currentUser = {
            username: parsedData.username,
            ...users[parsedData.username]
          };
        } else {
          // If user no longer exists in database, clear the session
          localStorage.removeItem('currentUser');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }

  saveCurrentUser() {
    if (this.currentUser) {
      try {
        localStorage.setItem('currentUser', JSON.stringify({
          username: this.currentUser.username
        }));
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }
  }

  register(username, password) {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (users[username]) {
        return { success: false, message: 'Username already exists' };
      }

      const initialStats = {
        totalTests: 0,
        averageWPM: 0,
        bestWPM: 0,
        totalMistakes: 0,
        totalCharacters: 0
      };

      users[username] = {
        password,
        stats: initialStats,
        history: []
      };

      localStorage.setItem('users', JSON.stringify(users));
      
      // Set the current user after successful registration
      this.currentUser = {
        username,
        ...users[username]
      };
      this.saveCurrentUser();
      
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      console.error('Error during registration:', error);
      return { success: false, message: 'Registration failed' };
    }
  }

  login(username, password) {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (!users[username] || users[username].password !== password) {
        return { success: false, message: 'Invalid username or password' };
      }

      this.currentUser = {
        username,
        ...users[username]
      };
      this.saveCurrentUser();
      return { success: true, message: 'Login successful' };
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, message: 'Login failed' };
    }
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  updateStats(wpm, mistakes, characters) {
    if (!this.currentUser) return;

    try {
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      const user = users[this.currentUser.username];
      
      // Update statistics
      user.stats.totalTests++;
      user.stats.totalMistakes += mistakes;
      user.stats.totalCharacters += characters;
      
      // Calculate new average WPM
      const totalWPM = user.stats.averageWPM * (user.stats.totalTests - 1) + wpm;
      user.stats.averageWPM = totalWPM / user.stats.totalTests;
      
      // Update best WPM if current WPM is higher
      user.stats.bestWPM = Math.max(user.stats.bestWPM, wpm);

      // Add to history
      user.history.push({
        date: new Date().toISOString(),
        wpm,
        mistakes,
        characters,
        accuracy: ((characters - mistakes) / characters * 100).toFixed(2)
      });

      // Keep only last 10 tests in history
      if (user.history.length > 10) {
        user.history.shift();
      }

      // Update current user and save
      this.currentUser = {
        username: this.currentUser.username,
        ...user
      };
      users[this.currentUser.username] = user;
      localStorage.setItem('users', JSON.stringify(users));
      this.saveCurrentUser();
    } catch (error) {
      console.error('Error updating stats:', error);
    }
  }

  getStats() {
    return this.currentUser ? this.currentUser.stats : null;
  }

  getHistory() {
    return this.currentUser ? this.currentUser.history : null;
  }
}

const userManager = new UserManager(); 