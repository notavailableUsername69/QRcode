import{scanQRCODE, decodeQRCODE}from './qr-reader-lib.js';


// Get the QR input element
const qrInput = document.getElementById('qr-input');

// Add an event listener to the input element
qrInput.addEventListener('change', handleQRCode);

// Function to handle the QR code reading
function handleQRCode(event) {
  // Get the selected file
  const file = event.target.files[0];

  // Create a file reader
  const reader = new FileReader();

  // Define the onload event for the reader
  reader.onload = function (e) {
    // Read the file as a data URL
    const dataURL = e.target.result;

    // Create an image element
    const image = new Image();
    image.src = dataURL;

    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // When the image has loaded, draw it on the canvas
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);

      // Get the QR code data from the canvas
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

      // Check if a QR code is detected
      if (qrCode) {
        // Display the QR code content
        document.getElementById('qr-result').textContent = qrCode.data;
      } else {
        // Display an error message if no QR code is detected
        document.getElementById('qr-result').textContent = 'No QR code found.';
      }
    };
  };

  // Read the selected file as a data URL
  reader.readAsDataURL(file);
}