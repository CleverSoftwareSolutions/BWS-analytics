import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import validate from 'mongoose-validator';
import bcrypt from 'bcrypt-as-promised';
import * as provider from '../auth/provider';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    validate: validate({
      validator: 'isEmail',
      message: 'is not valid',
    }),
  },
  hashed_password: {
    type: String,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  provider: {
    type: String,
    required: true,
    enum: ['local', ...Object.keys(provider)],
    default: 'local',
  },
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    transform(doc, ret) {
      delete ret.hashed_password;
    },
  },
});

UserSchema.virtual('password')
  .set(function setPassword(value) {this._password = value; })
  .get(function getPassword() { return this._password; });

UserSchema.virtual('confirm_password')
  .set(function setConfirmPassword(value) {this._confirm_password = value; })
  .get(function getConfirmPassword() { return this._confirm_password; });

UserSchema.pre('validate', function preValidate(next) {
  if(this.provider !== 'local') return next();

  if(!this.hashed_password && !this.password) {
    this.invalidate('password', 'is required');
  } else if (this.password.length < 6) {
    this.invalidate('password', 'must be at least 6 characters');
  } else if (this.password !== this.confirm_password) {
    this.invalidate('password', 'doesn\'t match the confirmation password');
  }

  next();
});

UserSchema.pre("save", async function preSave(next) {
  if(!this.password) return next();

  try {
    let salt = await bcrypt.genSalt();
    this.hashed_password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model('User', UserSchema);
