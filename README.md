This project is a comprehensive, full-stack Travel Agency Management System designed to modernize and streamline all facets of a travel business. It replaces disconnected data silos with a central, integrated platform. The system's core objective is to manage the complex relationships between passengers, travel agents, tour packages, and ancillary services, as outlined in the initial project plan.

The technical architecture employs a modern, decoupled stack. The backend is a robust and scalable RESTful API built with Node.js and Express. This server acts as the central nervous system, handling all business logic, data validation, and secure communication. For data persistence, the project leverages MongoDB Atlas, a flexible NoSQL document database, allowing for complex and nested data structures. Mongoose is used as the Object Data Modeling (ODM) library to define clear, validated schemas for database collections, such as the Customer model.

The frontend is a clean, responsive, and user-friendly website built with semantic HTML, modern CSS, and dynamic JavaScript. The interface allows users to browse available tours, flights, and hotels, and features a critical "Customer Booking" form.

The project successfully demonstrates a complete, end-to-end data flow. When a user fills out the customer form on the frontend, the browser's fetch API securely sends the data to the backend's /api/customers endpoint. The Express server then validates this JSON data and uses the Mongoose model to save the new customer directly to the MongoDB Atlas database.

This architecture provides a scalable foundation for all planned features, including granular itinerary management, agent-passenger linkage, payment tracking, and loyalty programs.
