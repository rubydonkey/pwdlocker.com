require 'test_helper'

class PasswordsControllerTest < ActionDispatch::IntegrationTest

  def setup
    @password = passwords(:password_0)
  end

  test 'should get new' do
    get new_password_path, xhr: true
    assert_response :success
  end

  test 'should create valid password' do

    data = get_random_password_data

    assert_difference 'Password.count' do
      post passwords_path, xhr: true, params: { password: { title:  data[:title],
                                                            URL:    data[:URL],
                                                            username: data[:username],
                                                            password: data[:password] }}
    end
  end

  test 'should not create invalid password' do

    assert_no_difference 'Password.count' do
      post passwords_path, xhr: true, params: { password: { title:  " ",
                                                            URL:    " ",
                                                            username: " ",
                                                            password: " " }}
    end
  end

  test 'should update valid password' do

    data = get_random_password_data

    patch edit_password_path(@password), xhr: true, params: { password:      { title:     data[:title],
                                                                               URL:       data[:URL],
                                                                               username:  data[:username],
                                                                               password:  data[:password] }}

    @password.reload

    data.keys.each do |key|
      assert(@password.attributes.has_value?(data[key]))
    end

  end

end
