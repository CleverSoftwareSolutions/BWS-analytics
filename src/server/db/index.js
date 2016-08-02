import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import jwt from 'jsonwebtoken';
import {calendarClient} from './config';
import Client from '../models/Client';
import AccessToken from '../models/AccessToken';

export function connectDatabase(uri) {
  return new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(uri);
  });
}

export async function registerCalendarClient() {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const client = await Client.findOne({id: calendarClient.id});
        console.log("Attempting to create new client...");
        if (!client) {
          console.log("Client with id ", calendarClient.id, " not found. Creating!");
          await Client.create({
            id: calendarClient.id,
            name: calendarClient.name,
            secret: 'will-be-generated',
            trusted: true,
          });
        }
        else console.log("Client with id ", calendarClient.id, "already found. No creation");
        resolve();
      } catch (error) {
        reject(error);
      }
    })();
  });
}
