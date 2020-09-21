*** Settings ***
Documentation     A test suite with a single test for valid add game.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resourceListing.robot

*** Test Cases ***
Valid Add Listing
    Open Browser To Add Listing Page
    Select Title   Among Us      
    Input Price    200
    Input Condition    Good as New
    Submit Credentials Upload
    [Teardown]    Close Browser
