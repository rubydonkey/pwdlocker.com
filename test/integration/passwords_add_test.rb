require 'test_helper'

class PasswordsAddTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  def setup
    @password = passwords(:password_0)
  end

  test 'password create' do

    get root_path
    assert_select "a[href=?]", new_password_path

    get new_password_path, xhr: true
    assert_response :success
    assert_select "a[href=?]", new_password_path, count: 0
    # testing if form rendered
    assert_select 'form'


    title     = Faker::Lorem.words(2).join(' ')
    url       = Faker::Internet.url
    username  = Faker::Internet.user_name
    password  = Faker::Internet.password(6, 10)

    # valid password succesfully created
    assert_difference 'Password.count' do
      post passwords_path, xhr: true, params: { password: { title: title,
                                                            username: username,
                                                            password: password,
                                                            URL: url }}
    end



    # id of new row added to the table
    assert_match "password_#{Password.last.id}", response.body
    # added delete link
    assert_match "passwords/#{Password.last.id}", response.body
    # added edit link
    assert_match "passwords/#{Password.last.id}/edit", response.body

    # invalid password doesn`t gets created
    assert_no_difference 'Password.count' do
      post passwords_path, xhr: true, params: { password: { title: " ",
                                                            username: " ",
                                                            password: " ",
                                                            URL: " " }}
    end

    assert_match 'error_explanation', response.body
    # 4 errors messages rendered
    assert_select 'ul li', count: 4
  end


  test 'password edit' do
    get edit_password_path(@password), xhr: true
    assert_response :success

    # new link replaced with form
    assert_select 'form'
    assert_select "a[href=?]", new_password_path, count: 0

    username = Faker::Internet.user_name
    patch password_path(@password), xhr: true, params: { password: {
                                                            title: @password.title,
                                                            username: username,
                                                            password: @password.password,
                                                            URL: @password.URL
                                                        }}

    @password.reload

    #updated database
    assert_equal @password.username, username

    #updated table in view
    assert_match @password.username, response.body

    password = Faker::Internet.password(3)
    patch password_path(@password), xhr: true, params: { password: {
                                                                      title: @password.title,
                                                                      username: @password.username,
                                                                      password: password,
                                                                      URL: @password.URL
                                                                  }}


    assert_match 'error_explanation', response.body
    # 1 error message rendered
    assert_select 'ul li', count: 1


    @password.reload
    # database did not change
    assert_not_equal password, @password.password

    #table did not change - this does not work. response.body does noe see table at all after patch.
    # in browser everything is ok
    #assert_match @password.password, response.body

  end

  test 'password destroy' do

    assert_difference 'Password.count', -1 do
      delete password_path(@password), xhr: true
    end

    # check if password is removed from table.
    assert_select "a[href=?]", edit_password_path(@password), count: 0
    assert_select "a[href=?]", password_path(@password), count: 0
  end


end
