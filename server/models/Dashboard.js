
const mongoose = require('mongoose');

const widgetSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['statCard', 'chart', 'table', 'custom'],
    required: true
  },
  defaultSize: {
    w: { type: Number, required: true },
    h: { type: Number, required: true }
  },
  defaultPosition: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  minSize: {
    w: Number,
    h: Number
  },
  config: {
    type: mongoose.Schema.Types.Mixed
  }
});

const dashboardSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  widgets: [widgetSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

dashboardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Dashboard', dashboardSchema);
