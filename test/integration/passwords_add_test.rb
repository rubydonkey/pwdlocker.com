require 'test_helper'
require 'capybara/poltergeist'

class PasswordsAddTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  def setup
    @password = passwords(:password_0)
    Capybara.javascript_driver = :poltergeist
  end


  test 'create passwords' do

    visit(root_path)
    click_button('Add')

    data = get_random_password_data
    page.fill_in('Title',    :with => data[:title])

  end

end



