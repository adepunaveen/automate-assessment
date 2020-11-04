Automate - Assessment 

Setup Steps
1.	Git clone git@github.com:adepunaveen/automate-assessment.git
2.	Docker-compose build
3.	Docker-compose up

<br>
Prerequisites

1. Docker installation

API’s
<br>
<br>
1.	Below API is used for registering a user in app

URL: http://127.0.0.1:3000/api/user/register 
METHOD: POST
BODY: 
{
    "email": "admin@automate.com",
    "password": "password",
    "name": "admin"
}

<br>
<br>

2.	Below API is used to login into app. On successful login, token is returned in response which should be used in access all the API’s
<br>
URL: http://127.0.0.1:3000/api/user/login 
<br>
METHOD: POST
<br>
BODY: 
<br>
{
    "email": "admin@automate.com",
    "password": "password",
}

<br>
<br>

3.	API is used for creating folder. 
<br>
URL: http://127.0.0.1:3000/api/folder/createfolder 
<br>
METHOD: POST
<br>
BODY: {
    "foldername":"new folder"
	}
<br>
<br>
	
	
4.	API for creating file, if a file is root folder then provide filepath as “/”
<br>
URL: http://127.0.0.1:3000/api/file/addfile 
<br>
METHOD: POST
<br>

Example:1
<br>
{
    "filename": "test.txt",
    "content": "this is folder file content",
    "filepath":"new folder"
}
<br>

Example:2
{
    "filename": "outside-test.txt",
    "content": "this is root file content",
    "filepath":"/"
}
<br>
<br>


5.	API for moving file 
<br>
URL: http://127.0.0.1:3000/api/file/movefile 
<br>
METHOD: POST
<br>

{
    "filename":"outside-test.txt ",
    "targetfolder":"new folder"
}
<br>
<br>

6.	API to get the files of folder
<br>
URL: http://127.0.0.1:3000/api/folder/getfiles/<folder name> 
<br>
METHOD: GET
<br>

URL: http://127.0.0.1:3000/api/folder/getfiles/new folder 
<br>
METHOD: GET
<br>
<br>

7.	API to get the list of folders and files of a user
<br>
http://127.0.0.1:3000/api/dashboard GET
