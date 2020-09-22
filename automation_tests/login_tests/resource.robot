*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported SeleniumLibrary.
Library           SeleniumLibrary

*** Variables ***
${SERVER}         localhost:3000
${BROWSER}        Chrome
${DELAY}          0
${VALID USER}     jstn@yahoo.com 
${VALID PASSWORD}    12345678
${LOGIN URL}      http://${SERVER}/user/loginpage
${DASHBOARD URL}    http://${SERVER}/game/games
${ERROR URL}      http://${SERVER}/error.html

*** Keywords ***
Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    

Login Page Should Be Open
    Title Should Be    Login Page

Go To Login Page
    Go To    ${LOGIN URL}
    

Input Username
    [Arguments]    ${username}
    Input Text    email    ${username}

Input Password
    [Arguments]    ${password}
    Input Text    password    ${password}

Submit Credentials
    Click Button    Login

Dashboard Page Should Be Open
    Location Should Be    ${DASHBOARD URL}

Input Game Title
    [Arguments]    ${title}
    Input Text    game_title    ${title}

Input Game Link
    [Arguments]    ${link}
    Input Text    game_link    ${link}
    

