
/////////////////////////////////////////////////////////////////////////////
///////////////////////   Code pour le localStorage   ///////////////////////
/////////////////////////////////////////////////////////////////////////////


// localStorage for contact list


// Check if the people array exists in localStorage or initiate it with the first contact
if (localStorage.getItem('people') === null) {
  let people = [];
  people.push({name: 'John Doe', email: 'first.friend.example@test.com', key: "xxxxxxxxxxxxxxxxxxxx"});
  people.push({name: 'Jane Doe', email: 'second.friend.example@test.com', key: "xxxxxxxxxxxxxxxxxxxx"});
  people.push({name: 'Mommy', email: 'third.friend.example@test.com', key: "xxxxxxxxxxxxxxxxxxxx"});
  people.push({name: 'Daddy', email: 'fourth.friend.example@test.com', key: "xxxxxxxxxxxxxxxxxxxx"});
  people.push({name: 'My Cat', email: 'fifth.friend.example@test.com', key: "xxxxxxxxxxxxxxxxxxxx"});
  localStorage.setItem('people', JSON.stringify(people));
}
let storedPeople = JSON.parse(localStorage.getItem('people'));
let peopleList = document.getElementById('contacts-list');

// Add the contacts to the HTML with click event
for (let i = 0; i < storedPeople.length; i++) {
  let person = storedPeople[i];
  const li = document.createElement('li');
  const span1 = document.createElement('span');
  const span2 = document.createElement('span');
  const a = document.createElement('a');
  a.href = '#';
  span1.textContent = person.name;
  span2.textContent = person.email;
  li.appendChild(span1);
  li.appendChild(span2);
  li.appendChild(a);
  peopleList.appendChild(li);

  // Add the selected class when clicking on a contact
  li.addEventListener('click', function() {
    let selected = peopleList.querySelector('.selected');
    if (selected) {
      selected.classList.remove('selected');
    }
    li.classList.add('selected');
    showOptionButtons();
  });      
}

// Remove the selected class when clicking outside the list
document.addEventListener('click', function(event) {
  if (!peopleList.contains(event.target)) {
    let selected = peopleList.querySelector('.selected');
    if (selected) {
      selected.classList.remove('selected');
    }
  hideOptionButtons();
  }
});



// localStorage for emails


if (localStorage.getItem('emails') === null) {
  let emails = [];
  emails.push({from: 'johndoe@uqo.ca', subject: 'First email', content: "Salut Lucas, comment ça va, je voulais te parler de ton projet web qui est absolument genial, quand es-tu dispo pour un rendez-vous ? Ce ne sera pas long, je veux juste faire un début de mail assez long pour voir comment ça se comporte dans la liste des emails."});
  emails.push({from: 'janedoe@uqo.ca', subject: 'Second email', content: "Salut Lucas, comment ça va, je voulais te parler de ton projet web qui est absolument genial, quand es-tu dispo pour un rendez-vous ? Ce ne sera pas long, je veux juste faire un début de mail assez long pour voir comment ça se comporte dans la liste des emails."});
  emails.push({from: 'daddy@uqo.ca', subject: 'Third email', content: "Salut Lucas, comment ça va, je voulais te parler de ton projet web qui est absolument genial, quand es-tu dispo pour un rendez-vous ? Ce ne sera pas long, je veux juste faire un début de mail assez long pour voir comment ça se comporte dans la liste des emails."});
  emails.push({from: 'mommy@uqo.ca', subject: 'Fourth email', content: "Salut Lucas, comment ça va, je voulais te parler de ton projet web qui est absolument genial, quand es-tu dispo pour un rendez-vous ? Ce ne sera pas long, je veux juste faire un début de mail assez long pour voir comment ça se comporte dans la liste des emails."});
  localStorage.setItem('emails', JSON.stringify(emails));
}
let storedEmails = JSON.parse(localStorage.getItem('emails'));
let emailsList = document.getElementById('emails-list');

// Add contact to HTML
for (let i = 0; i < storedEmails.length; i++) {
  let emails = storedEmails[i];
  const li = document.createElement('li');
  const span1 = document.createElement('span');
  const span2 = document.createElement('span');
  const span3 = document.createElement('span');
  const br1 = document.createElement('br');
  const br2 = document.createElement('br');
  const a = document.createElement('a');
  a.href = '#';
  span1.textContent = emails.from;
  span2.textContent = emails.subject;
  span3.innerHTML = emails.content;
  li.appendChild(span1);
  li.appendChild(span2);
  li.appendChild(br1);
  li.appendChild(br2);
  li.appendChild(span3);
  li.appendChild(a);
  emailsList.appendChild(li);
}





/////////////////////////////////////////////////////////////////////////////
//////////////////////////////////   BUTTONS  ///////////////////////////////
/////////////////////////////////////////////////////////////////////////////




// Form validation when adding contact
function validateForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;

  if (name == "" || email == "") {
    alert("Please fill all the form.");
    return false;
  }
  if (email.indexOf("@") == -1 || email.length < 6) {
    alert("Please enter a valide email adress.");
    return false;
  }
  return true;
}



// Add a contact Button

function addContact() {
  let form = document.getElementById('contact-form');
  form.style.display = 'block';
  let cancelButton = document.getElementById('cancel-button');
  cancelButton.style.display= 'inline-block';
  cancelButton.textContent = 'Cancel';
  let saveButton = document.getElementById('save-button');
  saveButton.textContent = 'Save Contact';
  contactList.style.display = 'none';  
  let contactDivButton = document.getElementById('toContactsDiv');
  contactDivButton.addEventListener('click', function() {
    cancelContact();  
  });
}



