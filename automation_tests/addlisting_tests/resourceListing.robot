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
${VALID USER}     reb@gmail.com  
${VALID PASSWORD}    12345678
${LOGIN URL}      http://${SERVER}/user/loginpage
${PROFILE URL}      http://${SERVER}/user/profile
${ADD LISTING URL}    http://${SERVER}/post/upload
${DASHBOARD URL}    http://${SERVER}/game/games
${ERROR URL}      http://${SERVER}/error.html

*** Keywords ***
Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}

Open Browser To Profile Page
    Open Browser    ${PROFILE URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}

Open Browser To Add Listing Page
    Open Browser    ${ADD LISTING URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    

Login Page Should Be Open
    Title Should Be    Login Page

Go To Login Page
    Go To    ${LOGIN URL}
    

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

# For Add Listings Credentials

Select Title
    [Arguments]   ${title}
    select from list by label  title    ${title}

Input Price
    [Arguments]   ${price}
    Input Text    price    ${price}

Input Condition
    [Arguments]   ${description}
    Input Text    description    ${description}

Submit Credentials Upload
    Click Button    upload_btn

