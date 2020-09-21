=======
*** Settings ***
Documentation     A test suite containing tests related to invalid adding of games.
...
...               These tests are data-driven by their nature. They use a single
...               keyword, specified with Test Template setting, that is called
...               with different arguments to cover different scenarios.
...
...               This suite also demonstrates using setups and teardowns in
...               different levels.
Suite Setup       Open Browser To Add Game Page
Suite Teardown    Close Browser
Test Setup        Go To Add Game Page
Test Template     Adding games With Invalid Inputs Should Fail
Resource          resourcegame.robot

*** Test Cases ***               USER NAME        PASSWORD            
Invalid Username                 invalid          ${VALID PASSWORD}
Invalid Password                 ${VALID USER}    invalid
Invalid Username And Password    invalid          whatever
Empty Username                   ${EMPTY}         ${VALID PASSWORD}
Empty Password                   ${VALID USER}    ${EMPTY}
Empty Username And Password      ${EMPTY}         ${EMPTY}

*** Keywords ***
Adding games With Invalid Inputs Should Fail
    [Arguments]    ${title}    ${link}    ${date}    ${genre}    ${rating}    ${platform}
    Input Game Title    ${title}  
    Input Game Link    ${link}
    Input Game Date  ${date}
    Select Genre    ${genre}
    Select Platform    ${platform}
    Select Rating    ${rating}
    CLick Add Game
    Sleep 3s
    [Teardown]    Close Browser