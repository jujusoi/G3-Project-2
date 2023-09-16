const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const fetchData = async (num) => {
    for (let x = 0; x < num; x++) {
        const apiKey = `https://www.googleapis.com/books/v1/volumes?q=subject:${subjectRandomizer()}&maxResults=${1}&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
    
        axios
        .get(apiKey)
        .then((response) => {
            const seedInfo = response.data.items;
            return printInfo(seedInfo);
        })
        .catch((error) => {
          console.error(error);
        });
    }
};

const printInfo = async (info) => {
    try {
        info.forEach(book => {
            const newObj = {
                book_title: book.volumeInfo.title,
                book_description: book.volumeInfo.description,
                publisher: book.volumeInfo.publisher,
                publish_year: getPublishYear(book.volumeInfo.publishedDate),
                author: getAuthors(book.volumeInfo.authors),
                page_count: book.volumeInfo.pageCount,
                mature: determineIfMature(book.volumeInfo.maturityRating),
                icon: book.volumeInfo.imageLinks.thumbnail,
                average_score: book.volumeInfo.averageRating,
                uploaded_by: getRandomUploader(),
                category_name: book.volumeInfo.categories,
            };

            console.log(book.volumeInfo.categories);
            writeIntoJSON(newObj);
        });
    } catch (err) {
        console.log(`Error, ${err}`);
    }
};

const getPublishYear = (date) => {
    const value = parseInt(date.slice(0, 4));
    return value;
};

const getAuthors = (authors) => {
    let string = '';
    let index = 0;
    authors.forEach(author => {
        index++;
        if (index === authors.length) {
            string += author;
        } else {
            string += `${author}, `;
        }
    });
    return string;
};

const determineIfMature = (rating) => {
    let result;
    if (rating === 'NOT_MATURE') {
        result = false;
    } else {
        result = true;
    };
    return result;
};

const getRandomUploader = () => {
    let index = Math.floor(Math.random() * 5);
    if (index === 0) {
        index = 1
    }
    return index;
};

const writeIntoJSON = (object) => {
    fs.readFile('./seeds/booksInformation.json', 'utf-8', async (err, data) => {
        if (err) {
            console.error(`Error! ${err}`);
        } else {
            const parsedData = await JSON.parse(data);
            const id = parsedData.length + 1;
            console.log(`${parsedData.length}, ${id}`);
            object.id = id;
            parsedData.push(object);
            const stringData = JSON.stringify(parsedData);
            if (stringData) {
                fs.writeFile('./seeds/booksInformation.json', stringData, (err) => {
                    if (err) {
                        console.error(`Error, ${err}`);
                    } else {
                        console.log(`Successfully wrote info into json`);
                    }
                })
            }
        }
    })
};

const subjectRandomizer = () => {
    const choices = ['mystery', 'sci-fi', 'fantasy', 'romance', 'thriller', 'history', 'horror', 'biography', 'adventure', 'dystopian', 'comedy', 'crime', 'manga', 'anime'];
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

fetchData(10);