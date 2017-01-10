require_relative '../support/wait_for_ajax'
require 'test_helper'

class PasswordsAddTest < ActionDispatch::IntegrationTest
  include ActionView::Helpers::DateHelper

  include WaitForAjax

  test 'page layout' do
    # test page layout
    visit(root_path)

    assert(page.has_button?('Add'))
    assert(page.has_link?(href: new_password_path))

    # test cards
    assert(page.has_css?('div.passwords'))
    assert_equal(page.all('div.password-block').size, Password.count)
    Password.all.each_with_index do |password, rowID|
      assert(page.has_css?("div#password-block-#{password.id}"))

      assert(page.has_text?(password.title.to_s.downcase.capitalize))

      assert(page.has_css?("#password-data-username-#{password.id}", :visible => false, text: password.username.to_s))
      assert(page.has_css?("#password-data-password-#{password.id}", :visible => false, text: password.password.to_s))

      assert(page.has_link?(href: password.URL))
      assert(page.has_link?(href: edit_password_path(password)))
      # delete link
      assert(page.has_link?(href: password_path(password)))
    end
  end

  test 'form layout' do

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

  end

  test 'create valid passwords' do

    visit(root_path)
    click_button('Add')

    data = get_random_password_data

    page.fill_in('Title',    :with => data[:title])
    page.fill_in('Url',      :with => data[:URL])
    page.fill_in('Username', :with => data[:username])
    page.fill_in('Password', :with => data[:password])

    click_button('Create Password')
    assert(page.has_no_css?('form', wait: 30))
    assert(has_button?('Add', :visible => true))

    assert(page.has_text?(data[:title].to_s.downcase.capitalize))

    assert(page.has_css?('.password-block-password-data', :visible => false, :text => data[:username].to_s))
    assert(page.has_css?('.password-block-password-data', :visible => false, :text => data[:password].to_s))

    assert(page.has_link?(href: data[:URL]))

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

    assert(page.has_no_css?('form', wait: 30))

    assert(page.has_text?(data[:title].to_s.downcase.capitalize))
    assert(page.has_css?('.password-block-password-data', :visible => false, :text => data[:username].to_s))
    assert(page.has_css?('.password-block-password-data', :visible => false, :text => data[:password].to_s))
    assert(page.has_link?(href: data[:URL]))

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
    assert(page.has_css?("#password-block-#{id}"))
    click_link(:href => password_path(Password.first))
    assert(page.has_no_css?("#password-block-#{id}"))

  end

  test 'form concatenation with multiple edit link click bug' do

    visit(root_path)
    click_button('Add')
    click_link(:href => edit_password_path(Password.first))
    assert(page.has_css?('form', :count => 1))

    click_link(:href => edit_password_path(Password.second))
    assert(page.has_css?('form', :count => 1))

  end

  test 'click on password block show username and password' do

    visit(root_path)

    password = Password.first
    assert(page.has_css?("#password-data-username-#{password.id}", :visible => false, :text => password.username.to_s))
    assert(page.has_css?("#password-data-password-#{password.id}", :visible => false, :text => password.password.to_s))

    password_block = page.find_by_id("password-block-#{password.id}")
    assert_not_nil password_block
    password_block.click

    assert(page.has_css?("#password-data-username-#{password.id}", :visible => true, :text => password.username.to_s))
    assert(page.has_css?("#password-data-password-#{password.id}", :visible => true, :text => password.password.to_s))

  end

  test 'password last change time stamp shown when password updated' do
    visit(root_path)

    password = Password.first
    click_link(:href => edit_password_path(password))

    page.fill_in('Password', :with => "NewPassword")

    click_button('Update Password')
    wait_for_ajax

    password_block = page.find_by_id("password-block-#{password.id}", wait: 30)
    assert_not_nil password_block
    password_block.click

    password.reload
    assert(password_block.text.include?(time_ago_in_words(password.password_last_changed_at)))
  end

  test 'password last change time stamp not be shown when non password field is updated' do

    visit(root_path)

    password = Password.first
    click_link(:href => edit_password_path(password))

    page.fill_in('Title', :with => "NewTitle")

    click_button('Update Password')
<<<<<<< HEAD
    wait_for_ajax

    password_block = page.find_by_id("password-block-#{password.id}")
    assert_not_nil password_block
    password_block.click
=======
    assert(page.has_no_css?("#password-data-password-changed-#{password.id}", :visible => false, wait: 30))
>>>>>>> 44e5f242df9cf2ea032f87013c05ae2f68a917d0

    password.reload
    assert(password_block.text.include?(time_ago_in_words(password.created_at)))
  end

end
