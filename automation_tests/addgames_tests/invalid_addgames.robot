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

*** Test Cases ***               TITLE            LINK                    DATE            GENRE        PLATFORM        RATING                    
Invalid Game Title               ${EMPTY}         ${VALID LINK}           2020-07-08      Shooter      PS4             Adults
Invalid Link                     Among Us         ${EMPTY}                2020-07-08      Shooter      PS4             Adults
Invalid Date                     Among Us         ${VALID LINK}           ${EMPTY}        Shooter      PS4             Adults
Invalid Genre                    Among Us         ${VALID LINK}           2020-07-08      ${EMPTY}     PS4             Adults
Invalid Platform                 Among Us         ${VALID LINK}           2020-07-08      Shooter      ${EMPTY}        Adults
Invalid Rating                   Among Us         ${VALID LINK}           2020-07-08      Shooter      PS4             ${EMPTY}
    
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
    [Teardown]    Close Browser