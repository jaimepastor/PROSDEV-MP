*** Settings ***
Documentation     A test suite containing tests related to invalid login.
...
...               These tests are data-driven by their nature. They use a single
...               keyword, specified with Test Template setting, that is called
...               with different arguments to cover different scenarios.
...
...               This suite also demonstrates using setups and teardowns in
...               different levels.
Suite Setup       Open Browser To Login Page
Suite Teardown    Close Browser
Test Setup        Go To Login Page
Test Template     Invalid Login
Resource          resource.robot

*** Test Cases ***               USER NAME        PASSWORD
Invalid Email                    invalid          ${VALID PASSWORD}
Invalid Password                 ${VALID USER}    invalid
Invalid Email And Password       invalid          whatever
Empty Email                      ${EMPTY}         ${VALID PASSWORD}
Empty Password                   ${VALID USER}    ${EMPTY}
Empty Email And Password         ${EMPTY}         ${EMPTY}


*** Keywords ***
Invalid Login
    [Arguments]    ${username}    ${password}
    Open Browser To Login Page
    Input Username    ${username}
    Input Password    ${password}
    Submit Credentials
