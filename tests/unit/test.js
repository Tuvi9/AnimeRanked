//! supertest is important for making HTTP requests
const request = require('supertest');
const express = require('express');
const router = require('../../routes/my_routes');
const controller = require('../../controller/my_controllers');
const blogModel = require('../../models/blogModel')
const { describe } = require('node:test');
const { expect } = require('@playwright/test');

//! Replaces the actual contents of the controller for the ones down below
jest.mock('../../controller/my_controllers.js')
jest.mock('../../models/blogModel.js')


const app = express();
app.use(express.json());
//! Router path is at /
app.use('/', router)


//! TESTING POST

describe('POST /', () => {
    //! Defining test
    it('should create a new blog', async () => {
        //! Defines the mock blog object
        const mockBlog = { title: 'New Blog', description: 'Lorem Ipsum', image: 'image.jpg' };
        //! Mocks the createBlog controller to return mockBlog
        controller.createBlog.mockImplementation((req, res) => {
            res.status(201).json(mockBlog);
        });

        //! Sends the data to POST'/' mockBlog and expects a blog to be created
        const response = await request(app)
            .post('/')
            .send(mockBlog)
            .expect(201);

        console.log(response.body);

        expect(response.body).toEqual(mockBlog);
    });

    //! Test for validation error
    it('should return 400 for validation error', async () => {
        //! Mocks the createBlog controller to return a validation error
        controller.createBlog.mockImplementation((req, res) => {
            res.status(400).json({ error: 'Validation Error' });
        });

        //! Sends invalid data to POST'/' and expects a validation error
        const response = await request(app)
            .post('/')
            .send({ title: '' }) // Invalid data
            .expect(400);

        expect(response.body).toEqual({ error: 'Validation Error' });
    });

    //! Test for internal server error
    it('should return 500 for internal server error', async () => {
        //! Mocks the createBlog controller to return an internal server error
        controller.createBlog.mockImplementation((req, res) => {
            res.status(500).json({ error: 'Internal Server Error' });
        });

        //! Sends valid data to POST'/' and expects an internal server error
        const response = await request(app)
            .post('/')
            .send({ title: 'New Blog', description: 'Lorem Ipsum', image: 'image.jpg' })
            .expect(500);

        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});

//! TESTING GET

describe('GET /', () => {
    it('should retrive all blogs', async () => {
        const mockBlogs = [
            { title: 'Blog1', description: 'Lorem Ipsum', image: 'image.jpg'},
            { title: 'Blog2', description: 'Lorem Ipsum', image: 'image.jpg'}
        ];
        controller.getBlogs.mockImplementation((req, res) => {
            res.status(200).json(mockBlogs)
        });

        const response = await request(app)
            .get('/')
            expect(200);

        console.log(response.body)

        expect(response.body).toEqual(mockBlogs);
    })
})

//! TESTING PATCH

// PATCH route test
describe('PATCH /:id', () => {
    it('should update a blog successfully', async () => {
        const mockBlog = { _id: '66e1bed72bda4580bfa336b4', title: 'Updated Title' };
        controller.updateBlogs.mockImplementation((req, res) => {
            res.status(200).json(mockBlog);
        });

        const response = await request(app)
            .patch('/66e1bed72bda4580bfa336b4')
            .send({ title: 'Updated Title' })
            .expect(200);

        console.log(response.body);

        expect(response.body).toEqual(mockBlog);
    });

    it('should return 404 if blog not found', async () => {
        controller.updateBlogs.mockImplementation((req, res) => {
            res.status(404).json({ error: 'Blog not found' });
        });

        const response = await request(app)
            .patch('/66e1bed72bda4580bfa336b4')
            .send({ title: 'Updated Title' })
            .expect(404);

        expect(response.body).toEqual({ error: 'Blog not found' });
    });

    it('should return 500 if an error occurs', async () => {
        controller.updateBlogs.mockImplementation((req, res) => {
            res.status(500).json({ error: 'Internal Server Error' });
        });

        const response = await request(app)
            .patch('/66e1bed72bda4580bfa336b4')
            .send({ title: 'Updated Title' })
            .expect(500);

        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});

//! TESTING DELETE

// DELETE route test
describe('DELETE /:id', () => {
    it('should delete a blog successfully', async () => {
        controller.deleteBlogs.mockImplementation((req, res) => {
            res.status(200).json({ message: 'Blog deleted successfully' });
        });

        const response = await request(app)
            .delete('/66e1bed72bda4580bfa336b4')
            .expect(200);

        console.log(response.body);

        expect(response.body).toEqual({ message: 'Blog deleted successfully' });
    });

    it('should return 404 if blog not found', async () => {
        controller.deleteBlogs.mockImplementation((req, res) => {
            res.status(404).json({ error: 'Blog not found' });
        });

        const response = await request(app)
            .delete('/66e1bed72bda4580bfa336b4')
            .expect(404);

        expect(response.body).toEqual({ error: 'Blog not found' });
    });

    it('should return 500 if an error occurs', async () => {
        controller.deleteBlogs.mockImplementation((req, res) => {
            res.status(500).json({ error: 'Internal Server Error' });
        });

        const response = await request(app)
            .delete('/66e1bed72bda4580bfa336b4')
            .expect(500);

        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});
