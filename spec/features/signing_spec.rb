require 'feature_helper.rb'

feature 'Signin', js:true do

  background do
    Twilio::REST::Messages.any_instance.stubs(:create)
    visit(new_signin_path)
  end

  scenario 'with valid phone number', :skip => 'SID missing - unable to test' do

    expect(page).to have_button('Signin')
    expect(page).to have_link(href: new_signin_path)

    click_button 'Signin'
    expect(page).to have_button('Signin', :visible => false)

    expect(page).to have_css('form', :count => 1)
    expect(page).to have_css("label[for=phone_number_number]")
    expect(page).to have_field("Number")
    expect(page).to have_button('Send me token')

    # valid number signin
    fill_in 'Number', :with => "+38162205217"
    click_button "Send me token"
    
    expect(page).to have_css('form', :count => 1)

    expect(page).to have_css("label[for=session_token]")
    expect(page).to have_field("Token")
    expect(page).to have_button?('Login')
    expect(page).to have_button?('Resend')
  end

  scenario 'with invalid phone number', :skip => 'SID missing - unable to test'  do

    click_button 'Signin'
    fill_in 'Number', :with => "000"
    click_button 'Send me token'
    expect(page).to have_css("#error_explanation")

  end

  scenario 'with empty phone number', :skip => 'SID missing - unable to test'  do

    click_button 'Signin'
    fill_in 'Number', :with => ""
    click_button 'Send me token'
    expect(page).to have_css("#error_explanation")

  end

  scenario 'with no mobile phone number', :skip => 'SID missing - unable to test'  do

    # number have to be mobile - voip and landline not allowed
    click_button 'Signin'
    fill_in 'Number', :with => "+38134342480"
    click_button 'Send me token'
    expect(page).to have_css("#error_explanation")

  end

end
