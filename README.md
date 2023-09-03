# Automation Task
This is automation testing for demo site "Omedym" using Selenium WebDriver with Mocha framework.

## Prerequisites
Node.js (v16.16.0 or higher) is recommended

## Installation
To install all the required dependencies and devDependencies, please follow these steps:
1. Clone the repository:
    ```
    https://github.com/alphabin1/omedym-demo.git
    ```
2. Install the dependency:
    ```
    npm install
    ```
    
## Configuration
To configure your test environment, update the values in the testconfig.json file according to your requirements. This file allows you to specify different configurations for executing test cases.

```
{
  "browser": "chrome", // This can be changed to "safari" to execute on safari browser 
  "isHeadless": false, // To execute on headless mode make this true
  "defaultElementTimeout": 30000,
  "defaultPageLoadTimeout": 60000,
  "defaultTestTimeout": 300000,
  "demoSiteUrl": "https://omedym-assess-qa.omedym.com/login"
}
```

## Execution
You can execute the test cases using the following command:
```
npm test
```

## Execution videos
- Chrome: [Execution video](https://www.youtube.com/watch?v=-1XJToi2IvE)
- Safari: [Execution video](https://www.youtube.com/watch?v=lovqivUGDsg)
