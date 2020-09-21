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
${CART URL}    http://${SERVER}/cart

*** Keywords ***
Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}

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

CLick Checkout
    Click Button  checkout_btn


