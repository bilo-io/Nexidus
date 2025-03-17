# AI Hackathon

## Ideas

1. Generate a sql script with relational postgres data
2. Create an insights tool for customers based on their data


### 1. SQL script generation

- specify your schemas and their relations (primary & foreign keys)
- get it to generate a sql script to seed data into my DB, with dates being in the last week from the time of the prompt
- number of rows parameter
- run script

### 2. Insights tool

- create a summary of your data (box whisker plot)
  - `min`, `max`, `avg`, `mean`, upper & lower `quartiles`
  - this already ensures there is no raw data being sent to AI
- render a chart of the box whisker plots you are analysing
- send the relevant metrics to AI to get insights for the time period
  - includes information about