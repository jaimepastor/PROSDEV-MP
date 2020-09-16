*** Test Cases ***
Valid Login
    Open Browser To Login Page
    Input Username    invalid
    Input Password    invalid
    Submit Credentials
    Login Page Should Be Open
    [Teardown]    Close Browser
