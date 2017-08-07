require_relative '../support/wait_for_ajax'

require 'test_helper'

class PasswordGroupTest < ActionDispatch::IntegrationTest
  include WaitForAjax

  def setup
    Webpacker.compile
  end

  test 'create valid password groups' do

    # test page layout
    visit(root_path)
    assert(page.has_css?('select[name="password_group_select"]'))
    assert(page.has_css?('button[name="password_group_add"]'))

    assert(page.has_no_css?('input[name="password_group[name]"]'))
    assert(page.has_no_css?('button[name="password_group_create"]'))

    click_button('Add group')
    assert(page.has_no_css?('button[name="password_group_add"]'))

    assert(page.has_css?('input[name="password_group[name]"]'))
    assert(page.has_css?('button[name="password_group_create"]'))

    data = get_random_password_group_name

    page.fill_in('password_group[name]', :with => data[1])

    click_button('Create group')

    assert(page.has_css?('select[name="password_group_select"]'))
    assert(page.has_css?('button[name="password_group_add"]'))

    assert(page.has_no_css?('input[name="password_group[name]"]'))
    assert(page.has_no_css?('button[name="password_group_create"]'))

    assert(page.has_css?('option', :text => data[1].to_s))

  end

  test 'create invalid password groups' do

    visit(root_path)

    click_button('Add group')
    wait_for_ajax

    data = "TestGroup"
    page.fill_in('password_group[name]', :with => data)

    click_button('Create group')
    wait_for_ajax

    password_group = PasswordGroup.create(name: data);

    # repeat password group name input, with the same name
    click_button('Add group')
    wait_for_ajax

    page.fill_in('password_group[name]', :with => data)

    click_button('Create group')
    wait_for_ajax

    assert(page.has_text?(password_group.errors.messages[:name].first))
  end

end
