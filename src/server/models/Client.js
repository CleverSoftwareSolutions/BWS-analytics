import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import uid from 'uid';
import idValidator from 'mongoose-id-validator';

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  id: {
    type: String,
    unique: true,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
  trusted: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

ClientSchema.plugin(idValidator);

ClientSchema.pre('validate', function preSave(next) {
  if(this.isNew) {
    if(!this.id) this.id = uid(16);
    this.secret = uid(32);
  }
  next();
});

export default mongoose.model('Client', ClientSchema);
