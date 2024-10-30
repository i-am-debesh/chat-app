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
    // Replace any standalone '%' not followed by two hex digits with '%25'
    let encodedStr = url.slice(14,url.length);
    const normalizedStr = encodedStr.replace(/%(?![0-9A-Fa-f]{2})/g, '%25');
    return decodeURIComponent(normalizedStr);
  }

export{extractUserFromURL, userExist, decodeStringSafely};