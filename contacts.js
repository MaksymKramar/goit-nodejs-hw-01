const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const getAllContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath)
        const contacts = JSON.parse(data)
        return contacts
    } catch (error) {
        console.log(error)
    }
};

const updateContacts =  async(newContacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
};

// const listContacts = async () => {
//   try {
//     const contacts = await getAllContacts()
//     console.table(contacts)
//   } catch (error) {
    // console.log(error)
//   }
// }

async function listContacts() {
    try {
        const contacts = await getAllContacts()
    console.table(contacts)
     } catch (error) {
    console.log(error)        
    }
};

const getContactById = async (id) => {
    const contacts = await getAllContacts();
    const contact = contacts.find(item => item.id === id);
    if (!contact) {
        console.log('no contacts with id:', id)
        return null;
    }
    console.table(contact)
    return contact;
};

const removeContact = async (id) => {
    try {
        const contacts = await getAllContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if (idx === -1) {
        console.log('no contacts with id:', id)
        return null;
    }
    console.log('Removing contact with id',id, 'from Phonebook')
    await getContactById(id)
    
    contacts.splice(idx, 1);
    // await fs.writeFile(contactsPath, JSON.stringify(contacts));
    await updateContacts(contacts);
    console.table(contacts);
    console.log("Success remove");
    } catch (error) {
        console.log(error);
    }
};

const addContact = async (name, email, phone) => {
    const contacts = await getAllContacts();
    const id = v4();
    const newContact = { id, name, email, phone };
    contacts.push(newContact);
    // await fs.writeFile(contactsPath, JSON.stringify(contacts));
    await updateContacts(contacts);

    console.table(contacts);
    console.log('Contact added to Phonebook')
    return newContact;
};

// function addContact(name, email, phone) {
//     // ...твой код
// }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}