// const express = require('express');
// const Message = require('../models/Message');
// const router = express.Router();
// const mongoose = require('mongoose');

// // Fetch messages between two users
// router.get('/:sender/:recipient', async (req, res) => {
//   try {
//     const { sender, recipient } = req.params;
//     const messages = await Message.find({
//       $or: [
//         { sender, recipient },
//         { sender: recipient, recipient: sender },
//       ],
//     }).sort('timestamp');
//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching messages' });
//   }
// });

// // Send a message
// router.post('/', async (req, res) => {
//     try {
//       const { sender, recipient, message } = req.body;
  
//       if (!sender || !recipient || !message) {
//         return res.status(400).json({ error: 'Sender, recipient, and message are required.' });
//       }
  
//       const senderId = new mongoose.Types.ObjectId(sender);
//       const recipientId = new mongoose.Types.ObjectId(recipient);
  
//       const newMessage = new Message({ sender: senderId, recipient: recipientId, message });
//       await newMessage.save();
//       res.status(201).json(newMessage);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       res.status(500).json({ error: 'Error sending message' });
//     }
//   });

// module.exports = router;

// const express = require('express');
// const mongoose = require('mongoose');
// const Message = require('../models/Message');
// const router = express.Router();

// // Send a message
// router.post('/', async (req, res) => {
//   try {
//     const { sender, recipient, message } = req.body;

//     if (!sender || !recipient || !message) {
//       return res.status(400).json({ error: 'Sender, recipient, and message are required.' });
//     }

//     // Validate sender and recipient as ObjectIds
//     if (!mongoose.Types.ObjectId.isValid(sender) || !mongoose.Types.ObjectId.isValid(recipient)) {
//       return res.status(400).json({ error: 'Invalid sender or recipient ID.' });
//     }

//     const senderId = new mongoose.Types.ObjectId(sender);
//     const recipientId = new mongoose.Types.ObjectId(recipient);

//     const newMessage = new Message({ sender: senderId, recipient: recipientId, message });
//     await newMessage.save();
//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.error('Error sending message:', error);
//     res.status(500).json({ error: 'Error sending message' });
//   }
// });

// // Fetch messages between two users
// router.get('/:senderId/:recipientId', async (req, res) => {
//   try {
//     const { senderId, recipientId } = req.params;

//     // Validate senderId and recipientId as ObjectIds
//     if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(recipientId)) {
//       return res.status(400).json({ error: 'Invalid sender or recipient ID.' });
//     }

//     const senderObjectId = new mongoose.Types.ObjectId(senderId);
//     const recipientObjectId = new mongoose.Types.ObjectId(recipientId);

//     const messages = await Message.find({
//       $or: [
//         { sender: senderObjectId, recipient: recipientObjectId },
//         { sender: recipientObjectId, recipient: senderObjectId },
//       ],
//     }).sort({ timestamp: 1 });

//     res.json(messages);
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     res.status(500).json({ error: 'Error fetching messages' });
//   }
// });

// module.exports = router;


const express = require('express');
const mongoose = require('mongoose');
const Message = require('../models/Message');
const User = require('../models/User');  // Assuming you have a User model
const router = express.Router();

// Send a message
router.post('/', async (req, res) => {
  try {
    const { sender, recipient, message } = req.body;

    if (!sender || !recipient || !message) {
      return res.status(400).json({ error: 'Sender, recipient, and message are required.' });
    }

    // Validate sender and recipient as ObjectIds
    if (!mongoose.Types.ObjectId.isValid(sender) || !mongoose.Types.ObjectId.isValid(recipient)) {
      return res.status(400).json({ error: 'Invalid sender or recipient ID.' });
    }

    const senderId = new mongoose.Types.ObjectId(sender);
    const recipientId = new mongoose.Types.ObjectId(recipient);

    // Fetch the sender's name
    const senderUser = await User.findById(senderId);
    if (!senderUser) {
      return res.status(404).json({ error: 'Sender not found.' });
    }
    const senderName = senderUser.name;

    const newMessage = new Message({ sender: senderId, senderName, recipient: recipientId, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
});

// Fetch messages between two users
router.get('/:senderId/:recipientId', async (req, res) => {
  try {
    const { senderId, recipientId } = req.params;

    // Validate senderId and recipientId as ObjectIds
    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(recipientId)) {
      return res.status(400).json({ error: 'Invalid sender or recipient ID.' });
    }

    const senderObjectId = new mongoose.Types.ObjectId(senderId);
    const recipientObjectId = new mongoose.Types.ObjectId(recipientId);

    const messages = await Message.find({
      $or: [
        { sender: senderObjectId, recipient: recipientObjectId },
        { sender: recipientObjectId, recipient: senderObjectId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

module.exports = router;
