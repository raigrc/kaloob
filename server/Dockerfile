# Use the official Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Expose the port your Express server runs on
EXPOSE 5000

# Specify the command to run the application
CMD ["npm", "start"]