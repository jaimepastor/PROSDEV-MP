*** Settings ***
Documentation     A test suite with a single test for Checkout.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resourceCheckout.robot

*** Test Cases ***
Checkout
    Open Browser To Cart
    CLick Checkout
