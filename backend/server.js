require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mernAuth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Schemas and Models
const godownSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
});
const Godown = mongoose.model('Godown', godownSchema);

const itemSchema = new mongoose.Schema({
  godownId: { type: mongoose.Schema.Types.ObjectId, ref: 'Godown', required: true },
  name: { type: String, required: true },
});
const Item = mongoose.model('Item', itemSchema);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

const deliveryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  godown: { type: String, required: true },
});
const DeliveryItem = mongoose.model('DeliveryItem', deliveryItemSchema);

const saleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  godown: { type: String, required: true },
});

const Sale = mongoose.model('Sale', saleSchema);

// API Routes

// Godown API
app.get('/api/godowns', async (req, res) => {
  try {
    const godowns = await Godown.find();
    res.json(godowns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/godowns', async (req, res) => {
  try {
    const { name, address } = req.body;
    const godown = new Godown({ name, address });
    const savedGodown = await godown.save();
    res.status(201).json(savedGodown);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/godowns/:id', async (req, res) => {
  try {
    const godown = await Godown.findByIdAndDelete(req.params.id);
    if (!godown) return res.status(404).json({ message: 'Godown not found' });
    res.json({ message: 'Godown deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Item API
app.get('/api/items/:godownId', async (req, res) => {
  try {
    const items = await Item.find({ godownId: req.params.godownId });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const { godownId, name } = req.body;
    const item = new Item({ godownId, name });
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delivery Items API
app.post('/api/checkAndAddItem', async (req, res) => {
  const { input, godownName } = req.body;

  try {
    const item = await Item.findOne({ name: input });

    if (item) {
      const newDeliveryItem = new DeliveryItem({ name: input, godown: godownName });
      await newDeliveryItem.save();
      res.json({ success: true, message: 'Item added successfully!' });
    } else {
      res.json({ success: false, message: 'No matching item found in the database.' });
    }
  } catch (error) {
    console.error('Error in checkAndAddItem API:', error);
    res.status(500).json({ success: false, message: 'An error occurred. Please try again.', error: error.message });
  }
});

app.get('/api/getDeliveryItems', async (req, res) => {
  const godownName = req.query.godown;

  if (!godownName) {
    return res.status(400).json({ success: false, message: 'Godown name is required.' });
  }

  try {
    const deliveryItems = await DeliveryItem.find({ godown: godownName });

    if (deliveryItems.length === 0) {
      return res.json({ success: false, message: 'No delivery items found for this godown.' });
    }

    res.json({ success: true, data: deliveryItems });
  } catch (error) {
    console.error('Error fetching delivery items:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching data.' });
  }
});

// User Authentication API
app.post('/api/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Login Route
app.post('/loginadmin', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true });
  }
  return res.json({ success: false });
});

// Godown Login Validation
app.post('/api/login', async (req, res) => {
  const { name, address } = req.body;
  try {
    const godown = await Godown.findOne({ name, address });
    if (godown) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid Godown Name or Address' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// User List API
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User Deletion API
app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all delivery items
app.get('/api/deliveryItems', async (req, res) => {
  try {
    const items = await DeliveryItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching delivery items' });
  }
});

// Add item to sales if it matches deliveryItems
app.post('/api/sales', async (req, res) => {
  const { name, userName, mobileNumber, godown } = req.body;

  try {
    // Check if the item exists in the deliveryItems collection
    const matchingItem = await DeliveryItem.findOne({ name: name.trim() });

    if (!matchingItem) {
      return res.status(400).json({ error: 'Item name does not exist in delivery items.' });
    }

    // Add the item to the sales collection
    const sale = new Sale({ name, userName, mobileNumber, godown });
    await sale.save();

    // Delete the item from the deliveryItems collection
    await DeliveryItem.findByIdAndDelete(matchingItem._id);

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ error: 'Error processing the sale' });
  }
});

// Delete item from delivery items
app.delete('/api/deliveryItems/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await DeliveryItem.findByIdAndDelete(id);
    res.status(200).json({ message: 'Item deleted from delivery items' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting item from delivery items' });
  }
});

// Get all sales grouped by godown
app.get('/api/sales', async (req, res) => {
  try {
    const salesData = await Sale.aggregate([
      { $group: { _id: "$godown", sales: { $push: "$$ROOT" } } }
    ]);
    res.status(200).json(salesData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sales data' });
  }
});




// API Route to Fetch Data
app.get("/api/items", async (req, res) => {
  try {
      const items = await Item.find();
      res.json(items);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
