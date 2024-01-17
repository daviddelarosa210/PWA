const butInstall = document.getElementById('buttonInstall');
let installEvent; // Variable to store the beforeinstallprompt event

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Save the event to use it later to prompt the user to install
  installEvent = event;
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Check if the install event is available
  // If available, prompt the user to install the PWA
  if (installEvent) {
    installEvent.prompt();
    // Wait for the user to respond to the prompt
    const userChoice = await installEvent.userChoice;
    if (userChoice.outcome === 'accepted') {
      console.log('User accepted the PWA installation prompt');
    } else {
      console.log('User declined the PWA installation prompt');
    }
    // Reset the installEvent variable after prompting
    installEvent = null;
  }
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Perform actions after the app is successfully installed
  console.log('App installed successfully');
});
