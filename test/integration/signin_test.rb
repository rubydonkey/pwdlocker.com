require 'test_helper'

class SigninTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test 'signin with phone number' do

    visit(new_signin_path)

    assert(page.has_button?('Signin'))
    assert(page.has_link?(href: new_signin_path))

    click_button('Signin')
    assert(page.has_button?('Signin', :visible => false))

    assert(page.has_css?('form', :count => 1))
    assert(page.has_css?("label[for=phone_number_number]"))
    assert(page.has_field?("Number"))
    assert(page.has_button?('Send me token'))

    # valid number signin
    page.fill_in('Number', :with => "+38162205217")
    click_button("Send me token")

    assert(page.has_css?('form', :count => 1))

    assert(page.has_css?("label[for=session_token]", wait: 30))
    assert(page.has_field?("Token"))
    assert(page.has_button?('Submit'))

    # invalid number signin
    visit(new_signin_path)
    click_button('Signin')
    page.fill_in('Number', :with => "000")
    page.click_button('Send me token')
    assert(page.has_css?("#error_explanation", wait: 30))

    # empty number signin
    visit(new_signin_path)
    click_button('Signin')
    page.fill_in('Number', :with => "")
    page.click_button('Send me token')
    assert(page.has_css?("#error_explanation", wait: 30))

    # number have to be mobile - voip and landline not allowed
    visit(new_signin_path)
    click_button('Signin')
    page.fill_in('Number', :with => "+38134342480")
    page.click_button('Send me token')
    assert(page.has_css?("#error_explanation", wait: 30))

  end

end
