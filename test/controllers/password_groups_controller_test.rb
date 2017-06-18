require 'test_helper'

class PasswordGroupsControllerTest < ActionDispatch::IntegrationTest
  
  def setup
    @password_group = password_groups(:password_group_0)
  end

  test 'should not create invalid password group' do

    assert_no_difference 'PasswordGroup.count' do
      post password_groups_path, xhr: true, params: { password_group: { name:  " "}}
    end
  end

  test 'should create valid password group' do

  	data = get_random_password_group_name

    assert_difference 'PasswordGroup.count' do
      post password_groups_path, xhr: true, params: { password_group: {name: data}}
    end
  end

  test 'should not create password group with invalid data' do

    data = get_random_password_group_name
    data[1] = " " #password group not present

    @password_group.reload

    assert_not @password_group.attributes.has_value?(data[1])
  end

end
