const fs = require("fs").promises;
const path = require("path");

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
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");
  } catch (err) {
    console.error("Błąd podczas zapisu pliku z kontaktami:", err);
  }
}

async function listContacts() {
  const contacts = await readContactsFile();
  console.table(contacts);
}

async function getContactById(contactId) {
  const contacts = await readContactsFile();
  const contact = contacts.find((contact) => contact.id === contactId.toString());
  if (!contact) {
    console.log(`Nie znaleziono kontaktu o ID: ${contactId}`);
    return;
  }
  console.log(contact);
}

async function removeContact(contactId) {
  const contacts = await readContactsFile();
  const filteredContacts = contacts.filter((contact) => contact.id !== contactId.toString());
  if (contacts.length === filteredContacts.length) {
    console.log(`Nie znaleziono kontaktu o ID: ${contactId} do usunięcia.`);
    return;
  }
  await writeContactsToFile(filteredContacts);
  console.log(`Usunięto kontakt o ID: ${contactId}`);
}

async function addContact(name, email, phone) {
  const contacts = await readContactsFile();
  const newContact = { id: Date.now().toString(), name, email, phone };
  contacts.push(newContact);
  await writeContactsToFile(contacts);
  console.log(`Dodano kontakt: ${name}`);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
