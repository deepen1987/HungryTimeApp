# HungryTimeApp 
Description - The application is designed as a fullstack Restaurant Recommendation application. I have designed this application to run on localhost.

### Technology & Tools

- ### HTML
- ### CSS (Bootstarp)
- ### JavaScript
  - VS CODE (IDE)
- ### NodeJS 
  - Download https://nodejs.org/en/download/
  - Setup NPM 6.14.15
  - Setup Node v14.17.6 
- ### MongoDB 
  - Download https://www.mongodb.com/try/download/community
  - MongoDB Compass (IDE) https://www.mongodb.com/try/download/compass
  - PORT 27017
- ### PostgreSQL DB 
  - Download https://www.postgresql.org/download/
  - PORT 5436
- ### PG Admin (IDE) 
  - Download https://www.pgadmin.org/download/
- ### Python
  - Install Anaconda Navigator (It will have the latest python) https://www.anaconda.com/products/individual
- ### Apache Spark (PySpark, SparkSQL)
  - #### How to install Spark - https://github.com/nehabais31/BigDataAnalytics/blob/master/HowTos/How-To-Install-Spark-On-MACOS.md
  - #### Next Install PySpark
    - Run the command "conda install pyspark", run this in terminal or conda terminal.
  - #### Install postgre jars to be used with spark
    - Download the jar **postgresql-42.2.21.jar** https://jdbc.postgresql.org/download.html
    - Copy your jars at /Users/userAccountOnMac/jars/postgresql-42.2.21.jar

### Instructions to run the program:

1. Download the project folder.
2. Setup PostgreSQL DB using Scripts available as part of Database.
3. Setup Spark, PySpark and then update the paths for JSON and CSV files in the jupyter notebook as per the instructions in it. Then Run the jupyter notebook.
4. Setup MongoDB.
5. Run the Node servers both Client and Server.
6. Register few users from the frontend.
7. Run the Restaurant Recommendation jupyter notebook this time. This needs to be run every time a new user registers (Manually).
8. Now login and check the restaurant recommendation.
