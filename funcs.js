function extractUserFromURL(url) {
    const inputString = url;

    // Regular expressions to extract user and password
    const userMatch = inputString.match(/user=([^..]*)/);
    const passMatch = inputString.match(/pass=([\d]*)/);

    // Extracted values
    const username = userMatch ? userMatch[1] : null;
    const password = passMatch ? passMatch[1] : null;

    // console.log("Username:", username); // Output: debesh
    // console.log("Password:", password); // Output: 1234

    return {"username": username, "password":password};


}

function userExist(username) {
    return false;
}

function decodeStringSafely(url) {
    url = url.replace(/%(?![0-9A-Fa-f]{2})/g, '%25');

    // Now decode the string
    const decodedString = decodeURIComponent(url);

    // Split the decoded string to extract username and message
    const parts = decodedString.split("_msg=");
    const username = parts[0].split("_username=")[1];
    const message = parts[1];

    return {"username":username,"message":message};
  }

export{extractUserFromURL, userExist, decodeStringSafely};