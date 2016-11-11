require 'test_helper'

class PasswordsAddTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  def setup
    @password = passwords(:password_0)
  end


  test 'create passwords' do

    visit(root_path)
    click_button('Add')

    data = get_random_password_data

    save_and_open_screenshot
    page.fill_in('Title',    :with => data[:title])

  end

end



