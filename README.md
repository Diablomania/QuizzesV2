# Quizzes
A website featuring quizzes on various topics.

## Local Development Setup

### **Prerequisites**
Before setting up the project, ensure you have the following installed on your working machine (WM):
- **Git**
- **Docker & Docker Compose**

### **Installation Steps**

1. **Clone the repository**:
   ```sh
   git clone https://github.com/Diablomania/QuizzesV2.git
   ```
2. **Navigate to the project directory**:
   ```sh
   cd QuizzesV2
   ```
3. **Copy the environment file**:
   ```sh
   cp .env.example .env
   ```
4. **Add required environment variables in `.env`**:
   ```env
   ADMIN_EMAIL=your_admin_email
   ADMIN_PASSWORD=your_admin_password
   ```
5. **Build and start the Docker containers**:
   ```sh
   docker-compose up -d --build
   ```
6. **Generate the application key**:
   ```sh
   docker exec -it quizzes_app php artisan key:generate
   ```
7. **Restart Docker to apply changes**:
   ```sh
   docker-compose down
   docker-compose up -d
   ```

### **Accessing the Project**
Once the setup is complete, you can access the project in your browser at:  
🔗 [http://localhost:8080](http://localhost:8080)

Use the `ADMIN_EMAIL` and `ADMIN_PASSWORD` from the `.env` file to log in.

### **Troubleshooting**
If you encounter permission issues, you may need to adjust file permissions:
```sh
sudo chmod -R 777 storage
