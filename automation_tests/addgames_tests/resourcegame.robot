*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported SeleniumLibrary.
Library           SeleniumLibrary

*** Variables ***
${SERVER}         localhost:3000
${BROWSER}        Firefox
${DELAY}          0
${VALID USER}     jstn@yahoo.com   
${VALID PASSWORD}    12345678
${LOGIN URL}      http://${SERVER}/user/loginpage
${ADDGAME URL}      http://${SERVER}/game/new-game
${DASHBOARD URL}    http://${SERVER}/game/games
${ERROR URL}      http://${SERVER}/error.html

*** Keywords ***
Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}

Open Browser To Add Game Page
    Open Browser    ${ADDGAME URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    

Login Page Should Be Open
    Title Should Be    Login Page

Go To Login Page
    Go To    ${LOGIN URL}

Go To Add Game Page
    Go To    ${ADDGAME URL}
    

Input Username
    [Arguments]    ${username}
    Input Text    email_field    ${username}

Input Password
    [Arguments]    ${password}
    Input Text    password_field    ${password}

Submit Credentials
    Click Button    login_button

Dashboard Page Should Be Open
    Location Should Be    ${DASHBOARD URL}

Input Game Title
    [Arguments]    ${title}
    Input Text    title    ${title}

Input Game Link
    [Arguments]    ${link}
    Input Text    link    ${link}

Input Game Date
    [Arguments]    ${date}
    Click Element  xpath=/html/body/div/div[2]/form/div[1]/div[3]/div[2]/input
    Send Keys    release    ${date}

Select Genre
    [Arguments]    ${genre}
    select from list by label  genre  ${genre}

Select Rating
    [Arguments]    ${rating}
    select from list by label  rating  ${rating}

Select Platform
    [Arguments]    ${platform}
    select from list by label  platform  ${platform}

CLick Add Game
    Click Button  add_gameBtn

Sleep Time
[Arguments]    ${time}
Sleep ${time}

