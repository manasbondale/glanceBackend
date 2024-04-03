# This is the backend repo for Glance

**Glance: Kaggle Data Viewer**


**Introduction:**

Glance is a React.js based frontend project designed to allow users to easily read Kaggle data CSV files directly in their browsers. Users can simply paste Kaggle API links into the web application, which then utilizes the Kaggle API to download the CSV files to the client-side indexedDB storage. This project serves as a showcase for API usage, React-based client-side page routing, usage of indexedDB for storage, as well as demonstrating techniques such as using for loops in JSX to create tables and conditional JSX to enhance table column headers readability.

**Key Features:**

1. **Kaggle API Integration:**
   Glance seamlessly integrates with the Kaggle API, allowing users to paste Kaggle API links and retrieve the associated CSV files directly within the browser.

2. **Client-Side IndexedDB Storage:**
   CSV files downloaded from Kaggle are stored locally on the client-side using indexedDB, enabling users to access and view the data offline without requiring repeated downloads.

3. **React-based Page Routing:**
   The project utilizes React Router for client-side page routing, providing a smooth and intuitive user experience as users navigate between different views and functionalities.

4. **Dynamic Table Generation:**
   Kaggle Data Viewer dynamically generates tables to display the CSV data using for loops in JSX, ensuring flexibility and scalability for datasets of varying sizes.

5. **Improved Column Headers Readability:**
   Conditional JSX is employed to enhance the readability of table column headers, providing users with clear and descriptive labels for each column.

**Usage:**

1. **Clone Repository:**
   Clone the Kaggle Data Viewer repository to your local machine.

2. **Install Dependencies:**
   Navigate to the project directory and install dependencies using npm or yarn:

   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. **Start Development Server:**
   Run the development server to launch the web application locally:

   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

4. **Access Web Application:**
   Open your web browser and navigate to the provided local development server URL to access the Kaggle Data Viewer web application.

5. **Paste Kaggle API Links:**
   Paste Kaggle API links containing CSV data into the input field provided on the web application's interface.

6. **View CSV Data:**
   Once the CSV data is downloaded and stored locally, users can view and interact with the data directly within the web application.

**Contributing:**

Contributions to Glance are welcome and encouraged. If you have ideas for improvements, new features, or bug fixes, please feel free to submit pull requests on GitHub.

**License:**

Kaggle Data Viewer is licensed under the MIT license. See the LICENSE file for details.

**Contact:**

For inquiries, feedback, or support regarding Kaggle Data Viewer, please reach out to me.
