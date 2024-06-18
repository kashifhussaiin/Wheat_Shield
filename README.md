# Wheat_Shield
Final Year Project
Sure, I'll update the README file to include information about using React.js for the frontend.

# WheatShield

WheatShield is an integrated platform designed to assist farmers with wheat crop management. It leverages advanced technology for disease detection, weather monitoring, agricultural commerce, and location-based services to ensure better crop health and productivity.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Backend Installation](#backend-installation)
- [Frontend Installation](#frontend-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

WheatShield aims to provide a comprehensive solution for wheat farmers by integrating multiple functionalities into a single platform. It includes disease detection through image analysis, real-time weather monitoring, agricultural commerce for buying and selling products, and location-based services to identify nearby resources.

## Features

1. **Disease Detection**
   - Upload images or provide input data for disease detection.
   - Display results indicating the detected disease and relevant information.

2. **Weather Monitoring**
   - Display real-time weather updates based on the user's location.
   - Provide weather forecasts for upcoming days.
   - Send alerts for weather conditions affecting crop health.

3. **Agricultural Commerce**
   - Browse agricultural products available for sale.
   - Create listings for selling agricultural products.

4. **Location-based Services**
   - Identify nearby medical shops and agricultural supply stores.
   - Provide directions and contact information for identified locations.
   - Enable location-based search for specific products or services.

## Technologies Used

- **TensorFlow**: [TensorFlow](https://www.tensorflow.org/)
- **Google Colab**: [Google Colab](https://colab.research.google.com/)
- **MongoDB**: [MongoDB](https://www.mongodb.com/)
- **FastAPI**: [FastAPI](https://fastapi.tiangolo.com/)
- **OpenWeather API**: [OpenWeather API](https://openweathermap.org/api)
- **Kaggle Wheat Leaf Dataset**: [Kaggle](https://www.kaggle.com/datasets/olyadgetch/wheat-leaf-dataset)
- **VS Code**: [Visual Studio Code](https://code.visualstudio.com/)
- **React.js**: [React.js](https://reactjs.org/)

## Installation

### Backend Installation

### Prerequisites

- Python 3.9 or higher
- Conda package manager
- MongoDB instance

### Steps

1. **Clone the repository:**

   ```sh
   git clone https://github.com/kashifhussaiin/Wheat_Shield.git
   cd Wheat_Shield
   ```

2. **Create a virtual environment and activate it:**

   ```sh
   conda create --name wheatshield_env python=3.9
   conda activate wheatshield_env
   ```

3. **Install the required packages:**

   ```sh
   pip install -r requirements.txt
   ```

4. **Set up MongoDB:**

   Ensure MongoDB is running and accessible. Update the database connection settings in your configuration file.
   
   ```sh
   cd /Wheat_Shield/backend-database
   npm install
   npm run start
   ```


6. **Set up API keys:**

   Create a `.env` file in the project root and add your API keys for OpenWeather and any other services used.

   ```env
   OPENWEATHER_API_KEY=your_openweather_api_key
   ```

### Frontend Installation

### Prerequisites

- Node.js
- npm or yarn

### Steps

1. **Navigate to the frontend directory:**

   ```sh
   cd wheatshield_frontend
   ```

2. **Install the required packages:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Run the React development server:**

   ```sh
   npm start
   # or
   yarn start
   ```

## Usage

### Backend

1. **Run the FastAPI server:**

   ```sh
   cd /Wheat_Shield/model_api
   conda activate wheatshield_env
   python server_3_Class.py
   
   ```

2. **Access the API :**

    `http://localhost:8000` to access the API  and test the endpoints.

### Frontend

1. **Access the React application:**

   Open your browser and navigate to `http://localhost:3000` to use the React frontend of WheatShield.
   

## Contributing

We welcome contributions to WheatShield! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Submit a pull request with a detailed description of your changes.

Please ensure your code adheres to our coding standards and includes appropriate tests.

## Contact Information

- **GitHub**: [GitHub Profile](https://github.com/kashifhussaiin)
- **LinkedIn**: [LinkedIn Profile](www.linkedin.com/in/kashifhussaiin)
- **Email**: kashifhussain.fj@gmail.com

