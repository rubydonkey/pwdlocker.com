require 'test_helper'

class PasswordsControllerTest < ActionDispatch::IntegrationTest

  def setup
    @password = passwords(:password_0)
  end

  test 'should get new' do
    get new_password_path, xhr: true
    assert_response :success
  end

  test 'should create password' do

    title = Faker::Lorem.words(2).join(' ')
    url = Faker::Internet.url
    username = Faker::Internet.user_name
    password = Faker::Internet.password(6, 10)

    assert_difference 'Password.count'  do

      post passwords_path, xhr: true, params: { password: {   title: title,
                                                              URL: url,
                                                              username: username,
                                                              password: password  } }
    end


  end

  test 'should get edit' do
    get edit_password_path(@password), xhr: true
    assert_response :success
  end

  test 'should update' do

  end


end
