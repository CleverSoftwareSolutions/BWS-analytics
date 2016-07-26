import mongoose from 'mongoose-fill';

const CalendarEventSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
  },
});

export default mongoose.model('CalendarEvent', CalendarEventSchema);
