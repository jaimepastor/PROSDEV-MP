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
Resource          resourcegame.robot

*** Test Cases *** 
Invalid Game Title
    Input Game Title    ${EMPTY}  
    Input Game Link    ${VALID LINK}
    Input Game Date  2020-07-08
    Select Genre    Shooter
    Select Platform    PS4
    Select Rating    Adults
    CLick Add Game

Invalid Link
    Input Game Title    Among Us  
    Input Game Link    ${EMPTY}
    Input Game Date  2020-07-08
    Select Genre    Shooter
    Select Platform    PS4
    Select Rating    Adults
    CLick Add Game

Invalid Date
    Input Game Title    Among Us  
    Input Game Link    ${VALID LINK}
    Input Game Date  ${EMPTY}
    Select Genre    Shooter
    Select Platform    PS4
    Select Rating    Adults
    CLick Add Game

Invalid Genre
    Input Game Title    ${EMPTY}  
    Input Game Link    ${VALID LINK}
    Input Game Date  2020-07-08
    Select Platform    PS4
    Select Rating    Adults
    CLick Add Game

Invalid Platform
    Input Game Title    Among Us  
    Input Game Link    ${VALID LINK}
    Input Game Date  2020-07-08
    Select Genre    Shooter
    Select Rating    Adults
    CLick Add Game

Invalid Rating
    Input Game Title    Among Us  
    Input Game Link    ${VALID LINK}
    Input Game Date  2020-07-08
    Select Genre    Shooter
    Select Platform    PS4
    CLick Add Game