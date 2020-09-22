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
${ADDGAME URL}      http://${SERVER}/game/new-game
${DASHBOARD URL}    http://${SERVER}/game/games
${ERROR URL}      http://${SERVER}/error.html
${CART URL}    http://${SERVER}/cart/

*** Keywords ***
Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}

Input Username
    [Arguments]    ${username}
    Input Text    email    ${username}

Input Password
    [Arguments]    ${password}
    Input Text    password   ${password}

Submit Credentials
    Click Button    Login

Dashboard Page Should Be Open
    Location Should Be    ${DASHBOARD URL}


# 

Click Cart
    Click Element       //*[contains(text(),'My Cart')]

Cart Should be Open
    Location Should Be    ${CART URL}

CLick Checkout
    Click Button  checkout_btn


Open Browser To Add Game Page
    Open Browser    ${ADDGAME URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}

Open Browser To Dashboard
    Open Browser     ${DASHBOARD URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}   

Open Browser To Cart
    Open Browser     ${CART URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY} 

Login Page Should Be Open
    Title Should Be    Login Page

Go To Login Page
    Go To    ${LOGIN URL}

Open Browser To Profile Page
    Open Browser    ${PROFILE URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}

Open Browser To Add Listing Page
    Open Browser    ${ADD LISTING URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}



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
    Click Button    Upload




Click Listing
    Click Element    add_listing_btn

Listing Should be Open
    Location Should Be    ${ADD LISTING URL}