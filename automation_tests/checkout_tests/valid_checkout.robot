*** Settings ***
Documentation     A test suite with a single test for Checkout.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resourceCheckout.robot

*** Test Cases ***
Valid Checkout
    Open Browser To Login Page
    Input Username    reb@gmail.com
    Input Password    12345678
    Submit Credentials
    Dashboard Page Should Be Open
    Click Cart
    Cart Should be Open
    CLick Checkout
