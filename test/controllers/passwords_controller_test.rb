require 'test_helper'

class PasswordsControllerTest < ActionDispatch::IntegrationTest

  def setup
    @password = passwords(:password_0)
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

    patch password_path(@password), xhr: true, params: { password:     { title:     data[:title],
                                                                         URL:       data[:URL],
                                                                         username:  data[:username],
                                                                         password:  data[:password] }}

    @password.reload

    data.keys.each do |key|
      assert(@password.attributes.has_value?(data[key]))
    end
  end

  test 'should not update with invalid password data' do

    data = get_random_password_data
    data[:password] = ' ' #should not update with empty password

    patch password_path(@password), xhr: true, params: { password:     { title:     data[:title],
                                                                         URL:       data[:URL],
                                                                         username:  data[:username],
                                                                         password:  data[:password] }}

    @password.reload
    data.keys.each do |key|
      assert_not @password.attributes.has_value?(data[key])
    end
  end

  test 'destroy password' do
    assert_difference 'Password.count', -1 do
      delete password_path(@password), xhr: true
    end
  end


  test 'http scheme should be added if does not exist in input url' do
    url = "www.pwdlocker.com"
    data = get_random_password_data

    assert_difference 'Password.count' do
      post passwords_path, xhr: true, params: {
        password: {
          URL:      url,
          title:    data[:title],
          username: data[:username],
          password: data[:password]
        }
      }
    end

    assert_not_equal url, @password.URL.to_s
    assert_equal 'http', URI.parse(@password.URL).scheme
  end

  test 'password_last_changed_at attribute updated only when password is changed' do
    password = Password.new(get_random_password_data)
    password.save

    data = data = get_random_password_data;

    assert_nil password.password_last_changed_at

    patch password_path(password), xhr:true, params: { password: {  title: password.title,
                                                                    URL: password.URL,
                                                                    username: password.username,
                                                                    password: data[:password]}}
    password.reload
    assert_not_nil password.password_last_changed_at
  end

  test 'password_last_changed_at attribute not updated when any other attribute from password is changed' do

    password = Password.new(get_random_password_data)
    password.save

    data = data = get_random_password_data;

    assert_nil password.password_last_changed_at

    patch password_path(password), xhr:true, params: { password: {  title: data[:title],
                                                                    URL: password.URL,
                                                                    username: password.username,
                                                                    password: password.password }}
    password.reload
    assert_nil password.password_last_changed_at
  end

end
