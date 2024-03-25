import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from 'nanoid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "contacts.json");

async function readContactsFile() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Błąd podczas odczytu pliku z kontaktami:", err);
    return [];
  }
}

async function writeContactsToFile(contacts) {
  try {
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );
  } catch (err) {
    console.error("Błąd podczas zapisu pliku z kontaktami:", err);
  }
}

async function listContacts() {
  try {
    const contacts = await readContactsFile();
    console.table(contacts);
  } catch (err) {
    console.error("Błąd przy pobieraniu listy", err);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await readContactsFile();
    const contact = contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    if (!contact) {
      console.log(`Nie znaleziono kontaktu o ID: ${contactId}`);
      return;
    }
    console.log(contact);
  } catch (err) {
    console.error("Błąd przy pobieraniu danych kontaktu po numerze ID", err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readContactsFile();
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId.toString()
    );
    if (contacts.length === filteredContacts.length) {
      console.log(`Nie znaleziono kontaktu o ID: ${contactId} do usunięcia.`);
      return;
    }
    await writeContactsToFile(filteredContacts);
    console.log(`Usunięto kontakt o ID: ${contactId}`);
  } catch (err) {
    console.error("Błąd przy usuwaniu kontaktu!", err);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await readContactsFile();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await writeContactsToFile(contacts);
    console.log(`Dodano kontakt: ${name} z ID: ${newContact.id}`);
  } catch (err) {
    console.error("Błąd przy dodawaniu nowego kontaktu.", err);
  }
}

export { listContacts, getContactById, removeContact, addContact };


