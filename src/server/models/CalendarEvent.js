import mongoose from 'mongoose-fill';

const CalendarEventSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  project: {
    type: String
  },
  hours: {
    type: Number
  },
  minutes: {
    type: Number
  },
  description: {
    type: String
  },
  worked_at: {
    type: Date
  },
  action: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
  },
});

export default mongoose.model('CalendarEvent', CalendarEventSchema);
