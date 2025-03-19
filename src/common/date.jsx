let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
let days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
// js ke hisab se jo js 0 return karega toh wo sun hai mun nhi isliye array ka 0th index me sun likhe hai 
export const getDay = (timestamp) =>{
let date = new Date(timestamp);

return `${date.getDate()} ${months[date.getMonth()]}`
}

// This JavaScript code defines a function called getDay() that takes a timestamp and returns the day and month in a human-readable format.

// new Date(timestamp):
// Converts the given timestamp into a Date object. The timestamp is usually a number representing milliseconds since January 1, 1970 (Unix time).

// date.getDate():
// Gets the day of the month (e.g., 18 for February 18).

// date.getMonth():
// Gets the month number (0 for January, 1 for February, etc.). Then it uses months[date.getMonth()] to convert that number to the month name from the months array.

// Template String (${}):
// Combines the day and month name into a single string, such as "18 Feb".

