const { Command } = require("commander");
const program = new Command();
const contactsOperations = require("./db/contacts");

program.version("0.0.1").description("Contact management system");

program
  .command("list")
  .description("List all contacts")
  .action(async () => {
    const contacts = await contactsOperations.listContacts();
    console.log(contacts);
  });

program
  .command("get <id>")
  .description("Get a contact by id")
  .action(async (id) => {
    const contact = await contactsOperations.getContactById(id);
    console.log(contact);
  });

program
  .command("add <name> <email> <phone>")
  .description("Add a new contact")
  .action(async (name, email, phone) => {
    await contactsOperations.addContact(name, email, phone);
    console.log(`Added contact: ${name}`);
  });

program
  .command("remove <id>")
  .description("Remove a contact")
  .action(async (id) => {
    await contactsOperations.removeContact(id);
    console.log(`Removed contact with ID: ${id}`);
  });

program.parse(process.argv);
