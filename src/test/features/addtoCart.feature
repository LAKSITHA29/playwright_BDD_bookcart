Feature: User Authentication Tests

  Background:
    Given User navigates to the application
    And User clicks on the login link

  Scenario Outline: Add to cart after login
    Given User enters the name as "<username>"
    And User enters the password as "<password>"
    When User clicks on the login button
    When the user search for the product "<pro_name>"
    And the user add the book to the cart
    Then the product should be added to the cart

  Examples:
    | username     | password   | pro_name                                |
    | LAKSITHA29   | Laksitha29 | Harry potter and the chamber of secrets |
    | LAKS         | Sam@1234   | Harry potter and the chamber of secrets |