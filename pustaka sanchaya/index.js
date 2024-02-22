require('dotenv').config();
const { createAgent } = require('@forestadmin/agent');
const { createMongooseDataSource } = require('@forestadmin/datasource-mongoose');
const connection = require('./models');
const fs = require('fs');
// Create the Forest Admin agent.
/**
 * @type {import('@forestadmin/agent').Agent<import('./typings').Schema>}
 */
const agent = createAgent({
  // Security tokens
  authSecret: process.env.FOREST_AUTH_SECRET,
  envSecret: process.env.FOREST_ENV_SECRET,

  // Make sure to set NODE_ENV to 'production' when you deploy your project
  isProduction: process.env.NODE_ENV === 'production',

  // Autocompletion of collection names and fields
  typingsPath: './typings.ts',
  typingsMaxDepth: 5,
});

// Connect your datasources
// All options are documented at https://docs.forestadmin.com/developer-guide-agents-nodejs/data-sources/connection
agent.addDataSource(createMongooseDataSource(connection, { flattenMode: 'auto' }));

// Add customizations here.
// For instance, you can code custom actions, charts, create new fields or relationships, load plugins.
// As your project grows, you will need to split it into multiple files!
//
// Here is some code to get your started
//
agent.customizeCollection('books', collection => {
  collection.addAction('import', {
    scope: 'Global',
    execute: async (context, resultBuilder) => {
      // Render HTML for file upload form
      const html = `
      <!-- HTML for the file upload form -->
      <div>
        <p>Instructions: [Provide instructions here]</p>
        <img src="/example_img.png" alt="Example CSV Image">
        <form id="uploadForm" enctype="multipart/form-data">
          <input type="file" name="csvFile" accept=".csv">
          <button type="submit">Upload CSV</button>
        </form>
        <div id="uploadProgress"></div>
      </div>

      <script>
        document.getElementById('uploadForm').addEventListener('submit', async function(event) {
          event.preventDefault(); // Prevent form submission

          const formData = new FormData(this);

          // Display uploading progress
          const progressElement = document.getElementById('uploadProgress');
          progressElement.innerHTML = 'Uploading...';

          try {
            const response = await fetch('/upload-csv', {
              method: 'POST',
              body: formData
            });

            if (response.ok) {
              progressElement.innerHTML = 'Upload successful!';
            } else {
              progressElement.innerHTML = 'Upload failed. Please try again.';
            }
          } catch (error) {
            progressElement.innerHTML = 'Upload failed. Please try again.';
            console.error('Error uploading CSV:', error);
          }
        });
      </script>
    `;

      // Return success response with HTML
      return resultBuilder.success('Upload CSV', {
        html: html,
      });
    }
  })

});



// Expose an HTTP endpoint.
agent.mountOnStandaloneServer(Number(process.env.APPLICATION_PORT));

// Start the agent.
agent.start().catch(error => {
  console.error('\x1b[31merror:\x1b[0m Forest Admin agent failed to start\n');
  console.error('');
  console.error(error.stack);
  process.exit(1);
});
