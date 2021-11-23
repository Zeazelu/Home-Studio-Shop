import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Daniel',
            email: 'zeazelu@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'Łukasz',
            email: 'theKkostek@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
        {
            name: 'Magdalena',
            email: 'magdalenasuliga0@gmail.com',
            password: bcrypt.hashSync('danielmagda123', 8),
            isAdmin: true,
        }
    ],
    products: [
        {
            name: 'Polar',
            category: 'Kurtki',
            image: '/images/p1.jpg',
            price: 132,
            countInStock: 0,
            brand: 'Home Studio',
            rating: 1,
            numReviews: 10,
            description: 'Polar pracowniczy'
        },
        {
            name: 'Koszulka',
            category: 'Koszulki',
            image: '/images/p2.jpg',
            price: 100,
            countInStock: 12,
            brand: 'Home Studio',
            rating: 5,
            numReviews: 20,
            description: 'Koszulka pracownicza'
        },
        {
            name: 'Czapka',
            category: 'Czapki',
            image: '/images/p3.jpg',
            price: 80,
            countInStock: 12,
            brand: 'Home Studio',
            rating: 4.5,
            numReviews: 8,
            description: 'Czapka pracownicza'
        },
        {
            name: 'Ponczo',
            category: 'Morsowanie',
            image: '/images/p4.jpg',
            price: 150,
            countInStock: 12,
            brand: 'Home Studio',
            rating: 5,
            numReviews: 60,
            description: 'Ponczo do morsowania'
        },
        {
            name: 'Ręcznik',
            category: 'Morsowanie',
            image: '/images/p5.jpg',
            price: 40,
            countInStock: 12,
            brand: 'Home Studio',
            rating: 4,
            numReviews: 5,
            description: 'Ręcznik do morsowania'
        },
        {
            name: 'Komin',
            category: 'Morsowanie',
            image: '/images/p6.jpg',
            price: 20,
            countInStock: 12,
            brand: 'Home Studio',
            rating: 3.5,
            numReviews: 15,
            description: 'Komin do morsowania'
        },
        {
            name: 'Skarpety',
            category: 'Morsowanie',
            image: '/images/p7.jpg',
            price: 10,
            countInStock: 12,
            brand: 'Home Studio',
            rating: 5,
            numReviews: 54,
            description: 'Ciepłe skarpety do morsowania'
        },
        {
            name: 'Rękawice',
            category: 'Morsowanie',
            image: '/images/p8.jpg',
            price: 50,
            countInStock: 12,
            brand: 'Home Studio',
            rating: 4.5,
            numReviews: 21,
            description: 'Ciepłe rękawice do morsowania'
        },
        {
            name: 'Majtki',
            category: 'Morsowanie',
            image: '/images/p9.jpg',
            price: 20,
            countInStock: 12,
            brand: 'Home Studio',
            rating: 5,
            numReviews: 21,
            description: 'Majtki do morsowania'
        },
    ],
};
export default data;