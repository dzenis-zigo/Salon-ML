# Frizerski-Salon-ML

## Installation Instructions

### Installing NodeJS

* In order to get **npm** we have to install NodeJS from this [link (choose LTS)](https://nodejs.org/en/download/)

### Installing Angular CLI

* Run the command `npm install -g @angular/cli@14`

### Installing Git, downloading the code, and installing node packages

1. Download Git [here](https://git-scm.com/downloads)
2. Open Windows PowerShell or Command Prompt and run the following commands:
3. Run `cd C:\`
4. Run `mkdir Projects`
5. Run `cd Projects`
6. To download the code run `git clone https://github.com/dzenis-zigo/Frizerski-Salon-ML.git`
7. Run `cd Frizerski-Salon-ML\SalonML\SalonML`
8. To install libraries run `npm install`
9. Leave the shell window open for upcoming commands

### Installing .NET 6 SDK

* Download from this [link](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) (make sure you choose SDK not Runtime)

### Installing and running Visual Studio 2022 Community

1. Download the Community version [here](https://visualstudio.microsoft.com/downloads/)
2. Choose "ASP.NET and web development" and "Azure development" at the install screen
3. When install is finished, open the Solution file at the following directory: `C:\Projects\Frizerski-Salon-ML\SalonML`
4. Right click the solution in the Solution Explorer window and select "Set Startup Projects"
5. Under "Single startup project", select *SalonML_API*

### Setting up secrets.json

1. Right click on the **SalonML_API** project and select "Manage User Secrets"
2. Copy paste the following code (wait until the next step to insert the SQL Server Connection String): 

```
{
  "ConnectionStrings": {
    "DefaultConnection": "<SQL Server Connection String>"
  },
  "DefaultUsers": {
    "DefaultEmailOne": "<Valid email>"
    "DefaultPassword": "<Password with 8 characters: 1 lowercase, 1 uppercase, 1 digit, and 1 special character>"
  },
  "JwtSettings": {
    "SecurityKey": "<String with at least 16 characters>"
  },
  "SendInBlue": {
    "APIKey": "<Get an Email API Key online at sendinblue.com (optional if you don't plan to use reset password or contact form features)>"
  }
}
```

### Installing SQL Server 2022

1. Download the *Express* edition [here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
2. When finished copy the *Connection String* into the previous step's **secrets.json** *ConnectionStrings:DefaultConnection* field
3. Click the **Install SSMS** and then download *SQL Server Management Studio 18.12.1*

### Installing SQL Server Management Studio

1. Download [here](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)
2. Connect to the database using the default values
3. The relevant tables will show up under `Databases`>`System Databases`>`Master`>`Tables`

### Setting up the database tables

1. Install the **dotnet-ef** CLI tool by executing this command in PowerShell or CMD: `dotnet tool install --global dotnet-ef`
2. Navigate to `C:\Projects\Frizerski-Salon-ML\SalonML\SalonML_API` and execute the command `dotnet ef database update`
3. View the results in SSMS

### Running the frontend

1. To start the Angular frontend make sure you are in the `C:\Projects\Frizerski-Salon-ML\SalonML\SalonML` directory in PowerShell or CMD 
2. Run `ng serve`
3. When finished, navigate to **localhost:4200** in a web browser

### Running the backend

1. Run the ASP.NET backend by clicking the green arrow and "SalonML_API"
2. **Trust** any self-signed SSL certs
3. In the *swagger* window that comes up, first run `GET /api/Seed/CreateDefaultUsers` (**Try it out** > **Execute**)
    * Observe the results in SSMS under the `dbo.AspNetUsers` table (right click the table and select **Select Top 1000 Rows**)
4. Navigate to `http://localhost:4200/` in a browser and click **Login** at the bottom of the page
5. After logging in with the values that you set in *secrets.json*, click **Seed Data** at the bottom of the page
    * Observe the results in the `dbo.DynamicContents` table