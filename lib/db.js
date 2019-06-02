import FileSync from 'lowdb/adapters/FileAsync';
import low from 'lowdb';

export async function getDB() {
  const adapter = new FileSync('db.json');
  const db = await low(adapter);
  return db;
}
