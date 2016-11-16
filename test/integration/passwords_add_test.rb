require 'test_helper'

class PasswordsAddTest < ActionDispatch::IntegrationTest

  test 'page layout' do
    # test page layout
    visit(root_path)

    assert(page.has_button?('Add'))
    assert(page.has_link?(href: new_password_path))

    # test table data
    assert(page.has_css?('table.table-passwords'))
    assert_equal(page.all('tbody#passwords tr').size, Password.count)
    Password.all.each_with_index do |password, rowID|
      assert(page.has_css?("tr#password_#{password.id}"))

      for i in 1..4
        td = page.find("tr:nth-child(#{rowID + 1}) td:nth-child(#{i})")
        assert_not_nil td
        assert password.attributes.has_value?(td.text)
      end

      assert(page.has_link?(href: edit_password_path(password)))
      # delete link
      assert(page.has_link?(href: password_path(password)))
    end
  end

  test 'create valid passwords' do

    # test page layout
    visit(root_path)

    # create password
    click_button('Add')
    assert(has_button?('Add', :visible => false))

    # test form layout
    assert(page.has_css?('form'), :count => 1)
    for i in 1..4
      assert(page.has_css?("label[for=password_#{Password.attribute_names[i]}]", :count => 1))
      assert(page.has_field?(Password.attribute_names[i].to_s.downcase.capitalize))
    end
    assert(has_button?('Create Password'))

    data = get_random_password_data

    page.fill_in('Title',    :with => data[:title])
    page.fill_in('Url',      :with => data[:URL])
    page.fill_in('Username', :with => data[:username])
    page.fill_in('Password', :with => data[:password])

    click_button('Create Password')
    assert(page.has_no_css?('form'))
    assert(has_button?('Add', :visible => true))

    for i in 1..4
      td = page.find("tr:nth-child(1) td:nth-child(#{i})")
      assert(data.has_value?(td.text))
    end
  end

  test 'create invalid passwords' do

    visit(root_path)

    click_button('Add')
    assert(page.has_css?('form', :count => 1))

    password = Password.create()

    for i in 1..4 do
      name = password.attribute_names[i]
      page.fill_in(name.downcase.capitalize, :with => password.attributes[name])
    end

    click_button('Create Password')
    assert(page.has_css?('form', :count => 1))
    assert(page.has_css?('#error_explanation'))

    password.errors.count.times do |i|
      assert(page.has_css?("li:nth-child(#{i + 1})", :text => password.errors.full_messages[i]))
    end
  end

  test 'edit and update password' do

    visit(root_path)

    password = Password.first
    click_link(:href => edit_password_path(password))

    assert(page.has_css?('form'))

    for i in 1..4
      name = password.attribute_names[i]
      assert(page.has_field?(name.downcase.capitalize), :with => password.attributes[name])
    end

    data = get_random_password_data

    page.fill_in('Title',    :with => data[:title])
    page.fill_in('Url',      :with => data[:URL])
    page.fill_in('Username', :with => data[:username])
    page.fill_in('Password', :with => data[:password])

    click_button('Update Password')
    assert(page.has_no_css?('form'))

    for i in 1..4
      td = page.find("tr:nth-child(1) td:nth-child(#{i})")
      assert data.has_value?(td.text)
    end

  end

  test 'invalid edit password' do
    visit(root_path)

    click_link(:href => edit_password_path(Password.first))

    password = Password.create()

    for i in 1..4 do
      name = password.attribute_names[i]
      page.fill_in(name.downcase.capitalize, :with => password.attributes[name])
    end

    click_button('Update Password')
    assert(page.has_css?('form', :count => 1))
    assert(page.has_css?('#error_explanation'))

    password.errors.count.times do |i|
      assert(page.has_css?("li:nth-child(#{i + 1})", :text => password.errors.full_messages[i]))
    end
  end

  test 'destroy password' do

    visit(root_path)

    id = Password.first.id
    assert(page.has_css?("tr#password_#{id}"))
    click_link(:href => password_path(Password.first))
    assert(page.has_no_css?("tr#password_#{id}"))

  end

  test 'form concatenation with multiple edit link click bug' do

    visit(root_path)
    click_button('Add')
    click_link(:href => edit_password_path(Password.first))
    assert(page.has_css?('form', :count => 1))

    click_link(:href => edit_password_path(Password.second))
    assert(page.has_css?('form', :count => 1))

  end


end