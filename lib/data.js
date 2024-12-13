// // import path from 'path';
// // import fs from 'fs/promises'; // Use promises version for async/await


// // const dataFilePath = path.join(process.cwd(), 'Data.json');

// // export const readFile = async () => {
// //     const jsonData = await fs.readFile(dataFilePath, 'utf-8');
// //     return JSON.parse(jsonData);
// //   };

// // // Utility functions to access specific data
// export const getBooks = (data) => data.books || [];
// export const getAuthors = (data) => data.authors || [];
// export const getGenres = (data) => data.genres || [];
// export const getReviews = (data) => data.reviews || [];
// export const getUsers = (data) => data.users || [];


// // export const getAllAuthors = async () => {
// //     const data = await readFile();
// //     return data.authors || [];
// // };