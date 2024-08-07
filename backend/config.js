// export const PORT = 5555;

// export const mongoDBURL =
//   "mongodb+srv://root:root@book-store-mern.de6ek6s.mongodb.net/books-collection?retryWrites=true&w=majority&appName=Book-Store-MERN";
import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5555;
export const mongoDBURL =
  process.env.MONGODB_URI ||
  "https://vercel.com/mallikarjun-s-hs-projects/bookstore-app-mern-stack/Fv6tTm3QmqHqEKj53Y2m4smuMYNT";
