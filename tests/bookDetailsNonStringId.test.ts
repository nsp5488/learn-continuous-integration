import { Response } from 'express';
import { showBookDtls } from '../pages/book_details'; // Adjust the import to where showBookDtls is defined

describe('showBookDtls', () => {
    let res: Partial<Response>;
    const mockBook = {
        title: 'Mock Book Title',
        author: { name: 'Mock Author' }
    };
    const mockCopies = [
        { imprint: 'First Edition', status: 'Available' },
        { imprint: 'Second Edition', status: 'Checked Out' }
    ];

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(), // Chaining for status
            send: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return 404 for non string book id', async () => {
        const id = {id: '12345'};

        // Act
        await showBookDtls(res as Response, id as unknown as string);

        // Assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith(`Book ${id} not found`);
    });
});
