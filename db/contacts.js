async function listContacts() {
  const contacts = await readContactsFile();
  console.table(contacts);
}

async function getContactById(contactId) {
  const contacts = await readContactsFile();
  const contact = contacts.find(
    (contact) => contact.id === parseInt(contactId)
  );
  console.log(contact);
}

async function removeContact(contactId) {
  const contacts = await readContactsFile();
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
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

const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readContactsFile() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
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
    console.error(err);
  }
}