// Cancel Button

function cancelContact() {
  let form = document.getElementById('contact-form');
  form.style.display = 'none';
  contactList.style.display = 'block';
  form.reset();
}



// Save the contact Button

function saveContact() {
if (validateForm() == false) {
  return false;
}
let form = document.getElementById('contact-form');
let name = document.getElementById('name').value;
let email = document.getElementById('email').value;

// Add to people array
let people  = JSON.parse(localStorage.getItem('people'));
people.push({name: name, email: email, key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) });
localStorage.setItem('people', JSON.stringify(people));
form.style.display = 'none';
contactList.style.display = 'block';
form.reset();

// Add to HTML
const peopleList = document.getElementById('contacts-list');
const li = document.createElement('li');
const span1 = document.createElement('span');
const span2 = document.createElement('span');
const a = document.createElement('a');
a.href = '#';
span1.textContent = name;
span2.textContent = email;
li.appendChild(span1);
li.appendChild(span2);
li.appendChild(a);
peopleList.appendChild(li);

// Add clickable to new contact without refreshing page
li.addEventListener('click', function() {
  let selected = peopleList.querySelector('.selected');
    if (selected) {
        selected.classList.remove('selected');
    }
    li.classList.add('selected');
    showOptionButtons();
  })
}



// Delete a contact Button

function deleteContact() {
  let selected = document.querySelector('.selected');
  if (selected) {
    let people = JSON.parse(localStorage.getItem('people'));
    let name = selected.querySelector('span').textContent;
    for (let i = 0; i < people.length; i++) {
      if (people[i].name === name) {
        people.splice(i, 1);
      }
    }
    localStorage.setItem('people', JSON.stringify(people));
    selected.remove();
  }
}



// Edit a contact Button

function editContact() {
  let selected = document.querySelector('.selected');
  if (selected) {
    let form = document.getElementById('contact-form');
    let name = selected.querySelector('span').textContent;
    let email = selected.querySelector('span:nth-child(2)').textContent;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    form.style.display = 'block';  
    let contactList = document.getElementById('contacts-list');
    contactList.style.display = 'none';
  }  
  // Delete the contact
  deleteContact(document.querySelector('.selected'));
  // Change the save button to update
  let saveButton = document.getElementById('save-button');
  saveButton.textContent = 'Update';
  // Change the cancel button to Delete
  let cancelButton = document.getElementById('cancel-button');
  cancelButton.textContent = 'Delete Contact';
  let contactList = document.getElementById('contacts-list');
}



// Message to contact Button

function messageContact() {
  let selected = document.querySelector('.selected');
  if (selected) {
    let email = selected.querySelector('span:nth-child(2)').textContent;
    document.getElementById('to').value = email;
    showContent('compose');
  }
}




// Show only used Buttons

function showOptionButtons() {
  let deleteButton = document.getElementById('deleteContact');
  deleteButton.style.display = 'inline-block';
  let editButton = document.getElementById('editContact');
  editButton.style.display = 'inline-block';
  let messageButton = document.getElementById('messageContact');
  messageButton.style.display = 'inline-block';
  let addButton = document.getElementById('addContact');
  addButton.style.display = 'none';
}
function hideOptionButtons() {
  let deleteButton = document.getElementById('deleteContact');
  deleteButton.style.display = 'none';
  let editButton = document.getElementById('editContact');
  editButton.style.display = 'none';
  let messageButton = document.getElementById('messageContact');
  messageButton.style.display = 'none';
  let addButton = document.getElementById('addContact');
  addButton.style.display = 'inline';
}



// Cancel Message Button

function cancelMessage() {
  let form = document.getElementById('compose-form');
  form.reset();
  showContent('inbox');
}



// Search Bar Filter

// On contacts
let searchBar = document.getElementById('search-bar');
let contactList = document.getElementById('contacts-list');
let contacts = contactList.getElementsByTagName('li');

searchBar.addEventListener('keyup', function() {
  let searchTerm = document.getElementById('search-bar').value.toLowerCase();
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let contactName = contact.getElementsByTagName('span')[0].innerText.toLowerCase();
    let contactEmail = contact.getElementsByTagName('span')[1].innerText.toLowerCase();
    if (contactName.indexOf(searchTerm) > -1 || contactEmail.indexOf(searchTerm) > -1) {
      contact.style.display = "";
    }
    else {
      contact.style.display = 'none';
    }
  }
});


// On emails
let emailList = document.getElementById('emails-list');
let emails = emailList.getElementsByTagName('li');

searchBar.addEventListener('keyup', function() {
  let searchTerm = document.getElementById('search-bar').value.toLowerCase();
  for (let i = 0; i < emails.length; i++) {
    let email = emails[i];
    let emailName = email.getElementsByTagName('span')[0].innerText.toLowerCase();
    let emailSubject = email.getElementsByTagName('span')[1].innerText.toLowerCase();
    if (emailName.indexOf(searchTerm) > -1 || emailSubject.indexOf(searchTerm) > -1) {
      email.style.display = "";
    }
    else {
      email.style.display = 'none';
    }
  }
});



// Nav Bar Buttons

function showContent(contentId) {
    let content = document.getElementById(contentId);
    let allContents = document.getElementsByClassName('content');
    for (let i = 0; i < allContents.length; i++) {
        allContents[i].style.display = 'none';
    } 
    content.style.display = 'block';
}



/////////////////////////////////////////////////////////////////////////////
///////////////////////////   INBOX load first  /////////////////////////////
/////////////////////////////////////////////////////////////////////////////


window.onload = function() {showContent('inbox'); } 











