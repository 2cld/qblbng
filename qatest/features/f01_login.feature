
 Feature: I can use cucumber.mink to check the content of my website
  Background:
    Given a user email "admin@admin.com" password "admin" test site "http://localhost:3000"

  Scenario: Check Homepage content
    Given I am on the homepage
    And   I wait 3 seconds
    And   I should see "Sign In" in the "span" element
    And   I should see an "input#email" element
    And   I should see an "input#password" element
    When  I fill in the following:
      | input[name='email']     | admin@admin.com |
      | input[name='password']  | admin           |
    And   I submit "form#signin" form
    And   I wait 3 seconds
    Then  I should see "admin@admin.com" in the "a.ng-binding" element
    
 