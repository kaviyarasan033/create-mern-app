let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123' }
];

const authController = {
  register: (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and password are required'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'Passwords do not match'
      });
    }

    if (users.find(u => u.email === email)) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered'
      });
    }

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      createdAt: new Date()
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      },
      token: 'demo_token_' + newUser.id
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        token: 'demo_token_' + user.id
      }
    });
  },

  logout: (req, res) => {
    res.json({
      success: true,
      message: 'Logout successful'
    });
  },

  getCurrentUser: (req, res) => {
    const user = users[0];
    res.json({
      success: true,
      data: user ? {
        id: user.id,
        name: user.name,
        email: user.email
      } : null
    });
  }
};

module.exports = authController;
