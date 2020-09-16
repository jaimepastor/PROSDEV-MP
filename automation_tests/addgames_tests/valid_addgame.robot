*** Settings ***
Documentation     A test suite with a single test for valid add game.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resourcegame.robot

*** Test Cases ***
Valid Add Game
    Open Browser To Add Game Page
    Input Game Title    Among Us  
    Input Game Link    https://steamcdn-a.akamaihd.net/steam/apps/945360/header.jpg?t=1598556351
    Input Game Date  2020-07-06 00:00:00.000Z
    Select Genre    Shooter
    Select Platform    PS4
    Select Rating    Adults
    CLick Add Game
    Sleep 3s
    [Teardown]    Close Browser