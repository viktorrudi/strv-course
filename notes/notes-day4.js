// Controllers

// Config
// Default config, which will be replaced (like local, testing, deployment, etc). Env should only be handled in this file.

// Database

// Middleware
// Called in every request. Ctx + next. Example usage: logging all requests, error handling.
// Next calls the next middleware in the row.

// Utils

// Validations
// Parse, and then validate request. Is run in CONTROLLERS.
// Specify schemas which makes the field required (like string, object, etc). The URL should also be validated (like e.g the :id should be integer). Schemas should be strict.
// Then run the function which contains the schema to check content
// Very important, as it can open ports to get hacked (sql injections, js injections)

// Errors
// Have a main error class to then branch out to create specific errors. Throw errors in operations.

// Utils

// Routes

// Operations

// Repositories


// JSON Webtoken ('jwt' package)
// Used for authorizations. Sign with a signature to decode an encoded JSON Object. Tokens can expire. Sent in authorization header

// Hashing
// It's good to peprify it. To pepper it is to create a hash to use for your hash.

// Sentiment score
// cloud.google.com/natural-language
// Filter content via how the language is. Rude words are scored far down.
// @google-cloud/language package

// .env file to put in environment variables, such as a lin to where google cloud API 

// Homework
// 